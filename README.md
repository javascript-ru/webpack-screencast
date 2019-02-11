# Simple webpack example
## Installation
```bash
npm install
```
## Scripts
* `dev` - run webpack-dev-server;
* `start` - alias for `dev` script;
* `serve` - serve static from `dist` directory;
* `build` - production webpack build;
* `watch` - start webpack-dev-server with webpack-config watching;
* `stats` - webpack build with stats saving to `build` directory;
* `lint` - run eslint.

## Features
* `Nodemon` - watching `webpack.config.js` file and reloading `webpack-dev-server`.
* `ESlint` - linting;
* `webpack-dev-server` - development builds and server, HMR.
* Long Time Caching, `AssetsManifestPlugin`.
* SourceMap for development mode.
* `WebpackNotifierPlugin`.
* `HtmlWebpackPlugin`.
* `CleanWebpackPlugin`, `CopyWebpackPlugin`.
* `DefunePlugin`, `IgnorePlugin` for `moment.js`.
* Webpack Stats.
* Aliases.
* Dynamic imports.
* `postcss-loader`, `css-loader`, `style-loader`, `pug-loader`, `file-loader`/`url-loader`, `babel-loader`.
* `MiniCssExtractPlugin`.
