export const combineReducers = <T>(reducers: Record<keyof T, Function>) => (
  state: T,
  action: any
): T => {
  const keys = Object.keys(reducers);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i] as keyof T;
    // eslint-disable-next-line no-param-reassign
    state[key] = reducers[key](state, action);
  }
  return { ...state };
};
