import AuthHelper from '../helpers/auth';
import { Unthorized } from '../helpers/httpError';
import { User } from '../models/User';
import repositories from '../repositories';

export type TLoginParams = Pick<User, 'email' | 'password'>;

export default class AuthenticationService {
  async login(params: TLoginParams) {
    const { email, password } = params;

    const user = await repositories.user.findOne({ email });
    if (!user) throw new Unthorized('Invalid Credentials');

    const matched = await AuthHelper.compare(password, user.password);
    if (!matched) throw new Unthorized('Invalid Credentials');

    const token = await AuthHelper.sign({ user: { id: user.id } });

    return {
      user,
      token,
    };
  }
}
