// Multi-entry сборка отдельно
// Long-term caching отдельно
// MiniCssExtractPlugin отдельно

// +DevServer
// +HtmlWebpackPlugin
// +CleanWebpackPlugin
// +dynamic imports
// +webpack-assets-manifest

// TODO: динамический require с переменной (через контекст),
//  убирание лишнего через комменты https://webpack.js.org/api/module-methods/#import-
//  для сторонних модулей (moment.js): IgnorePlugin c функцией проверки контекста

const path = require('path');
const webpack = require('webpack');
const postcssPresetEnv = require('postcss-preset-env');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsManifestPlugin = require('webpack-assets-manifest');

const nodeEnv = process.env.NODE_ENV; // development || production || test
const lang = process.env.LANG || 'en';

function resolve(relPath) {
  return path.resolve(__dirname, relPath);
}

module.exports = {
  entry:     {
    // default name is main also
    main: resolve('src/main.js')
  },
  output:    {
    path:          resolve('dist'),
    publicPath:    '/',
    filename:      '[name].js',
    chunkFilename: 'chunk.[name].js'
  },
  devServer: {
    port:               8000,
    host:               'localhost',
    publicPath:         '/',
    historyApiFallback: true,
    contentBase:        resolve('dist'),
    writeToDisk:        true
  },

  // not eval to read compiled source in the screencast
  devtool: nodeEnv === 'development' ? 'inline-cheap-module-source-map' : false,

  plugins: [
    new WebpackNotifierPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('src/template.html'),
      filename: resolve('dist/index.html'),
      chunksSortMode: 'none' // https://github.com/facebook/create-react-app/issues/4667
    }),
    new CleanWebpackPlugin(resolve('dist')),
    new CopyWebpackPlugin([{from: 'assets', to: resolve('dist/assets')}]),
    new webpack.DefinePlugin({
      LANG: JSON.stringify(lang),
    }),
    new AssetsManifestPlugin()
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      lib: resolve('lib')
    }
  },
  module:  {
    rules: [
      {
        test:    /\.js$/,
        exclude: /node_modules/,
        loader:  'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: {
                browsers: '> 3%, ie 11'
              }
            }]
          ],
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-syntax-dynamic-import'
          ]
        }
      },
      {
        test: /\.(gif|png|jpg)$/,
        use:  [{
          loader:  'url-loader',
          options: {
            limit: 1000,
            name:  'assets/[name].[hash:4].[ext]'
          }
        }]
      },
      {
        test: /\.css$/,
        use:  [
          'style-loader',
          {
            loader:  'css-loader',
            // TODO: why this is needed?
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader', options: {
              ident:   'postcss',
              plugins: () => [
                postcssPresetEnv({
                  features: {
                    'nesting-rules': true
                  }
                })
              ]
            }
          }
        ]
      }
    ]
  }
};
