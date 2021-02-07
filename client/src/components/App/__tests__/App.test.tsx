import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import App from '../App';
import store from '../../../stores/store';
import history from '../../../stores/history';

test('renders text <react app>', () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );
  const elem = screen.getByRole('main');
  expect(elem).toBeInTheDocument();
});
