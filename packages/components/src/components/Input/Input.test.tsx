import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Input } from '.';

describe('Input component', () => {
  const INPUT_LABEL = 'Input';
  const TEST_ID = 'input_container';

  it('renders without errors', () => {
    render(<Input label={INPUT_LABEL} />);
    expect(screen.getByText(INPUT_LABEL)).toBeInTheDocument();
  });

  it('calls "onChange" prop when input is typed', () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange} label={INPUT_LABEL} />);
    userEvent.type(screen.getByText(INPUT_LABEL), 'test');
    expect(onChange).toHaveBeenCalledTimes(4);
  });

  it('renders correct styles with error', () => {
    render(<Input error />);
    expect(screen.getByTestId(TEST_ID)).toHaveClass('error');
  });
});
