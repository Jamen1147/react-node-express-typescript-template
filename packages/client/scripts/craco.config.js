/* eslint-disable no-console */
const chalk = require('chalk');
const { whenProd, when } = require('@craco/craco');
const paths = require('./paths.js');

module.exports = () => ({
  webpack: {
    configure: (config, { env }) => {
      when(env.NODE_ENV !== 'test', () =>
        console.log(chalk.green`\n------ executing {bold @craco} ------`)
      );

      /**
       * Adding babel-plugin-lodash to optimise lodash tree-shaking
       * Adding babel-plugin-react-remove-properties to remove rtl testing id if any
       * Asking babel-loader to deal with sources imported from other packages
       */
      config.module.rules.forEach((rule) => {
        if (rule.oneOf) {
          const babelLoader = rule.oneOf.find(
            (r) => r.loader.indexOf('babel-loader') !== -1
          );
          if (babelLoader && babelLoader.options) {
            console.log(
              chalk.yellow`adding {bold babel-plugin-react-remove-properties} to remove rtl testing ids`
            );

            /**
             * Remove data-testid attribute if any
             */
            babelLoader.options.plugins = [
              ...babelLoader.options.plugins,
              [
                require.resolve('babel-plugin-react-remove-properties'),
                { properties: [/data-testid/] },
              ],
            ];

            /**
             * Adding more sources from other packages to babel-loader
             */
            const include = [
              paths.thisApp,
              paths.commonModule,
              paths.componentModule,
            ];
            if (Array.isArray(babelLoader.include)) {
              babelLoader.include.push(...include);
            } else {
              babelLoader.include = include;
            }

            /**
             * Improve lodash tree-shaking
             */
            whenProd(() => {
              console.log(
                chalk.yellow`adding {bold babel-plugin-lodash} to improve lodash tree-shaking`
              );

              babelLoader.options.plugins = [
                ...babelLoader.options.plugins,
                require.resolve('babel-plugin-lodash'),
              ];
            });
          }
        }
      });

      when(env.NODE_ENV !== 'test', () =>
        console.log(chalk.green`------ end of {bold @craco} ------\n`)
      );

      return config;
    },
  },
});
