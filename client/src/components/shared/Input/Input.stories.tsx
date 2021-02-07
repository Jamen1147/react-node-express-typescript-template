import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import Input, { TInputProps } from './Input';
import { ReactComponent as Icon } from '../../../assets/icons/plugin.svg';

const story: Meta = {
  title: 'Input',
  component: Input,
  argTypes: {
    icon: {
      control: { disable: true },
    },
    id: {
      control: { disable: true },
    },
    containerClassName: {
      control: { disable: true },
    },
    onChange: { defaultValue: null },
  },
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<TInputProps> = (props) => <Input {...props} />;

const props: TInputProps = {
  label: 'Input Field',
  placeholder: 'Please enter some value',
};

export const Default = Template.bind({});
Default.args = {
  ...props,
};

export const Solid = Template.bind({});
Solid.args = {
  ...props,
  outline: false,
};

export const WithError = Template.bind({});
WithError.args = {
  ...props,
  error: true,
  errorMessage: 'Please correct this field',
};

export const Loading = Template.bind({});
Loading.args = {
  ...props,
  loading: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...props,
  icon: <Icon />,
};

export default story;
