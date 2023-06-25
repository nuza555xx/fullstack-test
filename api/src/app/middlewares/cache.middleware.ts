import { NextFunction, Request, Response } from 'express';
import { Cached, Logger } from '../../utils';

export class CachedMiddleware {
  private readonly logger: Logger = new Logger(CachedMiddleware.name);
  constructor(private cached: Cached) {
    this.setCache = this.setCache.bind(this);
    this.clearCache = this.clearCache.bind(this);
  }

  async setCache(req: Request, res: Response, next: NextFunction): Promise<void> {
    const key = `${req.url}`;
    const cached = await this.cached.get(key);
    if (!cached) {
      const originalSend = res.send;
      let responseBody: unknown;

      res.send = function (body?: unknown): Response<unknown> {
        responseBody = body;
        return originalSend.call(this, body);
      };
      res.on('finish', async () => {
        if (responseBody)
          try {
            await this.cached.set(key, responseBody);
          } catch (error) {
            this.logger.error(error);
          }
      });
      next();
    } else {
      res.send(cached);
    }
  }

  async clearCache(req: Request, res: Response, next: NextFunction): Promise<void> {
    const key = `${req.url}`;
    const originalSend = res.send;
    let responseBody: unknown;
    res.send = function (body?: unknown): Response<unknown> {
      responseBody = body;
      return originalSend.call(this, body);
    };
    res.on('finish', async () => {
      if (responseBody)
        try {
          await this.cached.del(key);
        } catch (error) {
          this.logger.error(error);
        }
    });
    next();
  }
}
