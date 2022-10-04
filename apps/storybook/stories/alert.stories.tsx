import { ComponentMeta } from '@storybook/react';
import { Alert, AlertVariant } from '@tih/ui';
import React from 'react';

const alertVariants: ReadonlyArray<AlertVariant> = [
  'info',
  'danger',
  'success',
  'warning',
];

export default {
  title: 'Alert',
  component: Alert,
  argTypes: {
    title: {
      control: 'text',
    },
    variant: {
      options: alertVariants,
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Alert>;

export const Basic = {
  args: {
    title: 'Please pay attention',
    variant: 'info',
    children: 'This is something you should pay your full attention to.',
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
