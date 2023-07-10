const fs = require('fs');
const glob = require('glob');

const { sync: globSync } = glob;

const filePattern = './temp-locales/**/*.json';
const outputDir = './src/locales/';

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
let defaultMessages = globSync(filePattern)
  .map(filename => fs.readFileSync(filename, 'utf8'))
  .map(file => JSON.parse(file))
  .reduce((collection, descriptors) => {
    descriptors.forEach(({ id, defaultMessage }) => {
      collection[id] = defaultMessage;
    });

    return collection;
  }, {});

// Write the messages to this directory
fs.writeFileSync(outputDir + 'en.json', JSON.stringify(defaultMessages, null, 2));
