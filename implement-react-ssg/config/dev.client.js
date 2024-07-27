import sharedClient from "./shared/shared.client.js";
import { merge } from 'webpack-merge';
import webpack from "webpack";


export default merge(sharedClient, {
  mode: 'development',
  plugins: [
    ...sharedClient.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ],
  entry: [
    sharedClient.entry,
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&name=client&reload=true',
  ],
});
