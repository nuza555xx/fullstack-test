import { Logger as LoggerWinston, createLogger, format, transports } from 'winston';

export class Logger {
  private readonly logger: LoggerWinston;
  constructor(private readonly context: string) {
    const logFormat = format.printf(({ level, message, timestamp }) => {
      return `${timestamp} | ${level} : [${this.context}] ${message}`;
    });

    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), logFormat),
      transports: [new transports.Console()],
    });
  }

  log(message: unknown): void {
    this.logger.info(message);
  }

  error(message: unknown): void {
    this.logger.error(message);
  }

  debug(message: unknown): void {
    this.logger.debug(message);
  }
}
