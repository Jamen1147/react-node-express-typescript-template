import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import Wizard, { WizardProps } from './Wizard';
import { Input } from '../Input';
import { useWizard } from './context';

const story: Meta = {
  title: 'Wizard',
  component: Wizard,
};

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const StepWithHook = () => {
  const {
    register,
    formState: { errors },
  } = useWizard<FormValues>();

  return (
    <>
      <h2>Step NO.2</h2>
      <Input
        {...register('email', { required: true })}
        label="Email"
        error={!!errors.email}
      />
    </>
  );
};

const Template: Story<WizardProps<any>> = () => {
  const handleSubmit = (value: FormValues) => {
    // handles value
    console.log(value);
  };

  return (
    <div style={{ padding: '50px 200px' }}>
      <Wizard<FormValues> onSubmit={handleSubmit}>
        <Wizard.Step<FormValues>>
          {({ register, formState: { errors } }) => (
            <>
              <h2>Step NO.1</h2>
              <Input
                {...register('name', { required: true })}
                label="Name"
                error={!!errors.name}
              />
            </>
          )}
        </Wizard.Step>

        <Wizard.Step>
          <StepWithHook />
        </Wizard.Step>

        <Wizard.Step<FormValues>>
          {({ register, formState: { errors } }) => (
            <>
              <h2>Step NO.3</h2>
              <Input
                {...register('password', { required: true })}
                label="Password"
                type="password"
                error={!!errors.password}
              />
            </>
          )}
        </Wizard.Step>
      </Wizard>
    </div>
  );
};

export const Default = Template.bind({});

export default story;
