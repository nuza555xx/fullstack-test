import mongoose, { Connection } from 'mongoose';
import { Logger } from './logger';
import { Environments } from './environments';

export class Mongoose {
  private readonly logger: Logger = new Logger(Mongoose.name);
  public connection: Connection;

  constructor() {
    this.connection = mongoose.connection;
    this.connection.on('error', (error) => {
      this.logger.error(error);
    });
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(`${Environments.mongoURL}/${Environments.mongoDB}`);
      this.logger.log('Connected to MongoDB');
    } catch (error) {
      this.logger.error(error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      this.logger.log('Disconnected from MongoDB');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
