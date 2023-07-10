const BaseJestConfig = require('../../jest.base.config');

const BabelConfig = require('./internals/jest/jest-babel.config');

/*
Below jest options are needed along with react-scripts jest-config.
This below config is merged with jest config provided by react scripts
in packages/web/internals/craco/overrideJestConfig.js
*/
module.exports = {
  ...BaseJestConfig,
  /*
   This is set to false, as react-scripts v4 jest config has resetMocks as true.
   */
  resetMocks: false,
  transform: {
    ...BaseJestConfig.transform,
    '.(j|t)s(x?)$': './internals/jest/babel-transformer.js',
  },
  globals: {
    'ts-jest': {
      // To carry out certain transformations like for emotion components, ts-jest gives this babelConfig to babel-jest, which in turn transforms.
      // https://kulshekhar.github.io/ts-jest/user/config/babelConfig
      babelConfig: BabelConfig,
      tsConfig: '<rootDir>/ci.tsconfig.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/internals/jest/setup.ts'],
  moduleNameMapper: {
    '\\.(svg|png)$': '<rootDir>/internals/jest/mocks/imageMock.js',
    '^@chat-app(.*)': '<rootDir>/src/chat-app$1',
    '^@teams-app(.*)': '<rootDir>/src/teams-app$1',
    '^@proactive-prompt-app(.*)': '<rootDir>/src/proactive-prompt-app$1',
    '^@utils(.*)': '<rootDir>/src/utils$1',
    '^@locales(.*)': '<rootDir>/src/locales$1',
    '^@sdk(.*)': '<rootDir>/src/sdk$1',
    '^@typings/app': '<rootDir>/src/typings/app.d.ts',
    '^@hooks(.*)': '<rootDir>/src/hooks$1',
    '^@/(.*)': '<rootDir>/src/$1',
    '^@stream-app(.*)': '<rootDir>/src/stream-app$1',
  },
};
