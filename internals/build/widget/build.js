import _stubTrue from 'lodash/stubTrue';
import _some from 'lodash/some';
import shortid from 'shortid';
import fs from 'fs';

import prepare from './prepare';
import upload from '../upload';
import compress from '../compress';
import sh from '../tools/runBashScript';

import config from './config';

async function widget({ compression }) {
  await prepare();
  if (compression) {
    await compress(config.BUILD_DIR, config.COMPRESSED_BUILD_DIR);
  }
  const buildUrl = await upload({
    dirToUpload: compression ? config.COMPRESSED_BUILD_DIR: config.BUILD_DIR,
    uploadUrl: 'chat',
    shouldCacheFile: _stubTrue,
    compression,
  });
  const widgetDir = config.BUILD_VERSION_DIR.split(config.BUILD_DIR)[1];
  return `${buildUrl}${widgetDir}/widget.js`;
}

async function buildAndUpload({ compression }) {
  const generateSourceMap = process.env.ENABLE_SOURCEMAP === "true";
  await sh(`BROWSERSLIST_ENV="production-modern" GENERATE_SOURCEMAP="${generateSourceMap}" craco build && mv build modern-build`);
  await sh(`BROWSERSLIST_ENV="production-legacy" GENERATE_SOURCEMAP="${generateSourceMap}" craco build`);
  return widget({ compression });
}

async function buildForTier({ url, compression }) {
  console.log(`Using Tier URL: ${url}`);
  const version = shortid.generate();
  process.env.VITE_HOST = url;
  process.env.VITE_VERSION = version;
  process.env.PUBLIC_URL = process.env.PUBLIC_URL.replace(/([^/]*)$/, version);
  return buildAndUpload({ compression });
}

function printTiers(tiersBuilt) {
  console.log('------------ !!!!TIERS!!!! --------------');
  console.log(JSON.stringify(tiersBuilt));
  console.log('-----------------------------------------------');
}

function validateTierNames(tierMap, tierNames) {
  return _some(tierNames, tierName => !tierMap.find(tier => tier.tierName === tierName));
}

async function getAppAndTiersToBuild() {
  const [arg1, arg2] = process.argv.slice(4);
  const tierMapJson = await sh(`curl -X POST "${config.BASE_URL}/livechat/0/fetchAllTierUrls"`);

  if (!tierMapJson) {
    throw new Error(`Tiers for env: ${process.env.HOST_NAME} is not defined`);
  }

  const tierMap = JSON.parse(tierMapJson);

  let appIds, tierNames;

  if (arg1 && arg1.startsWith('app')) {
    if (!arg2) {
      throw new Error('Tier name needs to be provided when building for specific app ids');
    }

    const tierNamesPassed = arg2.split(',');

    if (tierNamesPassed.length > 1) {
      throw new Error('Only one tier can be built for specific app ids');
    }

    appIds = arg1;
    tierNames = tierNamesPassed;
  } else if (arg1) {
    tierNames = arg1.split(',');
  }

  if (tierNames) {
    const isInValidTierNames = validateTierNames(tierMap, tierNames);
    if (isInValidTierNames) {
      throw new Error('Incorrect tier names are passed');
    }
  }

  return {
    appIds,
    tiers: tierNames ? tierNames.map(tierName => tierMap.find(tier => tier.tierName === tierName)) : tierMap,
  };
}

export default async function build() {
  const compression = process.argv[3] === 'compress=true';
  try {
    const { appIds, tiers } = await getAppAndTiersToBuild();

    // const tiersBuilt = [];
    // for (let i = 0; i < tiers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const widgetUrl = await buildForTier({ url: "www.sprinklr.com", compression });
      // tiersBuilt.push({ ...tiers[i], appIds, widgetUrl });
    // }

    printTiers(tiersBuilt);
    fs.writeFileSync(config.BUILD_INFO, JSON.stringify(tiersBuilt), 'utf8');
  } catch (err) {
    console.log(err);
  }
}