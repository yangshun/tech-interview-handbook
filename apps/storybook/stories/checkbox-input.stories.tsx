import React, { useState } from 'react';
import type { ComponentMeta } from '@storybook/react';
import { CheckboxInput } from '@tih/ui';

export default {
  argTypes: {
    defaultValue: {
      control: 'boolean',
    },
    description: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    value: {
      control: 'boolean',
    },
  },
  component: CheckboxInput,
  title: 'CheckboxInput',
} as ComponentMeta<typeof CheckboxInput>;

export function Basic({
  defaultValue,
  description,
  disabled,
  label,
}: Pick<
  React.ComponentProps<typeof CheckboxInput>,
  'defaultValue' | 'description' | 'disabled' | 'label'
>) {
  return (
    <CheckboxInput
      defaultValue={defaultValue}
      description={description}
      disabled={disabled}
      label={label}
    />
  );
}

Basic.args = {
  description: 'I will be responsible for any mistakes',
  disabled: false,
  label: 'I have read the terms and conditions',
};

export function Controlled() {
  const [value, setValue] = useState(true);

  return (
    <CheckboxInput
      label="I have read the terms and conditions"
      value={value}
      onChange={(newValue: boolean) => {
        setValue(newValue);
      }}
    />
  );
}

export function Disabled() {
  return (
    <div className="space-y-4">
      <CheckboxInput
        defaultValue={true}
        label="I have read the terms and conditions"
      />
      <CheckboxInput
        defaultValue={false}
        label="I have read the terms and conditions"
      />
      <CheckboxInput
        defaultValue={true}
        disabled={true}
        label="I have read the terms and conditions"
      />
      <CheckboxInput
        defaultValue={false}
        disabled={true}
        label="I have read the terms and conditions"
      />
    </div>
  );
}

export function ItemDescriptions() {
  return (
    <CheckboxInput
      defaultValue={false}
      description="I will be responsible for any mistakes"
      label="I have read the terms and conditions"
    />
  );
}
