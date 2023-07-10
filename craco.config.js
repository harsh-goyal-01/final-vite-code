// Using approach being discussed in https://github.com/facebook/create-react-app/issues/5118

const overrideWebpackConfigPlugin = require('./internals/craco/overrideWebpackConfigPlugin');
const alias = require('./alias');
const overrideJestConfig = require('./internals/craco/overrideJestConfig');
// Ref: https://github.com/emotion-js/emotion/issues/1123
const emotionBabelPreset = require('@emotion/babel-preset-css-prop').default(undefined, {});
// const { ESLINT_MODES } = require('@craco/craco');

module.exports = {
  babel: {
    plugins: [
      ...emotionBabelPreset.plugins,
      [
        'react-intl-auto',
        {
          removePrefix: true,
          includeExportName: false,
        },
      ],
      'babel-plugin-lodash',
    ],
  },
  webpack: {
    alias,
  },
  jest: {
    configure: overrideJestConfig,
  },
  eslint: {
    // mode: ESLINT_MODES.file,
    enable: false,
  },
  typescript: {
    enableTypeChecking: false,
  },
  plugins: [
    {
      plugin: overrideWebpackConfigPlugin,
    },
  ],
};
