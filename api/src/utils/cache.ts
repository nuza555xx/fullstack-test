import { RedisClientType, RedisFunctions, RedisModules, RedisScripts, createClient } from 'redis';
import { Environments } from './environments';
import { Logger } from './logger';

export type RedisClient = RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

export class Cached {
  private readonly logger: Logger = new Logger(Cached.name);
  private client: RedisClient;

  constructor() {
    this.client = createClient({
      url: `redis://${Environments.redisHost}:${Environments.redisPort}`,
      password: Environments.redisPassword,
      database: Environments.redisDB,
    });
  }
  async init(): Promise<void> {
    await this.client.connect();
    this.client.on('ready', () => {
      this.logger.log('ready');
    });
    this.client.on('connect', () => {
      this.logger.log('connected');
    });
    this.client.on('error', (error) => {
      this.logger.error(error);
    });
  }

  get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: any): Promise<void> {
    await this.client.set(key, value, { EX: Environments.redisTTL });
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async getByPattern(pattern: string): Promise<string[]> {
    const keys = await this.client.keys(pattern);
    const matchingKeys = keys.filter((key) => key.includes(pattern));
    return matchingKeys;
  }

  async delByPattern(pattern: string): Promise<void> {
    const keys = await this.client.keys(pattern);
    const matchingKeys = keys.filter((key) => key.includes(pattern));
    await Promise.all(matchingKeys.map((key) => this.client.del(key)));
  }
}
