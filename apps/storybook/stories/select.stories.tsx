import React, { useState } from 'react';
import type { ComponentMeta } from '@storybook/react';
import type { SelectDisplay } from '@tih/ui';
import { Select } from '@tih/ui';

const SelectDisplays: ReadonlyArray<SelectDisplay> = ['inline', 'block'];

export default {
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    display: {
      control: { type: 'select' },
      options: SelectDisplays,
    },
    errorMessage: {
      control: 'text',
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
    placeholder: {
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
    <div className="space-y-4">
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
      <Select
        display="block"
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

export function HiddenLabel() {
  const [value, setValue] = useState('apple');

  return (
    <div className="space-x-4">
      <Select
        isLabelHidden={true}
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

export function Disabled() {
  const [value, setValue] = useState('apple');

  return (
    <div className="space-x-4">
      <Select
        disabled={true}
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

export function Required() {
  const [value, setValue] = useState('apple');

  return (
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
      required={true}
      value={value}
      onChange={setValue}
    />
  );
}

export function Placeholder() {
  return (
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
      placeholder="Select a fruit"
      required={true}
    />
  );
}

export function Error() {
  const [value, setValue] = useState('banana');

  return (
    <Select
      errorMessage={value !== 'apple' ? 'Must select apple' : undefined}
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
      required={true}
      value={value}
      onChange={setValue}
    />
  );
}

export function Uncontrolled() {
  return (
    <div className="space-x-4">
      <Select
        defaultValue="apple"
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
      />
    </div>
  );
}
