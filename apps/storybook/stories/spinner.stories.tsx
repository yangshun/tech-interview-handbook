import { ComponentMeta } from '@storybook/react';

import { Spinner, SpinnerColor, SpinnerSize, SpinnerDisplay } from '@tih/ui';
import React from 'react';

const spinnerColors: ReadonlyArray<SpinnerColor> = ['default', 'inherit'];
const spinnerDisplays: ReadonlyArray<SpinnerDisplay> = ['block', 'inline'];
const spinnerSizes: ReadonlyArray<SpinnerSize> = ['xs', 'sm', 'md', 'lg'];

export default {
  title: 'Spinner',
  component: Spinner,
  argTypes: {
    color: {
      options: spinnerColors,
      control: { type: 'select' },
    },
    display: {
      options: spinnerDisplays,
      control: { type: 'select' },
    },
    label: {
      control: 'string',
    },
    size: {
      options: spinnerSizes,
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Spinner>;

export const Basic = {
  args: {
    label: 'Loading data',
    size: 'md',
  },
};

export function Size() {
  return (
    <div className="space-x-4">
      {spinnerSizes.map((size) => (
        <Spinner key={size} label="Loading..." size={size} />
      ))}
    </div>
  );
}

export function Display() {
  return (
    <div className="space-y-4">
      {spinnerSizes.map((size) => (
        <Spinner key={size} display="block" label="Loading..." size={size} />
      ))}
    </div>
  );
}
