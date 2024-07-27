import shared from './webpack.shared.js';

import { merge } from 'webpack-merge';
import webpack from 'webpack';

import PluginPrintAssetInfo from "./plugin/plugin-print-asset-info.js";

const prodConfig = merge(shared, {
  mode: 'production',
  // devtool: "source-map",
  plugins: [
    new PluginPrintAssetInfo(),
  ],
});

function runBuild() {
  const compiler = webpack(prodConfig);
  // console.log('Starting compile...');
  compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
      // console.error('webpack 编译失败');
    } else {
      // console.log('webpack 编译完成');
    }

    compiler.close((closeError) => {

    });
  });
}

export default runBuild;
