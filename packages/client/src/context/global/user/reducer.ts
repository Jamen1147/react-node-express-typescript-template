import { initStates } from '../config';
import { UserKnownActions, UserState } from './type';

const reducer = (
  state: UserState = initStates.user,
  action: UserKnownActions
): UserState => {
  switch (action.type) {
    case 'USER_LOGIN':
      return action.payload;
    case 'USER_LOGOUT':
      return null;
    default:
      return state;
  }
};

export default reducer;
