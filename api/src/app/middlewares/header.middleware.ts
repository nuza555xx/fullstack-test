import { NextFunction, Request, Response } from 'express';

export class HeaderMiddleware {
  async getHeader(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.header('api-key') || req.originalUrl.match(/media/)) {
      next();
    } else {
      res.status(400).json({
        statusCode: 400,
        errors: 'Missing is API-KEY header',
      });
    }
  }
}
