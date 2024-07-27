import { Request, Response, NextFunction } from 'express';

export default function middlewareLogger(req: Request, res: Response, next: NextFunction) {
  res.setHeader('x-middleware-t', 'middlewareLogger');
  next();
}
