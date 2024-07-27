import { NextFunction, Request, Response } from "express";
import { PreBuildLocation, ThirdPartyLibPrefix } from "../utils";
import path from "node:path";

export default async function middlewareDepsProcessor(req: Request, res: Response, next: NextFunction) {
  const { url } = req;
  if (url.startsWith(ThirdPartyLibPrefix)) {
    const depsId = url.split(ThirdPartyLibPrefix)[1];
    const depIdPath = path.resolve(PreBuildLocation, depsId);
    const filename = depIdPath.endsWith('.js') ? depIdPath : depIdPath + '.js';
    res.setHeader('Content-type', 'application/javascript');
    return res.sendFile(filename);
  }

  next();
}
