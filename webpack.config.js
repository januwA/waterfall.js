const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "src/index.ts"),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
		inject: false,
		template: './index.html'
    }),
  ],
  output: {
    library: {
      name: "waterfall",
      type: "umd",
    },
    path: path.resolve(__dirname, "dist"),
    filename: "waterfall.js",
    clean: true,
  },
};
