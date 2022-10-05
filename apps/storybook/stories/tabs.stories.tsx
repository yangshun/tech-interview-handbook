import React, { useState } from 'react';
import type { ComponentMeta } from '@storybook/react';
import { Tabs } from '@tih/ui';

export default {
  argTypes: {
    label: {
      control: 'text',
    },
  },
  component: Tabs,
  title: 'Tabs',
} as ComponentMeta<typeof Tabs>;

export function Basic({
  label,
}: Pick<React.ComponentProps<typeof Tabs>, 'label'>) {
  const [value, setValue] = useState('apple');

  return (
    <Tabs
      label={label}
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
      onChange={setValue}
    />
  );
}

Basic.args = {
  label: 'Fruits Navigation',
};
