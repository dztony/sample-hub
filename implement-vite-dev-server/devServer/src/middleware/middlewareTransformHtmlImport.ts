import { Request, Response, NextFunction } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import * as esbuild from 'esbuild';
import { yellow } from "picocolors";
import { replaceImportStatement } from "../utils";

export default async function middlewareTransformHtmlImport(req: Request, res: Response, next: NextFunction) {
  const { url } = req;
  if (url.startsWith('/src') && (url.endsWith('.tsx') || url.endsWith('.ts'))) {
    const resolvePath = resolveHtmlImportFile(url);
    const codeString = fs.readFileSync(resolvePath).toString();
    const loader =  getHtmlImportFileLoader(url);
    const { code } = await esbuild.transform(codeString, {
      loader: loader,
      format: 'esm',
    });
    const formatCode = await replaceImportStatement(code);
    res.setHeader('Content-type', 'application/javascript');
    return res.send(formatCode);
  }

  next();
}

function resolveHtmlImportFile(filename: string): string {
  return path.join(process.cwd(), filename);
}

function getHtmlImportFileLoader(filename: string) {
  return path.extname(filename).split('.')[1] as esbuild.Loader;
}

