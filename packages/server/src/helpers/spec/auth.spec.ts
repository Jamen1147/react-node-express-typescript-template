import crypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { comparePassword, hashPassword, sign, verifyToken } from '../auth';
import { TokenPayload } from '../../types/auth';

describe('crypt', () => {
  it('hashes password', async () => {
    const password = '123456';
    const saltNum = 10;

    const genSalt = jest.spyOn(crypt, 'genSalt');
    const hash = jest.spyOn(crypt, 'hash');

    (genSalt as jest.Mock).mockImplementationOnce(async (num: number) =>
      Promise.resolve(num)
    );

    await hashPassword(password);

    expect(genSalt).toHaveBeenCalledWith(saltNum);
    expect(hash).toHaveBeenCalledWith(password, saltNum);
  });

  it('compares password', async () => {
    const pass1 = '123456';
    const pass2 = pass1;
    const compare = jest.spyOn(crypt, 'compare');
    await comparePassword(pass1, pass2);
    expect(compare).toHaveBeenCalledWith(pass1, pass2);
  });
});

describe('jwt', () => {
  let mockSign: jest.SpyInstance<any>;

  beforeEach(() => {
    mockSign = jest.spyOn(jwt, 'sign');
  });

  afterEach(() => {
    mockSign.mockRestore();
  });

  it('verifies token', () => {
    const token = '123';
    const secret = 'secret';

    const verify = jest.spyOn(jwt, 'verify');
    (verify as jest.Mock).mockImplementationOnce(() => undefined);

    verifyToken(token, secret);
    expect(verify).toHaveBeenCalledWith(token, secret);
  });

  it('defaults params when not provided for verify', () => {
    const token = '123';

    const verify = jest.spyOn(jwt, 'verify');
    (verify as jest.Mock).mockImplementationOnce(() => undefined);

    verifyToken(token);
    expect(verify).toHaveBeenCalledWith(token, config.jwt.secret);
  });

  it('signs', async () => {
    const payload: TokenPayload = { user: { id: '123', revision: 1 } };
    const secret = '123';
    const exp = '1h';

    await sign(payload, secret, exp);

    expect(mockSign).toHaveBeenCalledWith(
      payload,
      secret,
      expect.any(Object),
      expect.any(Function)
    );
  });

  it('defaults params when not provided for signs', async () => {
    const payload: TokenPayload = { user: { id: '123', revision: 1 } };

    await sign(payload);

    expect(mockSign).toHaveBeenCalledWith(
      payload,
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn, issuer: config.jwt.issuer },
      expect.any(Function)
    );
  });

  it('does not sign when no error and no encoded', async () => {
    const payload: TokenPayload = { user: { id: '123', revision: 1 } };

    (mockSign as jest.Mock).mockImplementationOnce((_, __, ___, fn) => fn());

    expect(sign(payload)).rejects.toThrowError();
  });

  it('does not sign when there is error', async () => {
    const payload: TokenPayload = { user: { id: '123', revision: 1 } };

    (mockSign as jest.Mock).mockImplementationOnce((_, __, ___, fn) =>
      fn(new Error('error'))
    );

    expect(sign(payload)).rejects.toThrowError();
  });
});
