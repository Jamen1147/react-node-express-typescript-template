import AuthenticationService from './auth';
import UserService from './user';

class Services {
  readonly auth: AuthenticationService;
  readonly user: UserService;
  constructor() {
    this.auth = new AuthenticationService();
    this.user = new UserService();
  }
}

const services = new Services();
export default services;
