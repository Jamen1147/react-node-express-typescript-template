import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import Loader, { TLoaderProps } from './Loader';

const story: Meta = {
  title: 'Loader',
  component: Loader,
  argTypes: {
    className: {
      control: { disable: true },
    },
  },
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<TLoaderProps> = (props) => <Loader {...props} />;

export const Default = Template.bind({});

export default story;
