const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const postcssPresetEnv = require('postcss-preset-env');
const WebpackNotifierPlugin = require('webpack-notifier');

const developmentEnv = process.env.NODE_ENV === 'development';

const lang = 'en';

function resolve(relPath) {
  return path.resolve(__dirname, relPath);
}

function extHash(name, ext, hash = '[hash]') {
  return developmentEnv ? `${name}.${ext}?${hash}` : `${name}.${hash}.${ext}`;
}

const commonConfig = {
  devtool: developmentEnv ? 'inline-cheap-module-source-map' : false,
  mode: developmentEnv ? 'development' : 'production',
  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.DefinePlugin({
      LANG: JSON.stringify(lang),
    }),
    new webpack.IgnorePlugin({
      checkResource(request, context) {
        if (request === '../moment') return false;
        if (!context.endsWith(path.join('node_modules', 'moment', 'locale'))) return false;
        if (lang === 'en') return true;
        if (request !== `./${lang}.js` && request !== `./${lang}`) return true;
      },
    }),
    {
      apply(compiler) {
        if (!developmentEnv) {
          compiler.plugin('done', function (stats) {
            stats = stats.toJson();
            if (!fs.existsSync('./build')) {
              fs.mkdirSync('./build');
            }
            fs.writeFileSync('./build/stats.json', JSON.stringify(stats));
          });
        }
      }
    }
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
          presets: [
            ['@babel/preset-env', {
              targets: {
                browsers: '> 3%'
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
          loader: 'file-loader',
          options: {
            name: '[path][name]'
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
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssPresetEnv({
                  features: {
                    'nesting-rules': true,
                    'custom-properties': true
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

module.exports = {
  developmentEnv,
  resolve,
  extHash,
  commonConfig
};
