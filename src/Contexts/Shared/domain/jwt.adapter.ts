import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserId } from '../../Mooc/Users/domain/types/UserId';
dotenv.config();

interface authToken {
  id: UserId;
}

export class JwtAdapter {
  static async generateToken(payload: Object, duration: string = '24h'): Promise<string | null> {
    return new Promise(resolve => {
      const secret = process.env.JWT_SECRET;
      if (secret) {
        jwt.sign(payload, secret, { expiresIn: duration }, (err, token) => {
          if (err) return resolve(null);
          resolve(token!);
        });
      }
    });
  }

  static decodedToken(token: string): Promise<authToken> {
    return new Promise((resolve, reject) => {
      const secret = process.env.JWT_SECRET;
      if (secret) {
        jwt.verify(token, secret, (err, decode) => {
          if (err) reject(err);
          resolve(decode as authToken);
        });
      }
    });
  }
}
