import { NextFunction, Request, Response } from "express";
import path from "node:path";
import fs from "node:fs";

export default async function middlewareCss(req: Request, res: Response, next: NextFunction) {
  const { url, path: reqName } = req;
  if (url.startsWith('/src') && url.endsWith('.css')) {
    const filename = path.join(process.cwd(), reqName);
    const code = fs.readFileSync(filename, 'utf-8').replace(/\n/g, '');
    const script = `
     const css = "${code.replace(/\n/g, '')}";
     const s = document.createElement("style");
     s.innerHTML = css;
     s.setAttribute("type", "text/css");
     document.head.appendChild(s);
    `.trim();
    res.setHeader('Content-type', 'application/javascript');
    return res.send(script);
  }

  next();
}
