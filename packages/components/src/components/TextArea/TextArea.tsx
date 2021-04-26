import React from 'react';
import cx from 'classnames';
import styles from './TextArea.module.scss';
import InputStyle, { InputStyleProps } from '../Input/InputStyle';

export type TextAreaProps = Pick<
  InputStyleProps,
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
    }: TextAreaProps,
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
