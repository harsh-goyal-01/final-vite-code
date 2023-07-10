const jestConfigOveride = require('../../jest.config.js');

module.exports = jestConfig => ({ ...jestConfig, ...jestConfigOveride });
