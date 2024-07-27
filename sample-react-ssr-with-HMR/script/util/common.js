import fs from "node:fs";
import path from "node:path";
import { cwd } from "node:process";

export async function getServerRenderHtml(configClient, configServer) {
  const htmlContent = await getReactString(configServer);
  const targetIndexPath = path.join(configClient.output.path, 'index.html');
  const csrHtmlContent = fs.readFileSync(targetIndexPath).toString();
  return csrHtmlContent.replace('<!--SSR-INJECT-->', htmlContent);
}

async function getReactString(webpackConfig) {
  try {
    const serverRenderFile = pickServerRenderFile(webpackConfig);
    const importPath = serverRenderFile.replace(cwd(), '../..').replaceAll('\\', '/');
    const { serverRenderer } = await import(importPath);
    return serverRenderer();
  } catch (e) {
    console.error(e);
    return '<h3>server error</h3>';
  }
}

function pickServerRenderFile(webpackConfig) {
  const files = fs.readdirSync(webpackConfig.output.path);
  const outputFilename = webpackConfig.output.filename.split('_')[0];
  for (const f of files) {
    if (f.startsWith(outputFilename)) {
      return path.join(webpackConfig.output.path, f);
    }
  }

  throw Error('can not find server render file');
}
