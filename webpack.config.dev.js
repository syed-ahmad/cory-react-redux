const webpack = require('webpack'); // Node lacks support for ES module
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
  mode: 'development',
  target: 'web',
  devTool: 'cheap-module-source-map',
  entry: 'src/index',
  output: {
    // webpack doesn't output code in development mode
    // It serves app from memory
    path: path.resolve(__dirname, 'build'),
    public: '/', // mapped to /build
    filename: 'bundle.js'
  },
  devServer: {
    stats: 'minimal',
    overlay: true, // overlay errors in browser
    historyApiFallback: true, // all requests will be sent to index.html and deep links will be hanldled by react-router
    // Following three configs are needed as webpack need to resolve an existing issue
    disableHostCheck: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    https: false
  },
  plugin: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/favicon.ico'
    })
  ],
  module: {
    // Inform webpack what files to handle
    rules: [
      {
        test: /\.(js|jsx)$/, // files to look for
        exclude: /node_modules/,
        use: ['babel-loader'] // what to do with the above js/jsx files, use babel-loader to bundle those up
      },
      {
        test: /(\.css)$/, // process css
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
