import AuthHelper from '../helpers/auth';
import { Conflict } from '../helpers/httpError';
import { User } from '../models/User';
import repositories from '../repositories';

export type TRegisterParams = Pick<User, 'name' | 'email' | 'password'>;

export default class UserService {
  async isExisting(email: string) {
    const result = await repositories.user.findOne({ email });
    return !!result;
  }

  async register({ email, name, password }: TRegisterParams) {
    if (await this.isExisting(email)) {
      throw new Conflict('User already exist');
    }

    const hashed = await AuthHelper.hash(password);

    const user = await repositories.user.save({
      password: hashed,
      email,
      name,
    });

    return user;
  }

  async unregister(id: string) {
    return await repositories.user.delete(id);
  }

  async getCurrentUser(id: string) {
    const user = await repositories.user.find(id);
    return user;
  }
}
