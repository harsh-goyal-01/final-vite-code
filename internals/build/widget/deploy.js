import sh from '../tools/runBashScript';
import config from './config';
import fs from 'fs';

function printTier(tier) {
  console.log('------------ !!!!TIER DEPLOYED!!!! --------------');
  console.log(JSON.stringify(tier));
  console.log('-----------------------------------------------');
}

async function deployTier({ widgetUrl, appIds, tierName }) {
  let requestUrl = `${config.BASE_URL}/livechat/0/update-tier-widget-url`;
  if (appIds) {
    requestUrl+=`?appId=${appIds}`;
  } else {
    requestUrl+=`?tierName=${tierName}`
  }

  const command = `curl --verbose -H "Content-Type: application/json" -X POST "${requestUrl}" -d '${widgetUrl}'`;
  await sh(command);
}

export default async function deploy() {
  const buildInfo = fs.readFileSync(config.BUILD_INFO, 'utf8');
  const tiersBuilt = JSON.parse(buildInfo);
  for (let i = 0; i < tiersBuilt.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await deployTier(tiersBuilt[i]);
    printTier(tiersBuilt[i])
  }
}