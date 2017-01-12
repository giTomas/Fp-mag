const webpack = require('webpack');
// const path = require('path');

const config = {
  entry: './index.js',

  output: {
    path: './',
    // publicPath:'./',
    filename: 'bundle.js'
  },

  devServer: {
    inline: true,
    // historyApiFallback: true,
    port: 8080
  },
  eslint: {
    emitWarning: true,
    configfile: './.eslintrc',
  },
  module: {
    preLoaders: [
      {
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
       }
    ],
    loaders: [
        {
          test:/\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',


          query: {
            cacheDirectory: true,
            presets: ['es2015', 'react', 'stage-0', 'stage-1', 'stage-3'],
            plugins: ['transform-decorators-legacy']
          },
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader",
        },
        {
          test: /\.json$/,
          loader: 'json'
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
              'file?hash=sha512&digest=hex&name=[hash].[ext]',
              'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.ProvidePlugin({
    Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
    fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
  }),
  //   new webpack.DefinePlugin({
  //     'process.env.NODE_ENV': JSON.stringify('production')
  //   }),
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false
  //     }
  //   })
  ]

};

module.exports = config;
