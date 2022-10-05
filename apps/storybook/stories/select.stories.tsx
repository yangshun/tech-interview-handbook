import React, { useState } from 'react';
import type { ComponentMeta } from '@storybook/react';
import type { SelectDisplay } from '@tih/ui';
import { Select } from '@tih/ui';

const SelectDisplays: ReadonlyArray<SelectDisplay> = ['inline', 'block'];

export default {
  argTypes: {
    display: {
      control: { type: 'select' },
      options: SelectDisplays,
    },
    isLabelHidden: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
  },
  component: Select,
  title: 'Select',
} as ComponentMeta<typeof Select>;

export function Basic({
  display,
  isLabelHidden,
  label,
  name,
}: Pick<
  React.ComponentProps<typeof Select>,
  'display' | 'isLabelHidden' | 'label' | 'name'
>) {
  const [value, setValue] = useState('apple');

  return (
    <Select
      display={display}
      isLabelHidden={isLabelHidden}
      label={label}
      name={name}
      options={[
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
  display: 'inline',
  isLabelHidden: false,
  label: 'Select fruit',
};

export function Display() {
  const [value, setValue] = useState('apple');

  return (
    <div className="space-x-4">
      <Select
        label="Select a fruit"
        options={[
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
    </div>
  );
}
