import path from "node:path";
import { cwd } from "node:process";
import { merge } from 'webpack-merge';

import sharedConfig from './shared.js';

const serverConfig = {
  target: 'node',
  entry: path.join(cwd(), './src/entry-render.jsx'),
  output: {
    path: path.join(cwd(), './dist/server'),
    filename: 'server-render.cjs',
    chunkFilename: '[name].[contenthash:8].async.js',
    clean: false,
    library: {
      type: 'commonjs-static',
    },
  },
};

export default merge(sharedConfig, serverConfig);

