import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../stores/store';
import { logout } from '../../stores/user/actions';
import Button from '../shared/Button';
import Loader from '../shared/Loader';

const HomePage = () => {
  const dispatch = useDispatch();
  const { user, status } = useTypedSelector((state) => state.user);

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>React App</h1>
      {status === 'loading' && <Loader />}
      {user && status === 'succeeded' && <h3>Hi {user.name}</h3>}
      <Button onClick={handleLogOut}>Logout</Button>
    </div>
  );
};

export default HomePage;
