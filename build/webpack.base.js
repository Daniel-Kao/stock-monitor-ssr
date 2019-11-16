const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)/,
        use: {
          loader: 'url-loader',
          options: {
            filename: '[name].[hash].[ext]',
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
