import { ComponentMeta } from '@storybook/react';

import {
  Button,
  ButtonAddOnPosition,
  ButtonDisplay,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '@tih/ui';
import React from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/solid';

const buttonTypes: ReadonlyArray<ButtonType> = ['button', 'reset', 'submit'];
const buttonSizes: ReadonlyArray<ButtonSize> = ['sm', 'md', 'lg'];
const buttonAddOnPositions: ReadonlyArray<ButtonAddOnPosition> = [
  'start',
  'end',
];
const buttonDisplays: ReadonlyArray<ButtonDisplay> = ['block', 'inline'];
const buttonVariants: ReadonlyArray<ButtonVariant> = [
  'primary',
  'secondary',
  'tertiary',
  'special',
  'success',
];

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    addonPosition: {
      options: buttonAddOnPositions,
      control: { type: 'select' },
    },
    display: {
      options: buttonDisplays,
      control: { type: 'select' },
    },
    isDisabled: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
    label: {
      control: 'string',
    },
    size: {
      options: buttonSizes,
      control: { type: 'select' },
    },
    type: {
      options: buttonTypes,
      control: { type: 'select' },
    },
    variant: {
      options: buttonVariants,
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Button>;

export const Basic = {
  args: {
    label: 'Click Me',
    size: 'md',
    variant: 'primary',
  },
};

export function Variant() {
  return (
    <div className="space-x-4">
      {buttonVariants.map((variant) => (
        <Button key={variant} label="Click Me" size="md" variant={variant} />
      ))}
    </div>
  );
}

export function Size() {
  return (
    <div className="space-x-4">
      {buttonSizes.map((size) => (
        <Button key={size} label="Click Me" size={size} variant="primary" />
      ))}
    </div>
  );
}

export function Display() {
  return (
    <div className="space-y-4">
      {buttonSizes.map((size) => (
        <Button
          key={size}
          display="block"
          label="Click Me"
          size={size}
          variant="primary"
        />
      ))}
    </div>
  );
}

export function Disabled() {
  return (
    <div className="space-x-4">
      {buttonVariants.map((variant) => (
        <Button
          isDisabled={true}
          key={variant}
          label="Click Me"
          size="md"
          variant={variant}
        />
      ))}
    </div>
  );
}

export function Loading() {
  return (
    <div className="space-y-4">
      <div className="space-x-4">
        {buttonVariants.map((variant) => (
          <Button
            isLoading={true}
            key={variant}
            label="Click Me"
            size="md"
            variant={variant}
          />
        ))}
      </div>
      <div className="space-x-4">
        {buttonVariants.map((variant) => (
          <Button
            isDisabled={true}
            isLoading={true}
            key={variant}
            label="Click Me"
            size="md"
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}

export function Icons() {
  return (
    <div className="space-y-4">
      <div className="space-x-4">
        {buttonSizes.map((size) => (
          <Button
            key={size}
            icon={EnvelopeIcon}
            label="Click Me"
            size={size}
            variant="primary"
          />
        ))}
        <Button
          icon={EnvelopeIcon}
          isDisabled={true}
          label="Click Me"
          size="lg"
          variant="primary"
        />
      </div>
      <div className="space-x-4">
        {buttonSizes.map((size) => (
          <Button
            key={size}
            addonPosition="start"
            icon={EnvelopeIcon}
            label="Click Me"
            size={size}
            variant="primary"
          />
        ))}
        <Button
          addonPosition="start"
          icon={EnvelopeIcon}
          isDisabled={true}
          label="Click Me"
          size="lg"
          variant="primary"
        />
      </div>
      <div className="space-y-4">
        {buttonSizes.map((size) => (
          <Button
            key={size}
            display="block"
            icon={EnvelopeIcon}
            label="Click Me"
            size={size}
            variant="primary"
          />
        ))}
        <Button
          display="block"
          icon={EnvelopeIcon}
          isDisabled={true}
          label="Click Me"
          size="lg"
          variant="primary"
        />
      </div>
    </div>
  );
}

export function HiddenLabel() {
  return (
    <div className="space-x-4">
      {buttonSizes.map((size) => (
        <Button
          key={size}
          icon={EnvelopeIcon}
          isLabelHidden={true}
          label="Click Me"
          size={size}
          variant="primary"
        />
      ))}
      <Button
        icon={EnvelopeIcon}
        isDisabled={true}
        isLabelHidden={true}
        label="Click Me"
        size="lg"
        variant="primary"
      />
    </div>
  );
}
