import { JenosizeController } from '../controllers/jenosize.controller';
import { CachedMiddleware, ValidationMiddleware } from '../middlewares';
import { Cached } from './../../utils/cache';
import { Router } from 'express';

export class ApplicationRouter {
  private readonly cachedMiddleware: CachedMiddleware = new CachedMiddleware(this.cached);
  private readonly validationMiddleware: ValidationMiddleware = new ValidationMiddleware();
  private readonly controller: JenosizeController = new JenosizeController();
  public readonly router: Router = Router();

  constructor(private cached: Cached) {}

  init(): Router {
    this.router.post(
      '/login-with-provider',
      this.validationMiddleware.loginWithProvider,
      this.controller.loginWithProvider,
    );

    this.router.get('/place', this.cachedMiddleware.setCache, this.controller.getPlace);
    this.router.get(
      '/place/media',
      this.validationMiddleware.getMedia,
      this.controller.getPlaceMedia,
    );

    this.router.post('/game24', this.validationMiddleware.game24Nums, this.controller.getGame24);

    return this.router;
  }
}
