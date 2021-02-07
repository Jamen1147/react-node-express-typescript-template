import IUser from './user';

export interface ILoginParams {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}
