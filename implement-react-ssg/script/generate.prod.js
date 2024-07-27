import clientConfig from '../config/prod.client.js';
import serverConfig from '../config/prod.server.js';
import { getServerRenderHtml } from "./util/common.js";

import path from 'node:path';
import fs from 'node:fs';

async function __main() {
  const ssrHtmlContent = await getServerRenderHtml(clientConfig, serverConfig);
  const clientHtmlPath = path.join(clientConfig.output.path, 'index.html');
  fs.writeFileSync(clientHtmlPath, ssrHtmlContent);
}

__main();
