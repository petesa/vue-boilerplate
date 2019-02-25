'use strict';

const path = require('path');
// const webpack = require('webpack');
// const dotenv = require('dotenv');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
/* const envKeys = Object.keys(env).reduce((prev, next) => {
  const clone = prev;
  clone[next] = JSON.stringify(env[next]);
  return prev;
}, {}); */

/* const productionPluginDefine = [
  new webpack.DefinePlugin({
    'process.env': {
      ...envKeys,
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
]; */

const commonLoaders = [
  {
    test: /\.json$/,
    loader: 'json-loader',
  },
];

const distDir = path.join(__dirname, './dist');
const clientDir = path.resolve(__dirname, './src/client');
const serverDir = path.resolve(__dirname, './src/server');
const publicPath = path.resolve(__dirname, './public');

const mode = 'development';

module.exports = [
  {
    mode,
    entry: ['babel-polyfill', `${serverDir}/index.js`],
    output: {
      path: distDir,
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      publicPath: '/',
    },
    target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },
    externals: nodeExternals(),
    // plugins: productionPluginDefine,
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
        },
        {
          test: /\.s?css$/,
          use: 'ignore-loader',
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          loader: 'file-loader?limit=1024&name=assets/[hash].[ext]',
        },
      ].concat(commonLoaders),
    },
  },
  {
    mode,
    entry: `${clientDir}/main.js`,
    output: {
      path: distDir,
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        /* {
          test: /\.html$/,
          loader: 'html',
          query: {
            interpolate: 'require',
          },
        }, */
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('css-loader'),
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader', // creates style nodes from JS strings
            'css-loader', // translates CSS into CommonJS
            'sass-loader', // compiles Sass to CSS, using Node Sass by default
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          loader: 'file-loader?limit=1024&name=/assets/[hash].[ext]',
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('/assets/styles.css'),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: `${publicPath}/index.html`,
      }),
    ],
    resolve: {
      extensions: ['*', '.js', '.jsx', '.scss'],
    },
  },
];
