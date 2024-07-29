import { merge } from 'webpack-merge';
import webpack from "webpack";
import webpackDevServer from 'webpack-dev-server';
import path from 'node:path';

import shared from './webpack.shared.js';
import { getDirname } from "./utils.js";

const __dirname = getDirname(import.meta.url);


const devConfig = merge(shared, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    open: false,
    port: 9527,
    host: '0.0.0.0',
    hot: true,
    compress: true,
    historyApiFallback: {
      index: '/',
      disableDotRule: true,
    },
  },
});

async function runServer() {
  const compiler = webpack(devConfig);
  const devServer = new webpackDevServer({ ...devConfig.devServer }, compiler);

  // console.log('Starting server...');
  await devServer.start();
}

export default runServer;
