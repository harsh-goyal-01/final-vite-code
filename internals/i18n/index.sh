#! /bin/bash

echo "$(date -u): Cleaning up..."
rm -rf temp temp-locales

echo "$(date -u): Compiling Typescript..."
../../node_modules/.bin/tsc -p . --noEmit false --outDir temp >/dev/null

echo "$(date -u): Extracting label from baseweb packages..."
cd ../baseweb && npm run build
cp -r ./lib ../web/temp/baseweb
cd ../web

echo "$(date -u): Running Babel..."
NODE_ENV=production node_modules/.bin/babel --config-file ./internals/i18n/.i18n.babelrc ./temp >/dev/null

echo "$(date -u): Collecting all labels..."
node internals/i18n/aggregateLabels

echo "$(date -u): Cleaning up..."
rm -rf temp temp-locales

sh ./internals/i18n/updateLabels.sh

echo "$(date -u): Task Success - Emitted en.json"