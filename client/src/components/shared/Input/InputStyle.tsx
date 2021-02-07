import React from 'react';
import cx from 'classnames';
import { uniqueId } from 'lodash';
import styles from './InputStyle.module.scss';
import Loader from '../Loader';
import { mapChildren } from '../../../utils/element';

export type TInputStyleProps = {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  loading?: boolean;
  icon?: JSX.Element;
  outline?: boolean;
  id?: string;
  containerClassName?: string;
};

const InputStyle: React.FC<TInputStyleProps> = ({
  error,
  errorMessage = 'Please fill out this field',
  label,
  loading,
  icon,
  outline = true,
  id,
  containerClassName,
  children,
}) => {
  const [inputId] = React.useState(id || uniqueId('input_'));

  return (
    <div className={cx(styles.field, containerClassName)}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}

      <div
        className={cx(
          styles.fieldContent,
          error && styles.error,
          !outline && styles.grey
        )}
      >
        {icon &&
          React.cloneElement(icon, {
            className: cx(icon.props.className, styles.icon),
          })}

        {mapChildren(children, (child) => {
          return React.cloneElement(child, {
            className: cx(child.props.className, styles.input),
            id: inputId,
          });
        })}

        {loading && (
          <div className={styles.load}>
            <Loader size="small" />
          </div>
        )}
      </div>

      {error && errorMessage && (
        <span className={styles.errMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

export default InputStyle;
