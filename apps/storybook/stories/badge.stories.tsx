import React from 'react';
import type { ComponentMeta } from '@storybook/react';
import type { BadgeVariant } from '@tih/ui';
import { Badge } from '@tih/ui';

const badgeVariants: ReadonlyArray<BadgeVariant> = [
  'primary',
  'info',
  'danger',
  'success',
  'warning',
];

export default {
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: badgeVariants,
    },
  },
  component: Badge,
  title: 'Badge',
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
