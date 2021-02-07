import BaseApi from '../base';
import { ILoginParams, ILoginResponse } from '../types/auth';

class AuthenticationService extends BaseApi {
  login = async (params: ILoginParams) => {
    const result = await this.post<ILoginResponse>(
      '/api/v1/auth/login',
      params
    );
    return result;
  };
}

const authService = new AuthenticationService();
export default authService;
