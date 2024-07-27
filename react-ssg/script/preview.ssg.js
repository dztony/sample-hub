import express from "express";
import path from 'node:path';
import clientConfig from '../config/prod.client.js';

function __main() {
  const app = express();
  const port = 9001;
  app.use(clientConfig.output.publicPath, express.static(clientConfig.output.path));

  app.get('/', (req, res) => {
    const indexHtml = path.join(clientConfig.output.path, 'index.html');
    return res.sendFile(indexHtml);
  });

  app.listen(port, () => {
    console.log(`preview server start at - http://localhost:${port}`);
  });
}

__main();
