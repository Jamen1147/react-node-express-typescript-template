import { hashPassword } from '../../helpers/auth';
import { Conflict } from '../../helpers/httpError';
import { User } from '../../models/User';
import UserRepository from '../../repositories/user';

export type RegisterParams = Pick<User, 'name' | 'email' | 'password'>;

export default class UserService {
  private readonly user: UserRepository;

  constructor(user: UserRepository) {
    this.user = user;
  }

  async isExisting(email: string) {
    const result = await this.user.findOne({ email });
    return !!result;
  }

  async getCurrentUser(id: string) {
    return await this.user.findById(id);
  }

  async unregister(id: string) {
    return await this.user.delete(id);
  }

  async register({ name, email, password }: RegisterParams) {
    if (await this.isExisting(email)) {
      throw new Conflict('User already exist');
    }

    const hashed = await hashPassword(password);

    const user = await this.user.save({
      email,
      name,
      password: hashed,
    });

    return user;
  }
}
