import React from 'react';
import InputStyle, { TInputStyleProps } from './InputStyle';

export type TInputProps = TInputStyleProps &
  Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    'className' | 'onChange' | 'value' | 'placeholder'
  >;

const Input = ({
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
}: TInputProps) => {
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
      <input
        className={className}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </InputStyle>
  );
};

export default Input;
