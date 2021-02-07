import React from 'react';
import { useDispatch } from 'react-redux';
import { getMe } from '../../stores/user/actions';
import storage from '../../utils/storage';
import Routes from './Routes';

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (storage.token) {
      dispatch(getMe());
    }
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <Routes />
    </main>
  );
};
export default App;
