import AuthHelper from '../helpers/auth';
import { NotFound, Unthorized } from '../helpers/httpError';
import repositories from '../repositories';
import config from 'config';
import { LoginParams } from '@template/common';

export default class AuthenticationService {
  private async signTokens(id: string, revision: number) {
    const token = await AuthHelper.sign({
      user: { id, revision },
    });

    const refreshToken = await AuthHelper.sign(
      {
        user: { id, revision },
      },
      config.jwt.refresh.secret,
      config.jwt.refresh.expiredIn
    );

    return {
      token,
      refreshToken,
    };
  }

  async login(params: LoginParams) {
    const { email, password } = params;

    const user = await repositories.user.findOne({ email });
    if (!user) throw new Unthorized('Invalid Credentials');

    const matched = await AuthHelper.compare(password, user.password);
    if (!matched) throw new Unthorized('Invalid Credentials');

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

  async verify({
    token,
    checkVersion = true,
    secret,
  }: {
    token: string;
    checkVersion?: boolean;
    secret?: string;
  }) {
    try {
      const decoded = AuthHelper.verify(token, secret);
      const {
        user: { id, revision },
      } = decoded;

      if (checkVersion) {
        const user = await repositories.user.find(id);
        if (!user) throw new Unthorized('Unthorized');
        if (user.tokenRevision !== revision) throw new Unthorized('Unthorized');
      }
      return decoded;
    } catch (error) {
      throw new Unthorized(error);
    }
  }

  /**
   * tokenRevision is part of the payload,
   * increment it will invalidate the token
   * since it checks against the tokenRevision on authentication.
   */
  async revokeToken(userId: string) {
    const user = await repositories.user.find(userId);
    if (!user) throw new NotFound('User not found');

    user.tokenRevision += 1;
    repositories.user.save(user);

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
