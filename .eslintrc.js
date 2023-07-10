const alias = require('./alias');

module.exports = {
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias,
          },
        },
      },
    },
  },
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'sprinklr/i18n-string-is-valid': 'off',
  },
};
