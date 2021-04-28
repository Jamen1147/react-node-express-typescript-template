import * as React from 'react';
import cx from 'classnames';
import styles from './Modal.module.scss';

export interface ModalBodyProps {
  className?: string;
}

const ModalBody = ({
  className,
  children,
}: React.PropsWithChildren<ModalBodyProps>) => {
  return <div className={cx(styles.body, className)}>{children}</div>;
};

export default ModalBody;
