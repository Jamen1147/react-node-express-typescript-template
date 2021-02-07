import * as React from 'react';
import { Field } from 'react-final-form';
import Input from '../shared/Input';

type TProps = {
  name: string;
  mutateValue: (name: string, value: string) => void;
  label?: string;
  description?: string;
  errorMessageTooLong?: string;
  errorMessageTooShort?: string;
} & Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'maxLength' | 'minLength' | 'required' | 'placeholder' | 'id'
>;

const FormInput = ({
  label,
  description,
  placeholder,
  id,
  name,
  mutateValue,
  maxLength = Infinity,
  minLength = 0,
  required,
  type,
  errorMessageTooLong = `${
    label || 'This'
  } field has reached its maximum length of ${maxLength} characters.`,
  errorMessageTooShort = `${
    label || 'This'
  } field must be at least ${minLength} characters long.`,
}: TProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    mutateValue(name, val);
  };

  const validate = (value?: string) => {
    if (value && value.length > maxLength) {
      return errorMessageTooLong;
    }

    if (value && value.length < minLength) {
      return errorMessageTooShort;
    }

    if (required && !value) {
      return 'field required';
    }

    if (value && type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      return 'please enter a valid email address';
    }

    return undefined;
  };

  return (
    <Field name={name} validate={validate}>
      {({ input, meta }: any) => (
        <Input
          description={description}
          id={id}
          error={meta.touched && meta.error}
          errorMessage={meta.error}
          label={label}
          maxLength={maxLength}
          minLength={minLength}
          name={name}
          placeholder={placeholder}
          required={required}
          type={type}
          formNoValidate
          noValidate
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...input}
          onChange={handleChange}
        />
      )}
    </Field>
  );
};

export default FormInput;
