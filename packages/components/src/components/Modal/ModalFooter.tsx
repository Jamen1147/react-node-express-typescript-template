import * as React from 'react';
import cx from 'classnames';
import styles from './Modal.module.scss';

export interface ModalFooterProps {
  className?: string;
}
const ModalFooter = ({
  className,
  children,
}: React.PropsWithChildren<ModalFooterProps>) => {
  return <div className={cx(styles.footer, className)}>{children}</div>;
};

export default ModalFooter;
