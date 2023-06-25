import jwt from 'jsonwebtoken';
import { Environments } from './environments';

interface JwtPayload {
  id: string;
}

export class JwtService {
  private static readonly privateKey = Environments.JwtSecretKey;

  static generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.privateKey, { expiresIn: '1d' });
  }

  static verifyToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, this.privateKey) as JwtPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
