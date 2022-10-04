import { ComponentMeta } from '@storybook/react';
import { Badge, BadgeVariant } from '@tih/ui';
import React from 'react';

const badgeVariants: ReadonlyArray<BadgeVariant> = [
  'primary',
  'info',
  'danger',
  'success',
  'warning',
];

export default {
  title: 'Badge',
  component: Badge,
  argTypes: {
    variant: {
      options: badgeVariants,
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Badge>;

export const Basic = {
  args: {
    label: 'Hello',
    variant: 'primary',
  },
};

export function Variants() {
  return (
    <div className="space-x-4">
      <Badge label="Primary" variant="primary" />
      <Badge label="Success" variant="success" />
      <Badge label="Information" variant="info" />
      <Badge label="Warning" variant="warning" />
      <Badge label="Danger" variant="danger" />
    </div>
  );
}
