const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => ({
  entry: ['@babel/polyfill', './src/app.js'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public'),
  },
  plugins: [
    new Dotenv({
      path: 'config/.env',
      silent: true,
    }),
  ],
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    compress: true,
    host: 'ui.tasksy.com',
  },
});
// Finish setup
