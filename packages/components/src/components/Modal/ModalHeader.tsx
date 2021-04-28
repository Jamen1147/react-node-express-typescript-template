import * as React from 'react';
import cx from 'classnames';
import styles from './Modal.module.scss';

export interface ModalHeadingProps {
  className?: string;
}
const ModalHeader = ({
  className,
  children,
}: React.PropsWithChildren<ModalHeadingProps>) => {
  return <div className={cx(styles.header, className)}>{children}</div>;
};

export default ModalHeader;
