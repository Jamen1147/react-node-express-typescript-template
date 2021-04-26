import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import TextArea, { TextAreaProps } from './TextArea';

const story: Meta = {
  title: 'TextArea',
  component: TextArea,
  argTypes: {
    containerClassName: {
      control: { disable: true },
    },
    onChange: { defaultValue: null },
  },
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<TextAreaProps> = (props) => <TextArea {...props} />;

const props: TextAreaProps = {
  label: 'Text Area',
};

export const Default = Template.bind({});
Default.args = {
  ...props,
};

export const WithError = Template.bind({});
WithError.args = {
  ...props,
  error: true,
  errorMessage: 'Please correct this field',
};

export default story;
