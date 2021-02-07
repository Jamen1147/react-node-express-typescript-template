/* eslint-disable react/button-has-type */
import React from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';
import Loader from '../Loader';

type TProps = {
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: 'large' | 'medium' | 'small';
  variant?: 'primary' | 'secondary' | 'danger' | 'text';
  icon?: React.ReactNode;
} & Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'className' | 'onClick'
>;

const Button: React.FC<TProps> = ({
  block,
  disabled,
  loading,
  size = 'medium',
  variant = 'primary',
  type = 'button',
  icon,
  onClick,
  children,
  className,
}) => {
  return (
    <button
      className={cx(
        styles.button,
        block && styles.block,
        disabled && styles.disabled,
        icon && styles.hasIcon,
        styles[size],
        styles[variant],
        className
      )}
      disabled={disabled}
      type={type}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(onClick && {
        onClick,
      })}
    >
      {icon}
      {loading ? (
        <Loader className={styles.load} color="inverted" size="small" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
