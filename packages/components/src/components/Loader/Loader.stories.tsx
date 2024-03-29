import React from 'react';
import { Story, Meta } from '@storybook/react';
import Loader, { LoaderProps } from './Loader';

const story: Meta = {
  title: 'Loader',
  component: Loader,
  argTypes: {
    className: {
      control: { disable: true },
    },
  },
};

const Template: Story<LoaderProps> = (props) => <Loader {...props} />;

export const Default = Template.bind({});

export default story;
