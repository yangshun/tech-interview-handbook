import React, { useState } from 'react';
import type { ComponentMeta } from '@storybook/react';
import type { RadioListOrientation } from '@tih/ui';
import { HorizontalDivider } from '@tih/ui';
import { RadioList } from '@tih/ui';

const RadioListOrientations: ReadonlyArray<RadioListOrientation> = [
  'horizontal',
  'vertical',
];

export default {
  argTypes: {
    description: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    orientation: {
      control: { type: 'select' },
      options: RadioListOrientations,
    },
  },
  component: RadioList,
  title: 'RadioList',
} as ComponentMeta<typeof RadioList>;

export function Basic({
  description,
  label,
}: Pick<React.ComponentProps<typeof RadioList>, 'description' | 'label'>) {
  const items = [
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
  ];

  return (
    <RadioList
      defaultValue="apple"
      description={description}
      label={label}
      name="fruit">
      {items.map(({ label: itemLabel, value }) => (
        <RadioList.Item key={itemLabel} label={itemLabel} value={value} />
      ))}
    </RadioList>
  );
}

Basic.args = {
  description: 'Your favorite fruit',
  label: 'Choose a fruit',
};

export function Controlled() {
  const items = [
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
  ];

  const [value, setValue] = useState('apple');

  return (
    <RadioList
      label="Choose a fruit"
      value={value}
      onChange={(newValue: string) => setValue(newValue)}>
      {items.map(({ label: itemLabel, value: itemValue }) => (
        <RadioList.Item key={itemLabel} label={itemLabel} value={itemValue} />
      ))}
    </RadioList>
  );
}

export function Orientation() {
  const items = [
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
  ];

  return (
    <div className="space-y-4">
      <RadioList
        defaultValue="apple"
        label="Choose a fruit"
        name="fruit-2"
        orientation="vertical">
        {items.map(({ label: itemLabel, value: itemValue }) => (
          <RadioList.Item key={itemLabel} label={itemLabel} value={itemValue} />
        ))}
      </RadioList>
      <HorizontalDivider />
      <RadioList
        defaultValue="banana"
        label="Choose a fruit"
        name="fruit-3"
        orientation="horizontal">
        {items.map(({ label: itemLabel, value: itemValue }) => (
          <RadioList.Item key={itemLabel} label={itemLabel} value={itemValue} />
        ))}
      </RadioList>
    </div>
  );
}
