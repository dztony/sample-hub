import runServer from "./webpack.dev.js";
import runBuild from './webpack.prod.js';

async function __start() {
  const nodeEnvType = process.env.NODE_ENV;
  if (nodeEnvType === 'development') {
    await runServer();
  } else if (nodeEnvType === 'production') {
    runBuild();
  } else {
    throw Error(`UnKnow NODE_ENV type - ${nodeEnvType}`);
  }
}

__start();
