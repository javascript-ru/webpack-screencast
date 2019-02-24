const path = require('path');
const webpack = require('webpack');
const { commonConfig, resolve } = require('./webpack-common.config');

module.exports = {
  ...commonConfig,
  entry: {
    common: [
      resolve('src/utils/renderMenu.js'),
      resolve('src/utils/renderPage.js'),
      resolve('src/utils/renderTemplate.js'),
      resolve('src/common.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist/dll'),
    filename: '[name].dll.js',
    library: '[name]_dll'
  },
  plugins: [
    ...commonConfig.plugins,
    new webpack.DllPlugin({
      name: '[name]_dll',
      path: resolve('dist/dll/[name]-manifest.json')
    })
  ]
};
