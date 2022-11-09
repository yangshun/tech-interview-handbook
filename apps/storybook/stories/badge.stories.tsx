import React from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  StarIcon,
} from '@heroicons/react/20/solid';
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

export function StartIcon() {
  return (
    <div className="space-x-4">
      <Badge label="Primary" startAddOn={StarIcon} variant="primary" />
      <Badge label="Success" startAddOn={CheckCircleIcon} variant="success" />
      <Badge
        label="Information"
        startAddOn={InformationCircleIcon}
        variant="info"
      />
      <Badge
        label="Warning"
        startAddOn={ExclamationTriangleIcon}
        variant="warning"
      />
      <Badge
        label="Danger"
        startAddOn={ExclamationCircleIcon}
        variant="danger"
      />
    </div>
  );
}

export function EndIcon() {
  return (
    <div className="space-x-4">
      <Badge endAddOn={StarIcon} label="Primary" variant="primary" />
      <Badge endAddOn={CheckCircleIcon} label="Success" variant="success" />
      <Badge
        endAddOn={InformationCircleIcon}
        label="Information"
        variant="info"
      />
      <Badge
        endAddOn={ExclamationTriangleIcon}
        label="Warning"
        variant="warning"
      />
      <Badge endAddOn={ExclamationCircleIcon} label="Danger" variant="danger" />
    </div>
  );
}
