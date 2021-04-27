import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { TextArea } from '.';

describe('TextArea component', () => {
  const TEXTAREA_LABEL = 'TextArea';

  it('renders without errors', () => {
    render(<TextArea label={TEXTAREA_LABEL} />);
    expect(screen.getByText(TEXTAREA_LABEL)).toBeInTheDocument();
  });

  it('calls "onChange" prop when textarea is typed', () => {
    const onChange = jest.fn();
    render(<TextArea onChange={onChange} label={TEXTAREA_LABEL} />);
    userEvent.type(screen.getByText(TEXTAREA_LABEL), 'test');
    expect(onChange).toHaveBeenCalledTimes(4);
  });
});
