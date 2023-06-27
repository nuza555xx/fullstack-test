import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

export class ValidationMiddleware {
  async loginWithProvider(req: Request, res: Response, next: NextFunction): Promise<void> {
    await Promise.all([
      check('email').isEmail().notEmpty().run(req),
      check('displayName').isString().notEmpty().run(req),
      check('authenToken').isString().notEmpty().run(req),
      check('avatar').isString().notEmpty().run(req),
    ]);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        statusCode: 400,
        errors: errors.array(),
      });
    } else next();
  }

  async game24Nums(req: Request, res: Response, next: NextFunction): Promise<void> {
    await Promise.all([check('nums').isArray({ min: 4, max: 4 }).notEmpty().run(req)]);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        statusCode: 400,
        errors: errors.array(),
      });
    } else next();
  }

  async getMedia(req: Request, res: Response, next: NextFunction): Promise<void> {
    await Promise.all([check('refId').notEmpty().run(req)]);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        statusCode: 400,
        errors: errors.array(),
      });
    } else next();
  }
}
