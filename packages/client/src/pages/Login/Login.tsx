import React from 'react';
import { Button, Input } from '@template/components/';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from '../../context/global/config';
import { loginAction } from '../../context/global/user/action';
import { useMutation } from '../../hooks/useMutation';
import authService from '../../services/auth';
import { emailInputOptions, inputOptions } from './config';

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    handleSubmit,
    register: registerField,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [login] = useMutation(authService.login.bind(authService));

  const dispatch = useDispatch();

  const history = useHistory();

  const onSubmit = async (values: FormValues) => {
    const result = await login(values);
    if (result.value && !result.hasError) {
      dispatch(loginAction(result.value));
      history.push('/');
    }
  };

  // TODO: refine styles

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 style={{ textTransform: 'capitalize' }}>Login</h2>
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
        Login
      </Button>
      <Link to="/register" style={{ marginLeft: 10 }}>
        Try register
      </Link>
    </form>
  );
};

export default Login;
