// Multi-entry сборка отдельно
// Long-term caching отдельно
// MiniCssExtractPlugin отдельно

// +DevServer
// +HtmlWebpackPlugin
// +CleanWebpackPlugin
// +dynamic imports
// +webpack-assets-manifest, cache
// +MiniCssExtractPlugin
// +IgnorePlugin

const fs = require('fs');
const path = require('path');
const cssnano = require('cssnano');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsManifestPlugin = require('webpack-assets-manifest');

const developmentEnv = process.env.NODE_ENV === 'development';

const lang = 'en';

function resolve(relPath) {
  return path.resolve(__dirname, relPath);
}

function extHash(name, ext, hash = '[hash]') {
  return developmentEnv ? `${name}.${ext}?${hash}` : `${name}.${hash}.${ext}`;
}

// default options (zero-config): https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js
// EntryOptions - https://github.com/webpack/webpack/blob/master/lib/EntryOptionPlugin.js

module.exports = (env) => { // env from CLI
  return {
    entry: {
      // default entry file - './src/index.js', default entry name - 'main'
      main: resolve('src/main.js')
    },
    output: {
      // default output - './dist/main.js'
      path: resolve('dist'),
      publicPath: '/',
      filename: extHash('[name]', 'js'),
      chunkFilename: extHash('[name]-[id]', 'js'),
    },

    devServer: {
      port: 8000,
      host: 'localhost',
      publicPath: '/',
      historyApiFallback: true,
      contentBase: resolve('dist'),
      writeToDisk: true
    },

    // not eval to read compiled source in the screencast
    devtool: developmentEnv ? 'inline-cheap-module-source-map' : false,
    mode: developmentEnv ? 'development' : 'production',

    optimization: developmentEnv ? {} : {
      minimizer: [
        // https://davidwalsh.name/compress-uglify
        // https://webpack.js.org/plugins/terser-webpack-plugin/
        // default webpack config: https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js#L298-L314
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              unused: true,
              booleans: true,
              join_vars: true,
              warnings: true
            }
          }
        })
      ],
    },

    /*
    // if we're not using devserver
    watch: developmentEnv,

    watchOptions: {
      aggregateTimeout: 30,
      ignored:          /node_modules/
    },
     */

    plugins: [
      new WebpackNotifierPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/template.html',
        filename: 'index.html',
        chunksSortMode: 'none' // temporary fix, https://github.com/facebook/create-react-app/issues/4667
      }),
      new CleanWebpackPlugin(['dist', 'build']),
      new CopyWebpackPlugin([{ from: 'assets' }]),
      new webpack.DefinePlugin({
        LANG: JSON.stringify(lang),
      }),
      new AssetsManifestPlugin({
        // for LTS
        // move it out of public root (not needed there)
        output: '../build/manifest.json'
      }),
      // new MiniCssExtractPlugin({
      //   filename:   extHash('[name]', 'css'),
      //   chunkFilename: extHash('[name]-[id]', 'css')
      // }),
      // ignore all moment locales except current lang
      new webpack.IgnorePlugin({
        checkResource(request, context) {
          // locale requires that file back from it, need to keep it
          if (request === '../moment') return false; // don't ignore this
          // only ignore locales
          if (!context.endsWith(path.join('node_modules', 'moment', 'locale'))) return false;
          // for "en" ignore all locale files, no need
          if (lang === 'en') return true;
          // don't ignore current locale ./ru ./ru.js
          if (request !== `./${lang}.js` && request !== `./${lang}`) return true;
        },
      }),

      // webpack visualizer only shows modules (obvious which one is not needed)
      // webpack analyzer shows which modules requires which modules
      //  can use VisualizerPlugin to generate html or upload to service
      {
        apply(compiler) {
          if (!developmentEnv) {
            compiler.plugin('done', function (stats) { // https://github.com/FormidableLabs/webpack-stats-plugin
              stats = stats.toJson();
              if (!fs.existsSync('./build')) {
                fs.mkdirSync('./build');
              }
              fs.writeFileSync('./build/stats.json', JSON.stringify(stats));
            });
          }
        }
      },
    ],
    resolve: {
      extensions: ['.js'],
      alias: {
        lib: resolve('lib'),
        utils: resolve('utils')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: '> 3%'
                  // browsers: '> 3%, ie 11' // ie 11 transpiles classes
                }
              }]
            ],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        },
        {
          test: /\.(gif|png|jpg)$/,
          use: [{
            // also exists url-loader
            loader: 'file-loader',
            options: {
              name: extHash('[path][name]', '[ext]')
            }
          }]
        },
        {
          test: /\.pug/,
          use: 'pug-loader'
        },
        {
          test: /\.css$/,
          use: [
            // {
            //   loader: MiniCssExtractPlugin.loader
            // },
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                // css loader needs to know how many loaders to apply to all imported files
                // any @import'ed css first gets through loaders below (separately from other imported files)
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => {
                  const plugins = [
                    postcssPresetEnv({
                      features: {
                        'nesting-rules': true,
                        // https://github.com/postcss/postcss-custom-properties/issues/167
                        'custom-properties': true // css vars
                      }
                    })
                  ];
                  if (!developmentEnv) {
                    // alternative - optimize-css-assets-webpack-plugin
                    plugins.push(cssnano({
                      preset: 'default'
                    }));
                  }
                  return plugins;
                }
              }
            }
          ]
        }
      ]
    }
  };
};
