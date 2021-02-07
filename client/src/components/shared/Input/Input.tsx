import InputStyle, { TInputStyleProps } from './InputStyle';

type TProps = TInputStyleProps & React.InputHTMLAttributes<HTMLInputElement>;

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
}: TProps) => {
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
