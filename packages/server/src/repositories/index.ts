import User from '../models/User';
import UserRepository from './user';

class Repositories {
  readonly user: UserRepository;
  constructor() {
    this.user = new UserRepository(User);
  }
}

const repositories = new Repositories();
export default repositories;
