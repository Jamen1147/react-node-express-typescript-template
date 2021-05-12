import { Router } from 'react-router';
import Navigation from '../components/Nav';
import ErrorBoundary from '../components/ErrorBoundary';
import Routes from './Routes';
import GlobalProvider from '../context/global/GlobalProvider';
import styles from './App.module.scss';
import browserHistory from '../history';

import '@template/common/styles/global.scss';
import env from '../env';

const App = () => {
  return (
    <ErrorBoundary
      withErrorMessage={env.current === 'development'}
      fallback={<h3>Oops, something went wrong T_T</h3>}
    >
      <GlobalProvider>
        <Router history={browserHistory}>
          <Navigation />
          <main className={styles.main}>
            <Routes />
          </main>
        </Router>
      </GlobalProvider>
    </ErrorBoundary>
  );
};

export default App;
