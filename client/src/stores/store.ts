import { RouterState } from 'connected-react-router';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import configureStore from './config';
import userReducer from './user/reducer';
import { UserState } from './user/type';
import history from './history';

export interface StoreStates {
  router: RouterState;
  user: UserState;
}

export const reducers = {
  user: userReducer,
};

export interface Thunk<A> {
  (dispatch: (action: A) => void, getState: () => StoreStates): void;
}

export const thunkAction = <Action, Args extends any[]>(
  fn: (dispatch: (action: Action) => void, ...args: Args) => void
) => (...args: Args): Thunk<Action> => (dispatch) => fn(dispatch, ...args);

export const useTypedSelector: TypedUseSelectorHook<StoreStates> = useSelector;

const store = configureStore(history);

export default store;
