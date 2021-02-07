import jwt from 'jsonwebtoken';
import config from 'config';
import crypt from 'bcryptjs';

export type TokenPayload = {
  user: {
    id: string;
  };
};

export default class AuthHelper {
  static async sign(payload: TokenPayload, expiresIn = config.jwt.expiredIn) {
    const token = await new Promise<string>((resolve, reject) => {
      jwt.sign(
        payload,
        config.jwt.secret,
        { expiresIn, issuer: config.jwt.issuer },
        (err, token) => {
          if (err) reject(err);
          if (token) {
            console.log(token);
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

  static verify(token: string) {
    return jwt.verify(token, config.jwt.secret) as TokenPayload;
  }
}
