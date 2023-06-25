import { MongoError } from 'mongodb';
import { LoginWithProviderDto } from '../interfaces';
import { Account, AccountModel } from '../schemas';
import { Logger } from '../../utils';

export class AuthenticationService {
  private readonly logger: Logger = new Logger(AuthenticationService.name);
  async loginWithProvider(body: LoginWithProviderDto): Promise<Account> {
    try {
      const account = new AccountModel(body);
      await account.save();

      return account;
    } catch (error) {
      if (error instanceof MongoError && error.code === 11000) {
        this.logger.error(error);
        throw new Error('Account with the same value already exists');
      } else {
        this.logger.error(error);
        throw new Error('Failed to save account');
      }
    }
  }
}
