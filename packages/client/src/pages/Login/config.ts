import { RegisterOptions } from 'react-hook-form';

export const inputOptions: RegisterOptions = {
  required: 'This field is required',
  minLength: { value: 4, message: 'At least 3 characters are required' },
  maxLength: { value: 255, message: 'Max length of 255 characters reached' },
};

export const emailInputOptions: RegisterOptions = {
  ...inputOptions,
  pattern: {
    value: /\S+@\S+.\S+/,
    message: 'Entered value does not match email format',
  },
};
