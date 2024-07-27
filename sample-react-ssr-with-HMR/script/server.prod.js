import express from "express";
import clientConfig from '../config/prod.client.js';
import serverConfig from '../config/prod.server.js';
import { getServerRenderHtml } from "./util/common.js";

function __main() {
  const app = express();
  const port = 9000;

  app.use(clientConfig.output.publicPath, express.static(clientConfig.output.path));

  app.get('/', async (req, res) => {
    const ssrHtmlContent = await getServerRenderHtml(clientConfig, serverConfig);
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.send(ssrHtmlContent);
  });

  app.listen(port, () => {
    console.log(`server start at 9000 port 123123 - http://localhost:${9000}`);
  });
}

__main();
