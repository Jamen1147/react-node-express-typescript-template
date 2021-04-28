import React from 'react';
import cx from 'classnames';
import { Portal } from '../Portal';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import styles from './Modal.module.scss';

export type ModalProps = {
  isOpen: boolean;
  domNode?: HTMLElement | string;
  overlayClassName?: string;
  modalClassName?: string;
  onClickOverlay?: () => void;
};

const Modal = ({
  isOpen,
  domNode = 'portal',
  overlayClassName,
  modalClassName,
  onClickOverlay,
  children,
}: React.PropsWithChildren<ModalProps>) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Portal domNode={domNode}>
      <div
        className={cx(styles.overlay, overlayClassName)}
        role="presentation"
        data-testid="modal-overlay"
        aria-hidden
        {...(onClickOverlay && {
          onClick: onClickOverlay,
        })}
      >
        <div aria-hidden onClick={(e) => e.stopPropagation()}>
          <div
            className={cx(styles.modal, modalClassName)}
            role="dialog"
            tabIndex={-1}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
