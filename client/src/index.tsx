import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App/App';
import ErrorBoundary from './components/ErrorBoundary';
import reportWebVitals from './reportWebVitals';
import history from './stores/history';
import store from './stores/store';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
