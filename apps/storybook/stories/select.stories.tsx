import { ComponentMeta } from '@storybook/react';
import { Select, SelectDisplay } from '@tih/ui';
import React, { useState } from 'react';

const SelectDisplays: ReadonlyArray<SelectDisplay> = ['inline', 'block'];

export default {
  title: 'Select',
  component: Select,
  argTypes: {
    display: {
      options: SelectDisplays,
      control: { type: 'select' },
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
      onChange={setValue}
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
    />
  );
}

Basic.args = {
  label: 'Select fruit',
  display: 'inline',
  isLabelHidden: false,
};

export function Display() {
  const [value, setValue] = useState('apple');

  return (
    <div className="space-x-4">
      <Select
        label="Select a fruit"
        onChange={setValue}
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
      />
    </div>
  );
}
