const path = require('path')
const webpack = require('webpack')
const BrowserSync = require('browser-sync-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.jsx?/, loaders: ['babel'], include: path.join(__dirname, 'src') },
      { test: /\.json/, loaders: ['json'], include: path.join(__dirname, 'src') }
    ]
  }
}