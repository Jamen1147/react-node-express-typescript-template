import * as React from 'react';
import { combineReducers } from '../utils';
import {
  GlobalContext,
  GlobalContextStates,
  initStates,
  reducers,
} from './config';

const GlobalProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = React.useReducer(
    combineReducers<GlobalContextStates>(reducers),
    initStates
  );

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
