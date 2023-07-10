import fse from 'fs-extra';
import path from 'path';
import optimiseJSCode from '../tools/optimiseJS';
import {BUILD_DIR, BUILD_STATIC_DIR, PAGE_DIR} from './constants';

const paths = require('react-scripts/config/paths');

const INPUT_JS_FILE = path.resolve(PAGE_DIR, 'page.js');
const OUTPUT_JS_FILE = path.resolve(BUILD_STATIC_DIR, 'bundle.js');

const INPUT_HTML_FILE = path.resolve(PAGE_DIR, 'page.html');
const OUTPUT_HTML_FILE = path.resolve(BUILD_DIR, 'index.html');

function clean() {
  fse.emptyDirSync(paths.appBuild);
}

/**
 * Favicon and manifest json needed for page
 */
function copy() {
  fse.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}

function createStaticFolder() {
  fse.mkdirsSync(BUILD_STATIC_DIR);
}

function getFileContent(filePath) {
  return fse.readFileSync(filePath, 'utf8');
}

function createOutputBundle() {
  const optimisedInputJS = optimiseJSCode(getFileContent(INPUT_JS_FILE));
  const resolvedOutput = optimisedInputJS.replace(/__HOST__/, import.meta.env.VITE_HOST);
  fse.writeFileSync(OUTPUT_JS_FILE, resolvedOutput, 'utf8');
}

function createOutputHTML() {
  const inputHTML = getFileContent(INPUT_HTML_FILE);
  const resolvedOutput = inputHTML.replace(/__SCRIPT__/, getFileContent(OUTPUT_JS_FILE));
  fse.writeFileSync(OUTPUT_HTML_FILE, resolvedOutput, 'utf8');
  fse.removeSync(OUTPUT_JS_FILE);
}

function bundle() {
  createStaticFolder();
  createOutputBundle();
  createOutputHTML();
}

export default function page() {
  clean();
  copy();
  bundle();
};