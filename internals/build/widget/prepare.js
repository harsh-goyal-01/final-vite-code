/**
 * User: abhinavsingi
 * Date: 04/02/19
 * Time: 4:48 PM
 * Desc: Using index.html outputted by webpack and widget.js written - it creates widget.js which is to be uploaded and entry of which is to be updated in backend
 */

import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import recursive from 'recursive-readdir';
import cheerio from 'cheerio';
import optimiseJSCode from '../tools/optimiseJS';
import { getUserAgentRegExp } from 'browserslist-useragent-regexp';

import config from './config';
import sh from '../tools/runBashScript';

const TYPES = ['link', 'script'];

const LEGACY_INPUT_APP_HTML = path.resolve(config.BUILD_DIR, 'index.html');
const MODERN_INPUT_APP_HTML = path.resolve(config.MODERN_BUILD_DIR, 'index.html');

const INPUT_WIDGET_HTML = path.resolve(config.WIDGET_DIR, 'widget.html');
const INPUT_WIDGET_JS = path.resolve(config.WIDGET_DIR, 'widget.js');

const OUTPUT_WIDGET_JS = path.join(config.BUILD_STATIC_DIR, 'widget.js');

const SCRIPT_TAG_REGEX = /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/g;

function getFileContent(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

const getContent = (filePath, types) => {
  const fileContent = getFileContent(filePath);
  const $ = cheerio.load(fileContent);
  // Scripts, Links, etc. having `mode` attribute as development shouldn't be in production bundles
  return types.map(type => $(type).filter((i, el) => el.attribs['data-mode'] !== 'development')).join('');
}

function getScriptSrcFromScriptTag (scriptTag) {
  const SRC_REGEX = /src="(.*?)"/g;
  const source = SRC_REGEX.exec(scriptTag);
  return source[1];
}

function getScriptsFromHTMLContent (htmlContent) {
  const sriptsArray = htmlContent.match(SCRIPT_TAG_REGEX);
  const vendorScript = getScriptSrcFromScriptTag(sriptsArray[0]);
  const mainScript = getScriptSrcFromScriptTag(sriptsArray[1]);
  return {
    vendorScript,
    mainScript,
  }
}

function createOutputHTML() {
  const outputModernHTMLContent = getContent(MODERN_INPUT_APP_HTML, TYPES);
  const outputLegacyHTMLContent = getContent(LEGACY_INPUT_APP_HTML, TYPES);

  const outputHTMLTemplate = _.template(getFileContent(INPUT_WIDGET_HTML));

  const browserRegexExp = getUserAgentRegExp({
    allowHigherVersions: true,
    env: 'production-modern'
  });
  const parts = browserRegexExp.toString().split('\\');
  const modifiedBrowserRegexExp = parts.join('\\\\\\\\');

  const modernScriptUrls = getScriptsFromHTMLContent(outputModernHTMLContent);
  const legacyScriptUrls = getScriptsFromHTMLContent(outputLegacyHTMLContent);

  return outputHTMLTemplate({
    // We need to strip first and last slash from regexExpression as this will go as a string.
    modernBrowserRegex: modifiedBrowserRegexExp.slice(1, modifiedBrowserRegexExp.length -1),
    modernVendorUrl: modernScriptUrls.vendorScript,
    modernMainUrl: modernScriptUrls.mainScript,
    legacyVendorUrl: legacyScriptUrls.vendorScript,
    legacyMainUrl: legacyScriptUrls.mainScript,
    appHost: process.env.VITE_HOST,
  });
}

function createOutputBundle(widgetHTML) {
  const inputWidgetJS = getFileContent(INPUT_WIDGET_JS);
  const resolvedOutput = optimiseJSCode(inputWidgetJS.replace(/__HTML__/, widgetHTML));
  fs.writeFileSync(OUTPUT_WIDGET_JS, resolvedOutput, 'utf8');
}

function createVersionFolder() {
  fs.copySync(config.BUILD_STATIC_DIR, config.BUILD_VERSION_DIR, {
    dereference: true,
  });
  fs.copySync(config.MODERN_BUILD_JS_BUNDLE_DIR, config.JS_BUILD_DIR, {
    dereference: true,
  });
  sh('rm -rf modern-build')
}

function removeExtraFiles() {
  return new Promise((resolve, reject) => {
    fs.removeSync(config.BUILD_STATIC_DIR); //remove static dir

    // remove all the other files kept flat in build dir
    recursive(config.BUILD_DIR, (err, files) => {
      if (err) {
        console.log(err);
        reject();
        return;
      }
      files
        .filter(
          file => {
            return !file.match(config.BUILD_VERSION_DIR);
          },
        )
        .forEach(
          file => {
            return fs.removeSync(file)
          }
        );
      resolve()
    });
  })
}

export default async function preUpload() {
  createOutputBundle(createOutputHTML());
  createVersionFolder();
  await removeExtraFiles();
};