import { Reducer } from 'redux';
import { UserActions, UserState } from './type';

const initialState: UserState = {
  user: null,
  loggedIn: false,
  loading: false,
  error: null,
};

const reducer: Reducer<UserState | undefined, UserActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'USER_ME_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case 'USER_REGISTER_REQUEST':
    case 'USER_ME_REQUEST':
    case 'USER_UNREGISTER_REQUEST':
    case 'USER_LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'USER_REGISTER_ERROR':
    case 'USER_ME_ERROR':
    case 'USER_UNREGISTER_ERROR':
    case 'USER_LOGIN_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'USER_REGISTER_SUCCESS':
    case 'USER_LOGIN_SUCCESS':
      return {
        loading: false,
        error: null,
        user: action.payload,
        loggedIn: true,
      };
    case 'USER_UNREGISTER_SUCCESS':
    case 'USER_LOGOUT_REQUEST':
      return initialState;
    default:
      return state;
  }
};

export default reducer;
