import express from 'express';
import path from 'path';
import { fileURLToPath } from 'node:url'

export default function devServer(config = {}) {
  const { port = 3000, isDev = true } = config;
  let status = false;
  return {
    name: 'dev-server',
    version: '1.0.0',
    watchChange(id, change) {

    },
    writeBundle(outputOptions, bundle) {
      const outputDir = outputOptions.dir;
      if (isDev && !status) {
        createDevServer(port, outputDir);
        status = true;
      }
    },
  };
}

function createDevServer(port, staticDir) {
  const app = express();
  app.use(express.static(staticDir));

  app.get('*', (req, res) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const target = path.resolve(__dirname, staticDir, 'index.html');
    res.sendFile(target);
  });

  app.listen(port, () => {
    console.log(`本地开发服务器地址为 localhost:${port}`);
  });
}
