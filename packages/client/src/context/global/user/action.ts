import { ContextUser, UserKnownActions } from './type';

export const loginAction = (data: ContextUser): UserKnownActions => ({
  type: 'USER_LOGIN',
  payload: data,
});

export const logoutAction = (): UserKnownActions => ({
  type: 'USER_LOGOUT',
});
