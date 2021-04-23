import React from 'react';
import InputStyle, { TInputStyleProps } from './InputStyle';

export type TInputProps = TInputStyleProps &
  React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef(
  (
    {
      error,
      errorMessage,
      label,
      loading,
      icon,
      outline,
      id,
      className,
      containerClassName,
      ...props
    }: TInputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <InputStyle
        error={error}
        errorMessage={errorMessage}
        label={label}
        loading={loading}
        icon={icon}
        outline={outline}
        id={id}
        containerClassName={containerClassName}
      >
        <input className={className} {...props} ref={ref} />
      </InputStyle>
    );
  }
);

Input.displayName = 'Input';
export default Input;
