import { User } from '..';

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
}
