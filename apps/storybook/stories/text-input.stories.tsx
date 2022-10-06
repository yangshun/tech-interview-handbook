import React, { useState } from 'react';
import {
  EnvelopeIcon,
  KeyIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/solid';
import type { ComponentMeta } from '@storybook/react';
import { TextInput } from '@tih/ui';

export default {
  argTypes: {
    autoComplete: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
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
    required: {
      control: 'boolean',
    },
    type: {
      control: 'text',
    },
  },
  component: TextInput,
  title: 'TextInput',
} as ComponentMeta<typeof TextInput>;

export const Basic = {
  args: {
    label: 'Name',
    placeholder: 'John Doe',
  },
};

export function HiddenLabel() {
  const [value, setValue] = useState('');

  return (
    <TextInput
      isLabelHidden={true}
      label="Name"
      placeholder="John Doe"
      type="text"
      value={value}
      onChange={setValue}
    />
  );
}

export function Email() {
  const [value, setValue] = useState('');

  return (
    <TextInput
      label="Email"
      placeholder="john.doe@email.com"
      startIcon={EnvelopeIcon}
      type="email"
      value={value}
      onChange={setValue}
    />
  );
}

export function Icon() {
  const [value, setValue] = useState('');

  return (
    <div className="space-y-4">
      <TextInput
        endIcon={QuestionMarkCircleIcon}
        label="Account number"
        placeholder="000-00-0000"
        type="text"
        value={value}
        onChange={setValue}
      />
      <TextInput
        label="Account number"
        placeholder="000-00-0000"
        startIcon={QuestionMarkCircleIcon}
        type="text"
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

export function Disabled() {
  return (
    <TextInput
      disabled={true}
      label="Disabled input"
      placeholder="John Doe"
      type="text"
    />
  );
}

export function Required() {
  return (
    <TextInput
      label="Required input"
      placeholder="John Doe"
      required={true}
      type="text"
    />
  );
}

export function Error() {
  const [value, setValue] = useState('1234');

  return (
    <TextInput
      errorMessage={
        value.length < 6 ? 'Password must be at least 6 characters' : undefined
      }
      label="Email"
      startIcon={KeyIcon}
      type="password"
      value={value}
      onChange={setValue}
    />
  );
}
