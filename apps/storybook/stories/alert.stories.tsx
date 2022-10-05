import React from 'react';
import type { ComponentMeta } from '@storybook/react';
import type { AlertVariant } from '@tih/ui';
import { Alert } from '@tih/ui';

const alertVariants: ReadonlyArray<AlertVariant> = [
  'info',
  'danger',
  'success',
  'warning',
];

export default {
  argTypes: {
    title: {
      control: 'text',
    },
    variant: {
      control: { type: 'select' },
      options: alertVariants,
    },
  },
  component: Alert,
  title: 'Alert',
} as ComponentMeta<typeof Alert>;

export const Basic = {
  args: {
    children: 'This is something you should pay your full attention to.',
    title: 'Please pay attention',
    variant: 'info',
  },
};

export function Variants() {
  return (
    <div className="space-y-4">
      <Alert title="Order completed" variant="success">
        Your order has been placed! Please check your email for the
        confirmation.
      </Alert>
      <Alert title="Update available" variant="info">
        A new software update is available. See what's new in version 2.0.4.
      </Alert>
      <Alert title="Warning!" variant="warning">
        Doing that are not advisable, you are recommended to stay away from such
        practices.
      </Alert>
      <Alert title="Errors submitting" variant="danger">
        Please try again later, or close it and forget about it.
      </Alert>
    </div>
  );
}
