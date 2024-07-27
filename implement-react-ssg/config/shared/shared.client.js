import sharedConfig from './shared.js';
import { merge } from 'webpack-merge';
import path from "node:path";
import { cwd } from "node:process";
import PluginHtmlWebpack from "html-webpack-plugin";

const clientConfig = {
  entry: path.join(cwd(), './src/entry-client.jsx'),
  output: {
    path: path.join(cwd(), './dist/client'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].async.js',
    clean: false,
    publicPath: '/static',
  },
  plugins: [
    ...sharedConfig.plugins,
    new PluginHtmlWebpack({
      template: path.join(cwd(), './src/index.html'),
      filename: 'index.html',
      minify: {
        removeComments: false,
        collapseWhitespace: true,
      },
    }),
  ],
};

export default merge(sharedConfig, clientConfig);
