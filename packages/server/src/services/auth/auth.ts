import { LoginParams } from '@template/common';
import config from 'config';
import { comparePassword, sign, verifyToken } from '../../helpers/auth';
import { NotFound, Unauthorized } from '../../helpers/httpError';
import UserRepository from '../../repositories/user';

export default class AuthenticationService {
  private readonly user: UserRepository;

  constructor(user: UserRepository) {
    this.user = user;
  }

  // eslint-disable-next-line class-methods-use-this
  private async signTokens(id: string, revision: number) {
    const tokenPromise = sign({
      user: { id, revision },
    });

    const refreshTokenPromise = sign(
      {
        user: { id, revision },
      },
      config.jwt.refresh.secret,
      config.jwt.refresh.expiresIn
    );

    const [token, refreshToken] = await Promise.all([
      tokenPromise,
      refreshTokenPromise,
    ]);

    return {
      token,
      refreshToken,
    };
  }

  async login({ email, password }: LoginParams) {
    const user = await this.user.findOne({ email });
    if (!user) throw new Unauthorized('Invalid Credentials');

    const matched = await comparePassword(password, user.password);
    if (!matched) throw new Unauthorized('Invalid Credentials');

    const { token, refreshToken } = await this.signTokens(
      user.id,
      user.tokenRevision
    );

    return {
      user,
      token,
      refreshToken,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  async verify({
    token,
    checkVersion = true,
    secret,
  }: {
    token: string;
    checkVersion?: boolean;
    secret?: string;
  }) {
    const decoded = verifyToken(token, secret);

    if (checkVersion) {
      const {
        user: { id, revision },
      } = decoded;
      const user = await this.user.findById(id);
      if (!user) throw new Unauthorized('Unauthorized');
      if (user.tokenRevision !== revision)
        throw new Unauthorized('Unauthorized');
    }

    return decoded;
  }

  async revokeToken(userId: string) {
    const user = await this.user.findById(userId);
    if (!user) throw new NotFound('User not found');

    user.tokenRevision += 1;
    this.user.save(user);

    return true;
  }

  async refreshToken(refreshToken: string) {
    const decoded = await this.verify({
      token: refreshToken,
      secret: config.jwt.refresh.secret,
    });

    const {
      user: { id, revision },
    } = decoded;

    const {
      token: newToken,
      refreshToken: newRefreshToken,
    } = await this.signTokens(id, revision);

    return {
      newToken,
      newRefreshToken,
    };
  }
}
