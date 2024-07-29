import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import configClient from '../config/dev.client.js';
import configServer from '../config/dev.server.js';
import { getServerRenderHtml } from "./util/common.js";

function __dev() {
  const app = express();
  const port = 8999;
  const multiCompiler = webpack([configClient, configServer]);
  const compilerClient = multiCompiler.compilers[0];

  app.use(webpackDevMiddleware(multiCompiler, {
    writeToDisk: true,
  }));

  app.use(webpackHotMiddleware(compilerClient, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 2000,
    }),
  );

  app.use(configClient.output.publicPath, express.static(configClient.output.path));

  app.get('/*', async(req, res) => {
    const htmlContent = await getServerRenderHtml(configClient, configServer);
    return res.send(htmlContent);
  });

  app.listen(port, () => {
    console.log(`dev server start at - http://localhost:${port}`);
  });
}

__dev();
