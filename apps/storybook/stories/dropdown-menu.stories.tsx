import React, { useState } from 'react';
import type { ComponentMeta } from '@storybook/react';
import type { DropdownMenuAlignment, DropdownMenuSize } from '@tih/ui';
import { DropdownMenu } from '@tih/ui';

const DropdownMenuAlignments: ReadonlyArray<DropdownMenuAlignment> = [
  'start',
  'end',
];
const DropdownMenuSizes: ReadonlyArray<DropdownMenuSize> = ['sm', 'md', 'lg'];

export default {
  argTypes: {
    align: {
      control: { type: 'select' },
      options: DropdownMenuAlignments,
    },
    label: {
      control: 'text',
    },
    size: {
      control: { type: 'select' },
      options: DropdownMenuSizes,
    },
  },
  component: DropdownMenu,
  parameters: {
    docs: {
      iframeHeight: 300,
      inlineStories: false,
    },
  },
  title: 'DropdownMenu',
} as ComponentMeta<typeof DropdownMenu>;

export function Basic({
  align,
  label,
  size,
}: Pick<
  React.ComponentProps<typeof DropdownMenu>,
  'align' | 'label' | 'size'
>) {
  const menuItems = [
    {
      label: 'Profile',
      value: 'profile',
    },
    {
      label: 'Settings',
      value: 'settings',
    },
    {
      label: 'Sign Out',
      value: 'sign-out',
    },
  ];

  const [selectedValue, setSelectedValue] = useState('apple');

  return (
    <DropdownMenu align={align} label={label} size={size}>
      {menuItems.map(({ label: itemLabel, value }) => (
        <DropdownMenu.Item
          key={value}
          isSelected={value === selectedValue}
          label={itemLabel}
          onClick={() => {
            setSelectedValue(value);
          }}
        />
      ))}
    </DropdownMenu>
  );
}

Basic.args = {
  align: 'start',
  label: 'More actions',
  size: 'md',
};

export function Align() {
  const menuItems = [
    {
      label: 'Profile',
      value: 'profile',
    },
    {
      label: 'Settings',
      value: 'settings',
    },
    {
      label: 'Sign Out',
      value: 'sign-out',
    },
  ];

  const [selectedValue, setSelectedValue] = useState('apple');

  return (
    <div className="flex justify-between">
      <DropdownMenu align="start" label="Select an action" size="md">
        {menuItems.map(({ label, value }) => (
          <DropdownMenu.Item
            key={value}
            isSelected={value === selectedValue}
            label={label}
            onClick={() => {
              setSelectedValue(value);
            }}
          />
        ))}
      </DropdownMenu>
      <DropdownMenu align="end" label="Select an action" size="md">
        {menuItems.map(({ label, value }) => (
          <DropdownMenu.Item
            key={value}
            isSelected={value === selectedValue}
            label={label}
            onClick={() => {
              setSelectedValue(value);
            }}
          />
        ))}
      </DropdownMenu>
    </div>
  );
}
