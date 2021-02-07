import React from 'react';
import { Form, FormSpy } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { login, register } from '../../stores/user/actions';
import FormInput from '../Form/FormInput';
import Button from '../shared/Button';

const initForm = { name: '', email: '', password: '' };

const LoginPage = () => {
  const dispatch = useDispatch();
  const [type, setType] = React.useState<'Login' | 'Register'>('Login');

  const onSubmit = async (formData: typeof initForm) => {
    const { name, email, password } = formData;
    if (type === 'Register') {
      // awaiting it so that the submitting on form-spy works as expected.
      await dispatch(register({ name, email, password }));
    } else {
      await dispatch(login({ email, password }));
    }
  };

  const handleSetType = () => setType(type === 'Login' ? 'Register' : 'Login');

  return (
    <>
      <Form
        onSubmit={onSubmit}
        mutators={{
          setValue: ([field, value], state, { changeValue }) => {
            changeValue(state, field, () => value);
          },
        }}
        initialValues={initForm}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit} noValidate>
            {type === 'Register' && (
              <FormInput
                label="User Name"
                name="name"
                required
                mutateValue={form.mutators.setValue}
              />
            )}
            <br />
            <FormInput
              label="Email"
              name="email"
              type="email"
              required
              mutateValue={form.mutators.setValue}
            />
            <br />
            <FormInput
              label="Password"
              name="password"
              type="password"
              minLength={6}
              required
              mutateValue={form.mutators.setValue}
            />
            <br />
            <FormSpy
              subscription={{
                submitting: true,
                pristine: true,
                error: true,
              }}
            >
              {({ submitting, pristine }) => (
                <Button loading={submitting} disabled={pristine} type="submit">
                  {type}
                </Button>
              )}
            </FormSpy>
          </form>
        )}
      />
      <br />
      <Button variant="text" onClick={handleSetType}>
        Try {type === 'Login' ? 'Register' : 'Login'} ?
      </Button>
    </>
  );
};

export default LoginPage;
