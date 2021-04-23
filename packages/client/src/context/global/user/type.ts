import { User } from '@template/common';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export type ContextUser = Pick<User, 'id' | 'name'>;

export interface UserLogin {
  type: typeof USER_LOGIN;
  payload: ContextUser;
}

export interface UserLogout {
  type: typeof USER_LOGOUT;
}

export type UserKnownActions = UserLogin | UserLogout;

export type UserState = ContextUser | null;
