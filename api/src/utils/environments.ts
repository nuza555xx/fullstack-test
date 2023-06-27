import { config } from 'dotenv';
config();

export class Environments {
  static readonly dev: boolean = process.env.NODE_ENV === 'development';
  static readonly host: string = '0.0.0.0';
  static readonly port: number = Number(process.env.PORT) || 80;
  static readonly googleAPIKey: string = process.env.GOOGLE_API_KEY || '';

  static readonly redisHost: string = process.env.REDIS_HOST || 'localhost';
  static readonly redisPort: number = Number(process.env.REDIS_PORT) || 6379;
  static readonly redisPassword: string = process.env.REDIS_PASSWORD || '';
  static readonly redisDB: number = Number(process.env.REDIS_DB) || 0;
  static readonly redisTTL: number = Number(process.env.REDIS_TTL) || -1;

  static readonly mongoURL: string = process.env.MONGO_URL || 'mongodb://localhost:27017';
  static readonly mongoDB: string = process.env.MONGO_DB || 'test';

  static readonly JwtSecretKey: string = process.env.JWT_SECRET_KEY || 'JWT_SECRET_KEY';
  static readonly Hostname: string = process.env.HOST_URL || 'localhost';
}
