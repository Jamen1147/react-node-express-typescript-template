import jwt from 'jsonwebtoken';
import config from 'config';
import crypt from 'bcryptjs';

export default class AuthHelper {
  static async sign(id: string, expiresIn = config.jwt.expiredIn) {
    const token = await new Promise<string>((resolve, reject) => {
      jwt.sign(
        {
          user: {
            id,
          },
        },
        config.jwt.secret,
        { expiresIn },
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

  static veryifyToken(token: string) {
    return jwt.verify(token, config.jwt.secret) as { user: { id: string } };
  }
}
