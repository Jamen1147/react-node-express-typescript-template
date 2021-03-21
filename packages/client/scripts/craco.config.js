/* eslint-disable no-console */
const chalk = require('chalk');
const { whenProd, when } = require('@craco/craco');

module.exports = () => ({
  webpack: {
    configure: (config, { env }) => {
      when(env.NODE_ENV !== 'test', () =>
        console.log(chalk.green`\n------ executing {bold @craco} ------`)
      );

      /**
       * Adding babel-plugin-lodash to optimise lodash tree-shaking
       * Adding babel-plugin-react-remove-properties to remove rtl testing id if any
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

            babelLoader.options.plugins = [
              ...babelLoader.options.plugins,
              [
                require.resolve('babel-plugin-react-remove-properties'),
                { properties: [/data-testid/] },
              ],
            ];

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
