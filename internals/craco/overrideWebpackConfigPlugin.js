/* eslint-disable  @typescript-eslint/no-var-requires -- needed cjs */
const { getLoaders, loaderByName } = require('@craco/craco');
const path = require('path');
const getCacheIdentifier = require('react-dev-utils/getCacheIdentifier');

module.exports = {
  overrideWebpackConfig: ({ webpackConfig, pluginOptions, context: { env, paths } }) => {
    if (pluginOptions && pluginOptions.preText) {
      console.log(pluginOptions.preText);
    }

    // const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'));
    // if (isFound) {
    //   Array.prototype.push.apply(match.loader.options.plugins, [
    //     [
    //       'react-intl-auto',
    //       {
    //         removePrefix: true,
    //         includeExportName: true,
    //       },
    //     ],
    //     'babel-plugin-lodash',
    //   ]);
    // }
    // console.log(JSON.stringify(getLoader(webpackConfig, loaderByName('babel-loader')).match.loader.options));

    const isEnvDevelopment = env === 'development';
    const isEnvProduction = env === 'production';
    const isModernBuild = process.env.BROWSERSLIST_ENV === 'production-modern';

    webpackConfig.output = {
      ...webpackConfig.output,
      // this defaults to 'window', but by setting it to 'this' then module chunks which are built will work in web workers as well.
      globalObject: '(self || this)',
      filename: isEnvProduction
        ? `static/js/${isModernBuild ? 'modern' : 'legacy'}/[name].[contenthash:8].js`
        : isEnvDevelopment && 'static/js/bundle.js',
      chunkFilename: isEnvProduction
        ? `static/js/${isModernBuild ? 'modern' : 'legacy'}/[name].[contenthash:8].js`
        : isEnvDevelopment && 'static/js/[name].chunk.js',
    };

    webpackConfig.optimization = {
      ...webpackConfig.optimization,

      // Setting this to false merges runtime code in main bundle
      // https://webpack.js.org/configuration/optimization/#optimization-runtimechunk
      runtimeChunk: false,

      // Add additional settings for splitChunks
      splitChunks: {
        chunks: 'all',
        /* Smaller chunks can increase the total load time as the dependent chunks have to wait for an extra network request.
        Combining them in the main parent chunk help us fetching the whole bundle in a single network request.
        This flag is only for the combined chunk created by webpack by default and not any manual chunks created using dynamic imports.
        This size is in static file sizes ( i.e. sizes before minification and compression ).
        This 100KB min chunk size is estimated to 10KB gzipped size.
        That might differ in some case as the static file size can be larger for some minified file. */
        minSize: 100000,
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    };

    // CRA v3.4.4 node_modules/react-scripts/config/webpack.config.js, line-382-471 needs to be
    // overridden for replacing babel-preset-react-app with @sprinklr/babel-preset-react-app.
    // The first object in the above is for project files and next is for files out of the project.
    // The former includes the 'include' option and the latter doesn't and with this criteria, we
    // have put a check below for match.loader.include

    const { hasFoundAny, matches } = getLoaders(webpackConfig, loaderByName('babel-loader'));
    if (hasFoundAny) {
      matches.forEach(match => {
        const src = match.loader.include;
        if (src) {
          match.loader.include = [src, path.resolve(paths.appNodeModules)];
          match.loader.options = {
            ...match.loader.options,
            cacheDirectory: isEnvDevelopment,
            customize: require.resolve('@sprinklr/babel-preset-react-app/webpack-overrides'),
            presets: [require.resolve('@sprinklr/babel-preset-react-app')],
            cacheIdentifier: getCacheIdentifier(isEnvProduction ? 'production' : isEnvDevelopment && 'development', [
              'babel-plugin-named-asset-import',
              '@sprinklr/babel-preset-react-app',
              'react-dev-utils',
              'react-scripts',
            ]),
          };
        } else {
          match.loader.options = {
            ...match.loader.options,
            cacheDirectory: isEnvDevelopment,
            presets: [[require.resolve('@sprinklr/babel-preset-react-app/dependencies'), { helpers: true }]],
            cacheIdentifier: getCacheIdentifier(isEnvProduction ? 'production' : isEnvDevelopment && 'development', [
              'babel-plugin-named-asset-import',
              '@sprinklr/babel-preset-react-app',
              'react-dev-utils',
              'react-scripts',
            ]),
          };
        }
      });
    }

    return webpackConfig;
  },
};
