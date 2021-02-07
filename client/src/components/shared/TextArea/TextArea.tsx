import React from 'react';
import cx from 'classnames';
import styles from './TextArea.module.scss';
import InputStyle, { TInputStyleProps } from '../Input/InputStyle';

export type TTextAreaProps = Pick<
  TInputStyleProps,
  'error' | 'errorMessage' | 'label' | 'containerClassName' | 'id'
> &
  Pick<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'className' | 'onChange' | 'value' | 'placeholder'
  >;

const TextArea = ({
  error,
  errorMessage,
  label,
  containerClassName,
  id,
  className,
  ...props
}: TTextAreaProps) => {
  return (
    <InputStyle
      containerClassName={containerClassName}
      error={error}
      errorMessage={errorMessage}
      id={id}
      label={label}
    >
      <textarea
        className={cx(styles.textarea, className)}
        rows={3}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </InputStyle>
  );
};

export default TextArea;
