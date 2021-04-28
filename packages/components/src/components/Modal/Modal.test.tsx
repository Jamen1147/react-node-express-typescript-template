import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Modal } from '.';

describe('Input component', () => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'root');
  document.body.appendChild(modalRoot);

  const HEADER_TEXT = 'Header';
  const BODY_TEXT = 'Body';
  const FOOTER_TEXT = 'Footer';

  it('renders without errors', () => {
    render(
      <Modal isOpen domNode={modalRoot}>
        <Modal.Header>{HEADER_TEXT}</Modal.Header>
        <Modal.Body>{BODY_TEXT}</Modal.Body>
        <Modal.Footer>{FOOTER_TEXT}</Modal.Footer>
      </Modal>
    );

    expect(screen.getByText(HEADER_TEXT)).toBeInTheDocument();
    expect(screen.getByText(BODY_TEXT)).toBeInTheDocument();
    expect(screen.getByText(FOOTER_TEXT)).toBeInTheDocument();
  });

  it('renders nothing if isOpen is set to false', () => {
    render(
      <Modal isOpen={false} domNode={modalRoot}>
        <Modal.Header>{HEADER_TEXT}</Modal.Header>
        <Modal.Body>{BODY_TEXT}</Modal.Body>
        <Modal.Footer>{FOOTER_TEXT}</Modal.Footer>
      </Modal>
    );

    expect(screen.queryByText(HEADER_TEXT)).not.toBeInTheDocument();
    expect(screen.queryByText(BODY_TEXT)).not.toBeInTheDocument();
    expect(screen.queryByText(FOOTER_TEXT)).not.toBeInTheDocument();
  });

  it('invokes onClickOverlay only when the outside is clicked', () => {
    const onClick = jest.fn();

    render(
      <Modal isOpen domNode={modalRoot} onClickOverlay={onClick}>
        <Modal.Header>{HEADER_TEXT}</Modal.Header>
        <Modal.Body>{BODY_TEXT}</Modal.Body>
        <Modal.Footer>{FOOTER_TEXT}</Modal.Footer>
      </Modal>
    );

    userEvent.click(screen.getByText(HEADER_TEXT));
    userEvent.click(screen.getByText(BODY_TEXT));
    userEvent.click(screen.getByText(FOOTER_TEXT));

    expect(onClick).toBeCalledTimes(0);

    userEvent.click(screen.getByTestId('modal-overlay'));

    expect(onClick).toBeCalledTimes(1);
  });
});
