const path = require("path");
const nodeExternals = require("webpack-node-externals");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");

const isDev = process.env.NODE_ENV === "development";

const serverConfig = {
  target: "node",
  mode: isDev ? "development" : "production",
  entry: path.resolve(__dirname, "../src/server/index.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]_[local]_[hash:base64:5]"
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, "../src"),
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                mode: "local",
                localIdentName: "[local]-[hash:base64:5]"
              }
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  externals: [nodeExternals()]
};

module.exports = merge(baseConfig, serverConfig);
