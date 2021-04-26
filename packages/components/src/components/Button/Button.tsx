import React from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';
import { Loader } from '../Loader';

export type ButtonProps = {
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: 'large' | 'medium' | 'small';
  variant?: 'primary' | 'secondary' | 'danger' | 'text';
  icon?: React.ReactNode;
  color?: string;
} & Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'className' | 'onClick'
>;

const Button = ({
  block,
  disabled,
  loading,
  size = 'medium',
  variant = 'primary',
  type = 'button',
  icon,
  color,
  onClick,
  children,
  className,
}: React.PropsWithChildren<ButtonProps>) => {
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
      // eslint-disable-next-line react/button-has-type
      type={type}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(onClick && {
        onClick,
      })}
      {...(color && {
        style: { color },
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
