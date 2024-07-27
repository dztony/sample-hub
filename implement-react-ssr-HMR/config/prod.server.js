import sharedServer from "./shared/shared.server.js";
import { merge } from 'webpack-merge';

export default merge(sharedServer, {
  mode: 'production',
});
