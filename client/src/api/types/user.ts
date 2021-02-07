interface Base {
  name: string;
  email: string;
}

export default interface IUser extends Base {
  id: string;
  createdAt: string;
}

export interface IRegisterParams extends Base {
  password: string;
}

export interface IRegisterResponse {
  token: string;
  user: IUser;
}
