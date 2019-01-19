const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/script.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'script.js',
    chunkFilename: 'chunk.[name].[chunkhash:4].js'
  },
  devServer: {
    port: 8000,
    host: 'localhost',
    publicPath: '/',
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/template.html'),
      filename: path.resolve(__dirname, './dist/index.html'),
      inject: false
    }),
    new CleanWebpackPlugin(path.resolve(__dirname, './dist'))
  ],
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-syntax-dynamic-import']
        }
      },
      {
        test: /\.(gif|png|jpg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: 'assets/[name].[hash:4].[ext]'
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  }
};
