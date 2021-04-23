import { LoginParams, User } from '@template/common';
import BaseApi from './base';

class AuthenticationService extends BaseApi {
  login = async (params: LoginParams) => {
    const result = await this.post<User>('/login', params);
    return result;
  };

  logout = async () => {
    const result = await this.post<boolean>('/logout');
    return result;
  };
}

const authService = new AuthenticationService('/api/v1/auth');
export default authService;
