import authService from '../../api/services/auth';
import userService from '../../api/services/user';
import { ILoginParams } from '../../api/types/auth';
import { IRegisterParams } from '../../api/types/user';
import storage from '../../utils/storage';
import { Thunk } from '../store';
import { UserActions } from './type';

export const register = (inputs: IRegisterParams): Thunk<UserActions> => async (
  dispatch
) => {
  dispatch({
    type: 'USER_REGISTER_REQUEST',
  });

  const result = await userService.register(inputs);

  if (result.hasError || !result.value?.token) {
    return dispatch({
      type: 'USER_REGISTER_ERROR',
      payload: result.error || 'Registration Failed',
    });
  }

  storage.token = result.value.token;

  return dispatch({
    type: 'USER_REGISTER_SUCCESS',
    payload: result.value.user,
  });
};

export const getMe = (): Thunk<UserActions> => async (dispatch) => {
  dispatch({
    type: 'USER_ME_REQUEST',
  });

  const result = await userService.getMe();

  if (result.hasError) {
    return dispatch({
      type: 'USER_ME_ERROR',
      payload: result.error || 'Get Me Failed',
    });
  }

  return dispatch({
    type: 'USER_ME_SUCCESS',
    payload: result.value,
  });
};

export const unregister = (): Thunk<UserActions> => async (dispatch) => {
  dispatch({
    type: 'USER_UNREGISTER_REQUEST',
  });

  const result = await userService.unregister();

  if (result.hasError) {
    return dispatch({
      type: 'USER_UNREGISTER_ERROR',
      payload: result.error || 'Unregister Failed',
    });
  }

  return dispatch({
    type: 'USER_UNREGISTER_SUCCESS',
    payload: !result.hasError,
  });
};

export const login = (inputs: ILoginParams): Thunk<UserActions> => async (
  dispatch
) => {
  dispatch({
    type: 'USER_LOGIN_REQUEST',
  });

  const result = await authService.login(inputs);

  if (result.hasError || !result.value?.token) {
    return dispatch({
      type: 'USER_LOGIN_ERROR',
      payload: result.error || 'Login Failed',
    });
  }

  storage.token = result.value.token;

  return dispatch({
    type: 'USER_LOGIN_SUCCESS',
    payload: result.value.user,
  });
};

export const logout = (): UserActions => {
  storage.clear();
  return {
    type: 'USER_LOGOUT_REQUEST',
  };
};
