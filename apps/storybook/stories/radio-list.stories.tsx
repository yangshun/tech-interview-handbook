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
  orientation,
}: Pick<
  React.ComponentProps<typeof RadioList>,
  'description' | 'label' | 'orientation'
>) {
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
      name="fruit"
      orientation={orientation}>
      {items.map(({ label: itemLabel, value }) => (
        <RadioList.Item key={itemLabel} label={itemLabel} value={value} />
      ))}
    </RadioList>
  );
}

Basic.args = {
  description: 'Your favorite fruit',
  label: 'Choose a fruit',
  orientation: 'vertical',
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
      description="You will be served it during dinner"
      label="Choose a fruit"
      value={value}
      onChange={(newValue: string) => setValue(newValue)}>
      {items.map(({ label: itemLabel, value: itemValue }) => (
        <RadioList.Item key={itemLabel} label={itemLabel} value={itemValue} />
      ))}
    </RadioList>
  );
}

export function Required() {
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
      description="You will be served it during dinner"
      label="Choose a fruit"
      required={true}
      value={value}
      onChange={(newValue: string) => setValue(newValue)}>
      {items.map(({ label: itemLabel, value: itemValue }) => (
        <RadioList.Item key={itemLabel} label={itemLabel} value={itemValue} />
      ))}
    </RadioList>
  );
}

export function Disabled() {
  const items = [
    {
      description: 'A red fruit',
      disabled: false,
      label: 'Apple',
      value: 'apple',
    },
    {
      description: 'A yellow fruit',
      disabled: true,
      label: 'Banana',
      value: 'banana',
    },
    {
      description: 'An orange fruit',
      disabled: false,
      label: 'Orange',
      value: 'orange',
    },
  ];

  return (
    <div className="space-y-4">
      <RadioList
        defaultValue="apple"
        label="Choose a fruit (some fruits disabled)"
        name="fruit-5">
        {items.map(
          ({ description, label: itemLabel, value: itemValue, disabled }) => (
            <RadioList.Item
              key={itemLabel}
              description={description}
              disabled={disabled}
              label={itemLabel}
              value={itemValue}
            />
          ),
        )}
      </RadioList>
    </div>
  );
}

export function ItemDescriptions() {
  const items = [
    {
      description: 'A red fruit',
      label: 'Apple',
      value: 'apple',
    },
    {
      description: 'A yellow fruit',
      label: 'Banana',
      value: 'banana',
    },
    {
      description: 'An orange fruit',
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
      {items.map(({ description, label: itemLabel, value: itemValue }) => (
        <RadioList.Item
          key={itemValue}
          description={description}
          label={itemLabel}
          value={itemValue}
        />
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
