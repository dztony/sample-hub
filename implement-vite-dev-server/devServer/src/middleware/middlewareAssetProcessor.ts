import { Request, Response, NextFunction } from "express";
import { AssetSuffix } from "../utils";

export default async function middlewareAssetProcessor(req: Request, res: Response, next: NextFunction) {
  const { url, path: filePath, query } = req;
  if (url.endsWith(AssetSuffix)) {
    let realPath = filePath;
    if (filePath.split('/').length < 3) {
      realPath = `/public${filePath}`;
    }
    // console.log('realPath - ', realPath);
    const script = `
    const assetPath = "${realPath}"
    export default assetPath;
    `;
    res.setHeader('Content-type', 'application/javascript');
    return res.send(script);
  }

  next();
}
