import React from 'react';
import cx from 'classnames';
import styles from './TextArea.module.scss';
import InputStyle, { TInputStyleProps } from '../Input/InputStyle';

export type TTextAreaProps = Pick<
  TInputStyleProps,
  'error' | 'errorMessage' | 'label' | 'containerClassName' | 'id'
> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef(
  (
    {
      error,
      errorMessage,
      label,
      containerClassName,
      id,
      className,
      ...props
    }: TTextAreaProps,
    ref: React.Ref<HTMLTextAreaElement>
  ) => {
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
          {...props}
          ref={ref}
        />
      </InputStyle>
    );
  }
);

TextArea.displayName = 'TextArea';
export default TextArea;
