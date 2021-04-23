import { Button } from '@template/components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../../context/global/config';
import { logoutAction } from '../../context/global/user/action';
import { useMutation } from '../../hooks/useMutation';
import authService from '../../services/auth';
import styles from './Nav.module.scss';

const Nav = () => {
  const username = useSelector((state) => state.user?.name);
  const dispatch = useDispatch();

  const [logout] = useMutation(() => authService.logout());

  const handleLogout = () => {
    logout();
    dispatch(logoutAction());
  };

  return (
    <div className={styles.nav}>
      <span>
        {`Welcome to the full-stack template${username ? `, ${username}` : ''}`}
      </span>
      {username && (
        <Link to="/login" role="button">
          <Button
            type="button"
            variant="text"
            color="white"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Nav;
