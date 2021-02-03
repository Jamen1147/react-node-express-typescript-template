import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders text <react app>', () => {
  render(<App />);
  const elem = screen.getByText('React App');
  expect(elem).toBeInTheDocument();
});
