import {
  EnvelopeIcon,
  KeyIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/solid';
import { ComponentMeta } from '@storybook/react';
import { TextInput } from '@tih/ui';
import React, { useState } from 'react';

export default {
  title: 'TextInput',
  component: TextInput,
  argTypes: {
    autoComplete: {
      control: 'text',
    },
    errorMessage: {
      control: 'text',
    },
    isDisabled: {
      control: 'boolean',
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
    type: {
      control: 'text',
    },
  },
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
        startIcon={QuestionMarkCircleIcon}
        label="Account number"
        placeholder="000-00-0000"
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
      isDisabled={true}
      label="Disabled input"
      placeholder="John Doe"
      type="text"
    />
  );
}

export function Error() {
  const [value, setValue] = useState('1234');

  return (
    <TextInput
      label="Email"
      errorMessage={
        value.length < 6 ? 'Password must be at least 6 characters' : undefined
      }
      startIcon={KeyIcon}
      type="password"
      value={value}
      onChange={setValue}
    />
  );
}
