// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');

// Imports
const HtmlWebpackPlugin = require('html-webpack-plugin');


// Constants with our paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  JS: path.resolve(__dirname, 'src/js'),
  SRC: path.resolve(__dirname, 'src'),
};

// Webpack Configuration
module.exports = {
  entry: path.join(paths.SRC, 'index.jsx'),
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
    }),
  ],
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'eslint-loader' },
      { test: /\.css$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }] }],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
