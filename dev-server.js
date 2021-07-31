const webpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");

const config = require("./webpack.config.js");

const options = {
  host: "localhost",
  open: true,
  port: 6677,
  writeToDisk: false,
  compress: true,
  historyApiFallback: true,
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(options.port, options.host, () => {
  console.log(`dev server listening on port ${options.port}`);
});
