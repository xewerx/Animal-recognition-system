const path = require("path");
const slsw = require("serverless-webpack");

module.exports = {
  mode: "production",
  devtool: "cheap-source-map",
  entry: slsw.lib.entries,
  target: "node",
  resolve: {
    extensions: [".cjs", ".mjs", ".js", ".ts"]
  },
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  },
  externals: ["aws-sdk", "aws-crt"],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        exclude: [[path.resolve(__dirname, ".webpack"), path.resolve(__dirname, ".serverless")]],
        options: {
          transpileOnly: true,
          experimentalFileCaching: true
        }
      }
    ]
  }
};
