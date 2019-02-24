const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AssetsManifestPlugin = require('webpack-assets-manifest');
const { commonConfig, resolve } = require('./webpack-common.config');

module.exports = {
  ...commonConfig,
  entry: {
    'error_page': resolve('src/pages/error'),
    'item_page': resolve('src/pages/item'),
    'itemsList_page': resolve('src/pages/itemsList'),
    'main_page': resolve('src/pages/main'),
  },
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    ...commonConfig.plugins,
    new AssetsManifestPlugin({
      output: '../build/manifest.json'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/template.html',
      filename: 'error.html',
      chunks: ['error_page']
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/template.html',
      filename: 'index.html',
      chunks: ['main_page']
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/template.html',
      filename: 'item.html',
      chunks: ['item_page']
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/template.html',
      filename: 'items-list.html',
      chunks: ['itemsList_page']
    }),
    new CopyWebpackPlugin([{ from: 'assets' }]),
    new webpack.DllReferencePlugin({
      manifest: resolve('dist/dll/common-manifest.json')
    })
  ]
};
