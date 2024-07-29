import sharedClient from "./shared/shared.client.js";
import { merge } from 'webpack-merge';

export default merge(sharedClient, {
  mode: 'production',
});
