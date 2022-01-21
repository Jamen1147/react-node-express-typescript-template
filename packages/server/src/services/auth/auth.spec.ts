import config from 'config';
import { comparePassword, sign, verifyToken } from '../../helpers/auth';
import { NotFound, Unauthorized } from '../../helpers/httpError';
import AuthenticationService from './auth';

jest.mock('../../helpers/auth');

const makeMockAuthService = (params?: Record<string, jest.Mock>) =>
  new AuthenticationService({
    ...params,
  } as any);

describe('auth services - login', () => {
  it('throws error when user is not found', async () => {
    const mockFindOne = jest.fn().mockReturnValue(false);
    const auth = makeMockAuthService({ findOne: mockFindOne });
    const mockParams = { email: '1', password: '1' };
    await expect(auth.login(mockParams)).rejects.toBeInstanceOf(Unauthorized);
    expect(mockFindOne).toHaveBeenCalledTimes(1);
    expect(mockFindOne).toHaveBeenCalledWith({ email: mockParams.email });
  });

  it('throws error when passwords do not match', async () => {
    const hashed = 'hashedPassword';
    const auth = makeMockAuthService({
      findOne: jest.fn(() => ({ password: hashed })),
    });
    (comparePassword as jest.Mock).mockReturnValue(false);
    const mockParams = { email: '1', password: '1' };
    await expect(auth.login(mockParams)).rejects.toBeInstanceOf(Unauthorized);
    expect(comparePassword).toHaveBeenCalledTimes(1);
    expect(comparePassword).toHaveBeenCalledWith(mockParams.password, hashed);
  });

  it('signs tokens', async () => {
    const token = 'token';
    const refreshToken = 'r-token';
    const hashed = 'hashedPassword';
    const user = { password: hashed };
    const auth = makeMockAuthService({ findOne: jest.fn(() => user) });
    (comparePassword as jest.Mock).mockReturnValue(true);
    (sign as jest.Mock)
      .mockReturnValueOnce(token)
      .mockReturnValue(refreshToken);
    const mockParams = { email: '1', password: '1' };
    const result = await auth.login(mockParams);
    expect(sign).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      user,
      token,
      refreshToken,
    });
  });
});

describe('auth services - verify', () => {
  it('verifies token', async () => {
    const token = 'token';
    const secret = 'secret';
    const returned = 'decoded';
    const auth = makeMockAuthService();
    (verifyToken as jest.Mock).mockReturnValue(returned);
    const result = await auth.verify({ token, checkVersion: false, secret });
    expect(verifyToken).toHaveBeenCalledWith(token, secret);
    expect(result).toBe(returned);
  });

  it('throws if user not found when checkVersion', async () => {
    const token = 'token';
    const decoded = { user: { id: 'id' } };
    const mockFindById = jest.fn().mockReturnValue(false);
    const auth = makeMockAuthService({ findById: mockFindById });
    (verifyToken as jest.Mock).mockReturnValue(decoded);
    await expect(auth.verify({ token })).rejects.toBeInstanceOf(Unauthorized);
    expect(mockFindById).toHaveBeenCalledWith(decoded.user.id);
  });

  it('throws if revision does not match when checkVersion', async () => {
    const token = 'token';
    const decoded = { user: { id: 'id', revision: 1 } };
    const auth = makeMockAuthService({
      findById: jest.fn().mockReturnValue({ tokenRevision: 2 }),
    });
    (verifyToken as jest.Mock).mockReturnValue(decoded);
    await expect(auth.verify({ token })).rejects.toBeInstanceOf(Unauthorized);
  });

  it('checks version successfully', async () => {
    const token = 'token';
    const decoded = { user: { id: 'id', revision: 1 } };
    const auth = makeMockAuthService({
      findById: jest.fn().mockReturnValue({ tokenRevision: 1 }),
    });
    (verifyToken as jest.Mock).mockReturnValue(decoded);
    await expect(auth.verify({ token })).resolves;
  });
});

describe('auth services - revokeToken', () => {
  it('throws when user is not found', async () => {
    const id = 'userId';
    const mockFindById = jest.fn().mockReturnValue(false);
    const auth = makeMockAuthService({ findById: mockFindById });
    await expect(auth.revokeToken(id)).rejects.toBeInstanceOf(NotFound);
    expect(mockFindById).toHaveBeenCalledWith(id);
  });

  it('increments revision version', async () => {
    const id = 'userId';
    const mockSave = jest.fn();
    const auth = makeMockAuthService({
      findById: jest.fn().mockReturnValue({ tokenRevision: 1 }),
      save: mockSave,
    });
    await expect(auth.revokeToken(id)).resolves;
    expect(mockSave).toHaveBeenCalledWith({ tokenRevision: 2 });
  });
});

describe('auth services - refreshToken', () => {
  it('signs new tokens', async () => {
    const id = '1';
    const revision = 1;
    const refreshToken = 'refreshToken';
    const newToken = 'newToken';
    const newRefreshToken = 'newRefreshToken';
    const auth = makeMockAuthService();
    jest.spyOn(auth, 'verify').mockReturnValue({
      user: { id, revision },
    } as any);
    jest.spyOn(auth, 'signTokens' as any).mockReturnValue({
      token: newToken,
      refreshToken: newRefreshToken,
    } as any);
    const result = await auth.refreshToken(refreshToken);
    expect(auth.verify).toHaveBeenCalledWith({
      token: refreshToken,
      secret: config.jwt.refresh.secret,
    });
    expect((auth as any).signTokens).toHaveBeenCalledWith(id, revision);
    expect(result).toEqual({
      newToken,
      newRefreshToken,
    });
  });
});
