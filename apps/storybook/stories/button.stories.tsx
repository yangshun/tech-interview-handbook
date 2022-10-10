import React from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import type { ComponentMeta } from '@storybook/react';
import type {
  ButtonAddOnPosition,
  ButtonDisplay,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '@tih/ui';
import { Button } from '@tih/ui';

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
  'danger',
  'warning',
  'info',
];

export default {
  argTypes: {
    addonPosition: {
      control: { type: 'select' },
      options: buttonAddOnPositions,
    },
    disabled: {
      control: 'boolean',
    },
    display: {
      control: { type: 'select' },
      options: buttonDisplays,
    },
    isLoading: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    size: {
      control: { type: 'select' },
      options: buttonSizes,
    },
    type: {
      control: { type: 'select' },
      options: buttonTypes,
    },
    variant: {
      control: { type: 'select' },
      options: buttonVariants,
    },
  },
  component: Button,
  title: 'Button',
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
          key={variant}
          disabled={true}
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
            key={variant}
            isLoading={true}
            label="Click Me"
            size="md"
            variant={variant}
          />
        ))}
      </div>
      <div className="space-x-4">
        {buttonVariants.map((variant) => (
          <Button
            key={variant}
            disabled={true}
            isLoading={true}
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
          disabled={true}
          icon={EnvelopeIcon}
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
          disabled={true}
          icon={EnvelopeIcon}
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
          disabled={true}
          display="block"
          icon={EnvelopeIcon}
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
        disabled={true}
        icon={EnvelopeIcon}
        isLabelHidden={true}
        label="Click Me"
        size="lg"
        variant="primary"
      />
    </div>
  );
}
