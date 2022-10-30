import React, { useState } from 'react';
import {
  EnvelopeIcon,
  KeyIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/solid';
import type { ComponentMeta } from '@storybook/react';
import { Select, TextInput } from '@tih/ui';

export default {
  argTypes: {
    autoComplete: {
      control: 'text',
    },
    description: {
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
      startAddOn={EnvelopeIcon}
      startAddOnType="icon"
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
        startAddOn={QuestionMarkCircleIcon}
        startAddOnType="icon"
        type="text"
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

export function Disabled() {
  return (
    <div className="space-y-4">
      <TextInput
        disabled={true}
        label="Disabled input"
        placeholder="John Doe (Placeholder)"
        type="text"
      />
      <TextInput
        disabled={true}
        label="Disabled input"
        type="text"
        value="John Doe (Value)"
      />
      <TextInput
        disabled={true}
        endAddOn={
          <Select
            borderStyle="borderless"
            isLabelHidden={true}
            label="Currency"
            options={[
              {
                label: 'USD',
                value: 'USD',
              },
              {
                label: 'SGD',
                value: 'SGD',
              },
              {
                label: 'EUR',
                value: 'EUR',
              },
            ]}
          />
        }
        endAddOnType="element"
        label="Price"
        placeholder="0.00"
        startAddOn="$"
        startAddOnType="label"
        type="text"
      />
    </div>
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
      label="Password"
      startAddOn={KeyIcon}
      startAddOnType="icon"
      type="password"
      value={value}
      onChange={setValue}
    />
  );
}

export function Description() {
  const [value, setValue] = useState('1234567');

  return (
    <TextInput
      description="Select a password that is at least 6 characters"
      errorMessage={
        value.length < 6 ? 'Password must be at least 6 characters' : undefined
      }
      label="Password"
      startAddOn={KeyIcon}
      startAddOnType="icon"
      type="password"
      value={value}
      onChange={setValue}
    />
  );
}

export function AddOns() {
  return (
    <div className="space-y-4">
      <TextInput
        label="Price"
        placeholder="0.00"
        startAddOn="$"
        startAddOnType="label"
        type="text"
      />
      <TextInput
        endAddOn="USD"
        endAddOnType="label"
        label="Price"
        placeholder="0.00"
        type="text"
      />
      <TextInput
        endAddOn="USD"
        endAddOnType="label"
        label="Price"
        placeholder="0.00"
        startAddOn="$"
        startAddOnType="label"
        type="text"
      />
      <TextInput
        label="Phone Number"
        placeholder="+1 (123) 456-7890"
        startAddOn={
          <Select
            borderStyle="borderless"
            isLabelHidden={true}
            label="country"
            options={[
              {
                label: 'US',
                value: 'US',
              },
              {
                label: 'SG',
                value: 'SG',
              },
              {
                label: 'JP',
                value: 'JP',
              },
            ]}
          />
        }
        startAddOnType="element"
        type="text"
      />
      <TextInput
        endAddOn={
          <Select
            borderStyle="borderless"
            isLabelHidden={true}
            label="Currency"
            options={[
              {
                label: 'USD',
                value: 'USD',
              },
              {
                label: 'SGD',
                value: 'SGD',
              },
              {
                label: 'EUR',
                value: 'EUR',
              },
            ]}
          />
        }
        endAddOnType="element"
        label="Price"
        placeholder="0.00"
        startAddOn="$"
        startAddOnType="label"
        type="text"
      />
    </div>
  );
}
