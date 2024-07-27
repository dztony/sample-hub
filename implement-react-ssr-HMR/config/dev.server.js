import sharedServer from "./shared/shared.server.js";
import { merge } from 'webpack-merge';

export default merge(sharedServer, {
  mode: 'development',
  output: {
    ...sharedServer.output,
    filename: 'server-render_[contenthash:8].cjs',
    clean: true,
  },
});
