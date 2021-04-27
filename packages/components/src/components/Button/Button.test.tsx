import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('Button component', () => {
  const BUTTON_LABEL = 'Button';

  it('renders without errors', () => {
    render(<Button>{BUTTON_LABEL}</Button>);
    expect(screen.getByText(BUTTON_LABEL)).toBeInTheDocument();
  });

  it('calls "onClick" prop when button is clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>{BUTTON_LABEL}</Button>);
    userEvent.click(screen.getByText(BUTTON_LABEL));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders with correct danger variant', () => {
    render(<Button variant="danger">{BUTTON_LABEL}</Button>);
    expect(screen.getByText(BUTTON_LABEL)).toHaveClass(
      'button',
      'medium',
      'danger'
    );
  });
});
