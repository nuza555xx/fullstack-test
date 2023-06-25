import { NextFunction, Request, Response } from 'express';
import snackcaseKeys from 'snakecase-keys';

export class HeaderMiddleware {
  async getHeader(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.header('api-key')) {
      next();
    } else {
      res.status(400).json(
        snackcaseKeys({
          statusCode: 400,
          errors: 'Missing is API-KEY header',
        }),
      );
    }
  }
}
