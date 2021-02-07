import BaseApi from '../base';
import IUser, { IRegisterParams, IRegisterResponse } from '../types/user';

class UserService extends BaseApi {
  register = async (params: IRegisterParams) => {
    const result = await this.post<IRegisterResponse>('/api/v1/user', params);
    return result;
  };

  getMe = async () => {
    const result = await this.get<IUser>('/api/v1/user/me');
    return result;
  };

  unregister = async () => {
    const result = await this.delete('/api/v1/user');
    return result;
  };
}

const userService = new UserService();
export default userService;
