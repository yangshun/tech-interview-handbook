import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '@tih/ui';
import React from 'react';

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const PrimaryButton = Template.bind({});

PrimaryButton.args = {
  label: 'Button text',
  size: 'md',
  variant: 'primary',
};

export const SecondaryButton = Template.bind({});

SecondaryButton.args = {
  label: 'Button text',
  size: 'md',
  variant: 'secondary',
};
