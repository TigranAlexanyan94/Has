const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' },
        ]
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: [
          { loader: 'url-loader' }
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({template: './public/index.html'}),
    new Dotenv({ systemvars: true }),
  ],
  devServer: {
    historyApiFallback: true
  },
}
