import { LoginParams, LoginResponse } from '@template/common';
import BaseApi from './base';

class AuthenticationService extends BaseApi {
  login = async (params: LoginParams) => {
    const result = await this.post<LoginResponse>('/login', params);
    return result;
  };
}

const authService = new AuthenticationService('/api/v1/auth');
export default authService;
