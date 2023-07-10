// Preset used by CRA to transform ts/tsx/js/jsx files is babel-preset-react-app which
// we override with our own custom preset @sprinklr/babel-preset-react-app.
// Here the same preset is used.

module.exports = {
  presets: ['@sprinklr/babel-preset-react-app'],
  plugins: [
    [
      'react-intl-auto',
      {
        removePrefix: true,
        includeExportName: false,
      },
    ],
  ],
};
// This config is used by both babel-jest and ts-jest.
