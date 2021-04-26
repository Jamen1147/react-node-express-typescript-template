import React from 'react';
import cx from 'classnames';
import styles from './Loader.module.scss';

export type LoaderProps = {
  size?: 'large' | 'medium' | 'small' | 'xsmall';
  color?: 'primary' | 'secondary' | 'inverted';
  className?: string;
};

const Loader = ({
  size = 'medium',
  color = 'primary',
  className,
}: LoaderProps) => (
  <div className={cx(styles.loader, className)}>
    <div
      className={cx(
        styles.spinner,
        styles[size],
        styles[color],
        styles.default
      )}
    />
  </div>
);

export default Loader;
