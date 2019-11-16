const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const clientConfig = {
  mode: isDev ? 'development' : 'production',
  entry: path.resolve(__dirname, '../src/client/index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../public'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'local',
                localIdentName: '[local]-[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
};

if (!isDev) {
  (clientConfig.optimization = {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: 'all',
    },
  }),
    (clientConfig.plugins = [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
    ]);
}

module.exports = merge(baseConfig, clientConfig);
