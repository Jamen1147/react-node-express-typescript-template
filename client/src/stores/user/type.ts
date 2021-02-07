import IUser from '../../api/types/user';

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR';

export const USER_ME_REQUEST = 'USER_ME_REQUEST';
export const USER_ME_SUCCESS = 'USER_ME_SUCCESS';
export const USER_ME_ERROR = 'USER_ME_ERROR';

export const USER_UNREGISTER_REQUEST = 'USER_UNREGISTER_REQUEST';
export const USER_UNREGISTER_SUCCESS = 'USER_UNREGISTER_SUCCESS';
export const USER_UNREGISTER_ERROR = 'USER_UNREGISTER_ERROR';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';

export interface UserRegisterRequestAction {
  type: typeof USER_REGISTER_REQUEST;
}

export interface UserRegisterSuccessAction {
  type: typeof USER_REGISTER_SUCCESS;
  payload: IUser;
}

export interface UserRegisterFailAction {
  type: typeof USER_REGISTER_ERROR;
  payload: string;
}

export interface UserMeRequestAction {
  type: typeof USER_ME_REQUEST;
}

export interface UserMeSuccessAction {
  type: typeof USER_ME_SUCCESS;
  payload: IUser;
}

export interface UserMeFailAction {
  type: typeof USER_ME_ERROR;
  payload: string;
}

export interface UserUnregisterRequestAction {
  type: typeof USER_UNREGISTER_REQUEST;
}

export interface UserUnregisterSuccessAction {
  type: typeof USER_UNREGISTER_SUCCESS;
  payload: boolean;
}

export interface UserUnregisterFailAction {
  type: typeof USER_UNREGISTER_ERROR;
  payload: string;
}

export interface UserLoginRequestAction {
  type: typeof USER_LOGIN_REQUEST;
}

export interface UserLoginSuccessAction {
  type: typeof USER_LOGIN_SUCCESS;
  payload: IUser;
}

export interface UserLoginFailAction {
  type: typeof USER_LOGIN_ERROR;
  payload: string;
}

export interface UserLogoutRequestAction {
  type: typeof USER_LOGOUT_REQUEST;
}

export type UserActions =
  | UserRegisterRequestAction
  | UserRegisterSuccessAction
  | UserRegisterFailAction
  | UserMeRequestAction
  | UserMeSuccessAction
  | UserMeFailAction
  | UserUnregisterRequestAction
  | UserUnregisterSuccessAction
  | UserUnregisterFailAction
  | UserLoginRequestAction
  | UserLoginSuccessAction
  | UserLoginFailAction
  | UserLogoutRequestAction;

export interface UserState {
  user: IUser | null;
  loggedIn: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
