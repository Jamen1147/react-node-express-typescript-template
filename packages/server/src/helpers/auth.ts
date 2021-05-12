import jwt from 'jsonwebtoken';
import config from 'config';
import crypt from 'bcryptjs';

export type TokenPayload = {
  user: {
    id: string;
    revision: number;
  };
};

export default class AuthHelper {
  static async sign(
    payload: TokenPayload,
    secret = config.jwt.secret,
    expiresIn = config.jwt.expiredIn
  ) {
    const token = await new Promise<string>((resolve, reject) => {
      jwt.sign(
        payload,
        secret,
        { expiresIn, issuer: config.jwt.issuer },
        (err, token) => {
          if (err) reject(err);
          if (token) {
            resolve(token);
          } else {
            reject('Signing is unsuccessful');
          }
        }
      );
    });

    return token;
  }

  static async hash(password: string) {
    const salt = await crypt.genSalt(10);
    return await crypt.hash(password, salt);
  }

  static async compare(password: string, hashed: string) {
    return await crypt.compare(password, hashed);
  }

  static verify(token: string, secret = config.jwt.secret) {
    return jwt.verify(token, secret) as TokenPayload;
  }
}
