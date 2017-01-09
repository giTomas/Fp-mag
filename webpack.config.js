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
    historyApiFallback: true,
    port: 8080
  },

  module: {
    loaders: [
        {
          test:/\.jsx?$/,
          exclude: /node_module/,
          loader: 'babel-loader',


          query: {
            cacheDirectory: true,
            presets: ['es2015', 'react', 'stage-0', 'stage-1', 'stage-3'],
            plugins: ['transform-decorators-legacy']
          },
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader",
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
    extensions: ['', '.js', '.jsx']
  },
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env.NODE_ENV': JSON.stringify('production')
  //   }),
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false
  //     }
  //   })
  // ]

};

module.exports = config;
