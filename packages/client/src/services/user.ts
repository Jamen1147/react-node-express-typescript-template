import { RegisterParams, RegisterResponse, User } from '@template/common';
import BaseApi from './base';

class UserService extends BaseApi {
  register = async (params: RegisterParams) => {
    const result = await this.post<RegisterResponse>('/', params);
    return result;
  };

  getMe = async () => {
    const result = await this.get<User>('/me');
    return result;
  };

  unregister = async () => {
    const result = await this.delete('/');
    return result;
  };
}

const userService = new UserService('/api/v1/user');
export default userService;
