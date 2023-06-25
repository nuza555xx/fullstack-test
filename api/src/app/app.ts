import cors from 'cors';
import express, { Express } from 'express';
import { json, urlencoded } from 'body-parser';
import { Cached, Environments, Logger, Mongoose } from '../utils';
import { ApplicationRouter } from './routers';
import { HeaderMiddleware } from './middlewares';

export class Application {
  private readonly logger = new Logger(Application.name);
  private readonly cacheService = new Cached();
  private readonly mongoose = new Mongoose();
  private readonly router = new ApplicationRouter(this.cacheService);
  private readonly headerMiddleware = new HeaderMiddleware();

  private readonly server: Express;
  private readonly port: number = Environments.port;
  private readonly host: string = Environments.host;

  constructor() {
    this.server = express();
    this.server.use(json());
    this.server.use(urlencoded({ extended: true }));
    this.server.use(cors());
    this.server.use(this.headerMiddleware.getHeader);
  }

  async startServer(): Promise<void> {
    try {
      await this.cacheService.init();
      await this.mongoose.connect();
      this.server.use('/api', this.router.init());
      this.server.listen(this.port, '0.0.0.0', () => {
        this.logger.log(`Application started at http://${this.host}:${this.port}`);
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
