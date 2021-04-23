import * as React from 'react';
import { UserKnownActions, UserState } from './user/type';
import userReducer from './user/reducer';

type Actions = UserKnownActions;

export type GlobalContextStates = {
  user: UserState;
};

type ContextProps = {
  state: GlobalContextStates;
  dispatch: React.Dispatch<Actions>;
};

export const initStates: GlobalContextStates = {
  user: null,
};

export const GlobalContext = React.createContext<ContextProps | null>(null);

export const reducers = {
  user: userReducer,
};

export const useSelector = <T = unknown>(
  selector: (state: GlobalContextStates) => T
): T => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error('No Store Context Available');
  }
  return selector(context.state);
};

export const useDispatch = () => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error('No Store Context Available');
  }
  return context.dispatch;
};
