import { ComponentMeta } from '@storybook/react';
import { Tabs } from '@tih/ui';
import React, { useState } from 'react';

export default {
  title: 'Tabs',
  component: Tabs,
  argTypes: {
    label: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof Tabs>;

export function Basic({
  label,
}: Pick<React.ComponentProps<typeof Tabs>, 'label'>) {
  const [value, setValue] = useState('apple');

  return (
    <Tabs
      label={label}
      onChange={setValue}
      tabs={[
        {
          label: 'Apple',
          value: 'apple',
        },
        {
          label: 'Banana',
          value: 'banana',
        },
        {
          label: 'Orange',
          value: 'orange',
        },
      ]}
      value={value}
    />
  );
}

Basic.args = {
  label: 'Fruits Navigation',
};
