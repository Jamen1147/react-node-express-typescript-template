import * as React from 'react';
import { range } from 'lodash';
import { Meta } from '@storybook/react';
import { Modal } from '.';
import { ModalProps } from './Modal';

export default {
  title: 'Modal',
  component: Modal,
} as Meta;

export const Default: React.VFC<ModalProps> = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button type="button" onClick={openModal}>
        Open Modal
      </button>
      <Modal isOpen={isOpen} domNode="root" onClickOverlay={closeModal}>
        <Modal.Header>Heading</Modal.Header>
        <Modal.Body>
          <h3 id="dialog1Title">Hello Modal</h3>
        </Modal.Body>

        <Modal.Footer>
          <button type="button" onClick={closeModal}>
            Close Modal
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const LongContent: React.VFC<ModalProps> = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button type="button" onClick={openModal}>
        Open Modal
      </button>
      <Modal isOpen={isOpen} domNode="root">
        <Modal.Header>
          <h3 style={{ margin: 0 }} id="dialog2Title">
            Hello Modal
          </h3>
        </Modal.Header>
        <Modal.Body>
          <p id="dialog2Desc">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </p>
          {range(10).map((item) => (
            <p key={item}>{item}</p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={closeModal}>
            Close Modal
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
