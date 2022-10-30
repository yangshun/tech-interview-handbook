import React, { useState } from 'react';
import type { ComponentMeta } from '@storybook/react';
import type { CheckboxListOrientation } from '@tih/ui';
import { HorizontalDivider } from '@tih/ui';
import { CheckboxInput, CheckboxList } from '@tih/ui';

const CheckboxListOrientations: ReadonlyArray<CheckboxListOrientation> = [
  'horizontal',
  'vertical',
];

export default {
  argTypes: {
    description: {
      control: 'text',
    },
    isLabelHidden: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    orientation: {
      control: { type: 'select' },
      options: CheckboxListOrientations,
    },
  },
  component: CheckboxList,
  title: 'CheckboxList',
} as ComponentMeta<typeof CheckboxList>;

export function Basic({
  description,
  label,
  orientation,
}: Pick<
  React.ComponentProps<typeof CheckboxList>,
  'description' | 'label' | 'orientation'
>) {
  const items = [
    {
      label: 'Apple',
      name: 'apple',
      value: true,
    },
    {
      label: 'Banana',
      name: 'banana',
      value: true,
    },
    {
      label: 'Orange',
      name: 'orange',
      value: false,
    },
  ];

  return (
    <CheckboxList
      description={description}
      label={label}
      orientation={orientation}>
      {items.map(({ label: itemLabel, name, value: itemValue }) => (
        <CheckboxInput
          key={itemLabel}
          defaultValue={itemValue}
          label={itemLabel}
          name={name}
        />
      ))}
    </CheckboxList>
  );
}

Basic.args = {
  description: 'Selected fruits will be served after dinner',
  label: 'Select your favorite fruits',
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

  const [values, setValues] = useState(new Set(['apple']));

  return (
    <CheckboxList
      description="You will be served it during dinner"
      label="Choose a fruit">
      {items.map(({ label: itemLabel, value: itemValue }) => (
        <CheckboxInput
          key={itemLabel}
          label={itemLabel}
          value={values.has(itemValue)}
          onChange={(newValue: boolean) => {
            if (newValue) {
              setValues(new Set([...Array.from(values), itemValue]));
            } else {
              setValues(
                new Set(Array.from(values).filter((v) => v !== itemValue)),
              );
            }
          }}
        />
      ))}
    </CheckboxList>
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

  const [values, setValues] = useState(new Set(['apple', 'banana']));

  return (
    <div className="space-y-4">
      <CheckboxList label="Choose a fruit (some fruits disabled)">
        {items.map(({ disabled, label: itemLabel, value: itemValue }) => (
          <CheckboxInput
            key={itemLabel}
            disabled={disabled}
            label={itemLabel}
            value={values.has(itemValue)}
            onChange={(newValue: boolean) => {
              if (newValue) {
                setValues(new Set([...Array.from(values), itemValue]));
              } else {
                setValues(
                  new Set(Array.from(values).filter((v) => v !== itemValue)),
                );
              }
            }}
          />
        ))}
      </CheckboxList>
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

  const [values, setValues] = useState(new Set(['apple', 'banana']));

  return (
    <div className="space-y-4">
      <CheckboxList label="Choose a fruit (some fruits disabled)">
        {items.map(({ description, label: itemLabel, value: itemValue }) => (
          <CheckboxInput
            key={itemLabel}
            description={description}
            label={itemLabel}
            value={values.has(itemValue)}
            onChange={(newValue: boolean) => {
              if (newValue) {
                setValues(new Set([...Array.from(values), itemValue]));
              } else {
                setValues(
                  new Set(Array.from(values).filter((v) => v !== itemValue)),
                );
              }
            }}
          />
        ))}
      </CheckboxList>
    </div>
  );
}

export function Orientation() {
  const items = [
    {
      label: 'Apple',
      name: 'apple',
      value: true,
    },
    {
      label: 'Banana',
      name: 'banana',
      value: false,
    },
    {
      label: 'Orange',
      name: 'orange',
      value: true,
    },
  ];

  return (
    <div className="space-y-4">
      <CheckboxList label="Choose a fruit" orientation="vertical">
        {items.map(({ label: itemLabel, name, value: itemValue }) => (
          <CheckboxInput
            key={itemLabel}
            defaultValue={itemValue}
            label={itemLabel}
            name={name}
          />
        ))}
      </CheckboxList>
      <HorizontalDivider />
      <CheckboxList label="Choose a fruit" orientation="horizontal">
        {items.map(({ label: itemLabel, name, value: itemValue }) => (
          <CheckboxInput
            key={itemLabel}
            defaultValue={itemValue}
            label={itemLabel}
            name={name}
          />
        ))}
      </CheckboxList>
    </div>
  );
}
