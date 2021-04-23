import React from 'react';
import { Button, Input } from '@template/components/';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '../../hooks/useMutation';
import userService from '../../services/user';
import { emailInputOptions, inputOptions } from '../Login/config';

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const {
    handleSubmit,
    register: registerField,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [register] = useMutation(userService.register.bind(userService));

  const history = useHistory();

  const onSubmit = async (values: FormValues) => {
    const result = await register(values);
    if (result) {
      history.push('/login');
    }
  };

  // TODO: refine styles

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 style={{ textTransform: 'capitalize' }}>Register</h2>
      <Input
        label="User Name"
        placeholder="Please enter username"
        error={!!errors.name}
        errorMessage={errors.name?.message}
        {...registerField('name', inputOptions)}
      />
      <br />
      <Input
        label="Email"
        placeholder="Please enter email"
        error={!!errors.email}
        errorMessage={errors.email?.message}
        {...registerField('email', emailInputOptions)}
      />
      <br />
      <Input
        label="Password"
        placeholder="Please enter password"
        error={!!errors.password}
        errorMessage={errors.password?.message}
        type="password"
        autoComplete="on"
        {...registerField('password', inputOptions)}
      />
      <br />
      <Button type="submit" disabled={isSubmitting}>
        Register
      </Button>
      <Link to="/login" style={{ marginLeft: 10 }}>
        Try login
      </Link>
    </form>
  );
};

export default Register;
