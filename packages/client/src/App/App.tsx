import { Router } from 'react-router';
import Navigation from '../components/Nav';
import Routes from './Routes';
import GlobalProvider from '../context/global/GlobalProvider';
import styles from './App.module.scss';
import browserHistory from '../history';

import '@template/common/styles/global.scss';

const App = () => {
  return (
    <GlobalProvider>
      <Router history={browserHistory}>
        <Navigation />
        <main className={styles.main}>
          <Routes />
        </main>
      </Router>
    </GlobalProvider>
  );
};

export default App;
