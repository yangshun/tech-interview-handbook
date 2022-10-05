import React from 'react';
import type { ComponentMeta } from '@storybook/react';
import type { SpinnerColor, SpinnerDisplay,SpinnerSize } from '@tih/ui';
import { Spinner } from '@tih/ui';

const spinnerColors: ReadonlyArray<SpinnerColor> = ['default', 'inherit'];
const spinnerDisplays: ReadonlyArray<SpinnerDisplay> = ['block', 'inline'];
const spinnerSizes: ReadonlyArray<SpinnerSize> = ['xs', 'sm', 'md', 'lg'];

export default {
  argTypes: {
    color: {
      control: { type: 'select' },
      options: spinnerColors,
    },
    display: {
      control: { type: 'select' },
      options: spinnerDisplays,
    },
    label: {
      control: 'text',
    },
    size: {
      control: { type: 'select' },
      options: spinnerSizes,
    },
  },
  component: Spinner,
  title: 'Spinner',
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
