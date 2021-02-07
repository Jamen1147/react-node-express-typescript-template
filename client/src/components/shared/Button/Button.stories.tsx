import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import Button, { TButtonProps } from './Button';
import { ReactComponent as Icon } from '../../../assets/icons/plugin.svg';

const story: Meta<TButtonProps> = {
  title: 'Button',
  component: Button,
  argTypes: {
    icon: {
      control: { disable: true },
    },
    /**
     * onClick inherited from HTMLElement won't get picked up by storybook at the current version
     * so need to put it on the argTypes so that the global parameters can acutally do something on it.
     * or change the TButtonProps to make onClick actually there instead of picking from another type.
     */
    onClick: { defaultValue: null },
  },
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<TButtonProps> = (props) => <Button {...props} />;

const props: React.PropsWithChildren<TButtonProps> = {
  children: 'Button',
};

export const Primary = Template.bind({});
Primary.args = {
  ...props,
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...props,
  variant: 'secondary',
};

export const Danger = Template.bind({});
Danger.args = {
  ...props,
  variant: 'danger',
};

export const Text = Template.bind({});
Text.args = {
  ...props,
  variant: 'text',
};

export const Large = Template.bind({});
Large.args = {
  ...props,
  size: 'large',
};

export const Medium = Template.bind({});
Medium.args = {
  ...props,
  size: 'medium',
};

export const Small = Template.bind({});
Small.args = {
  ...props,
  size: 'small',
};

export const Block = Template.bind({});
Block.args = {
  ...props,
  block: true,
};

export const Loading = Template.bind({});
Loading.args = {
  ...props,
  loading: true,
  disabled: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...props,
  disabled: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...props,
  icon: <Icon />,
};

export default story;
