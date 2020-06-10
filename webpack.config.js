const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = (env) => {

  return {
    entry: ['@babel/polyfill', './src/app.js'],
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, '/public'),
    },
    plugins: [

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      })
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
    },
  };
}
// Finish setup
