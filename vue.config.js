const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const IsFormalProduction = process.env.VUE_APP_TITLE === 'production';
const IsDevelopment = process.env.VUE_APP_TITLE === 'development';
const IsTest = process.env.VUE_APP_TITLE === 'test';

module.exports = {
  productionSourceMap: false,
  configureWebpack: config => {
    if (IsDevelopment) {
      config.devtool = '#eval-source-map';
    } else {
      const plugins = [];
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true, // console
              drop_console: true,
              pure_funcs: ['console.log'] // 移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      );
      config.plugins = [...config.plugins, ...plugins];
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')).set('_c', resolve('src/components'));
  }
};
