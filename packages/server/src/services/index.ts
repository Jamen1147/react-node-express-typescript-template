import repositories from '../repositories';
import AuthenticationService from './auth/auth';
import UserService from './user/user';

class Services {
  readonly user: UserService;
  readonly auth: AuthenticationService;

  constructor() {
    this.user = new UserService(repositories.user);
    this.auth = new AuthenticationService(repositories.user);
  }
}

const services = new Services();
export default services;
