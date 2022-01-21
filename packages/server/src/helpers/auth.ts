import crypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { TokenPayload } from '../types/auth';

export const hashPassword = async (password: string) => {
  const salted = await crypt.genSalt(10);
  return await crypt.hash(password, salted);
};

export const comparePassword = async (password: string, hashed: string) =>
  await crypt.compare(password, hashed);

export const sign = async (
  payload: TokenPayload,
  secret = config.jwt.secret,
  expiresIn = config.jwt.expiresIn
) => {
  const token = await new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      { expiresIn, issuer: config.jwt.issuer },
      (error, encoded) => {
        if (error) reject(error);
        if (encoded) {
          resolve(encoded);
        } else {
          reject(new Error('Signing is not successful'));
        }
      }
    );
  });

  return token;
};

export const verifyToken = (token: string, secret = config.jwt.secret) =>
  jwt.verify(token, secret) as TokenPayload;
