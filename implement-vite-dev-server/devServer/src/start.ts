import express from 'express';
import { blue } from 'picocolors';

import { ServerPort } from "./utils";
import middlewareLogger from "./middleware/middlewareLogger";
import middlewareHtml from "./middleware/middlewareHtml";
import middlewareTransformHtmlImport from "./middleware/middlewareTransformHtmlImport";
import middlewareDepsProcessor from "./middleware/middlewareDepsProcessor";
import middlewareCss from "./middleware/middlewareCss";
import middlewareAssetProcessor from "./middleware/middlewareAssetProcessor";
import middlewareStatic from "./middleware/middlewareStatic";
import { depsPreBuildMainWork } from "./depsPreBuild";


function main() {
  const app = express();

  // 中间件
  app.use(middlewareLogger);
  app.use(middlewareHtml);
  app.use(middlewareTransformHtmlImport);
  app.use(middlewareDepsProcessor);
  app.use(middlewareCss);
  app.use(middlewareAssetProcessor);
  app.use(middlewareStatic);

  app.listen(ServerPort, async() => {
    await depsPreBuildMainWork();

    console.log('本地服务器地址', blue(`http://localhost:${ServerPort}`));
  });
}

main();
