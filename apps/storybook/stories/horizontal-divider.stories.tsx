import React from 'react';
import type { ComponentMeta } from '@storybook/react';
import { HorizontalDivider } from '@tih/ui';

export default {
  argTypes: {},
  component: HorizontalDivider,
  title: 'HorizontalDivider',
} as ComponentMeta<typeof HorizontalDivider>;

export function Basic() {
  return (
    <div>
      <p className="text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <HorizontalDivider />
      <p className="text-sm">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
  );
}
