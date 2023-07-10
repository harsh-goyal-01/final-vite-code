/**
 * User: abhinavsingi
 * Date: 04/02/19
 * Time: 7:55 PM
 * Desc:
 */

import fs from 'fs';
import path from 'path';
import sh from './tools/runBashScript';

const ENVIRONMENT_INPUT = path.resolve(process.cwd(), '.env.production');
const ENVIRONMENT_OUTPUT = path.join(process.cwd(), '.env.production.local');

async function buildPackages() {
  return sh('sh internals/build/build-packages.sh');
}

function generateEnvOutput() {
  const content = fs.readFileSync(ENVIRONMENT_INPUT, 'utf8');
  const envOverrides = fs.readFileSync(ENVIRONMENT_OUTPUT, { encoding: 'utf8', flag: 'w+' });
  fs.writeFileSync(ENVIRONMENT_OUTPUT, `${content}\n${envOverrides}`, 'utf8');
}

export default async function prebuild() {
  await buildPackages();
  generateEnvOutput();

  require('react-scripts/config/env');
}