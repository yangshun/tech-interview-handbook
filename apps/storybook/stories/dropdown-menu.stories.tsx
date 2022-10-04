import { ComponentMeta } from '@storybook/react';
import { DropdownMenu, DropdownMenuAlignment, DropdownMenuSize } from '@tih/ui';
import React, { useState } from 'react';

const DropdownMenuAlignments: ReadonlyArray<DropdownMenuAlignment> = [
  'start',
  'end',
];
const DropdownMenuSizes: ReadonlyArray<DropdownMenuSize> = [
  'inherit',
  'regular',
];

export default {
  title: 'DropdownMenu',
  component: DropdownMenu,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 300,
    },
  },
  argTypes: {
    align: {
      options: DropdownMenuAlignments,
      control: { type: 'select' },
    },
    label: {
      control: 'text',
    },
    size: {
      options: DropdownMenuSizes,
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof DropdownMenu>;

export function Basic({ align, label, size }) {
  const menuItems = [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Banana',
      value: 'banana',
    },
    {
      label: 'Orange',
      value: 'orange',
    },
  ];

  const [selectedValue, setSelectedValue] = useState('apple');

  return (
    <DropdownMenu align={align} label={label} size={size}>
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
  );
}

Basic.args = {
  align: 'start',
  label: 'Select fruitzz',
  size: 'regular',
};

export function Align() {
  const menuItems = [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Banana',
      value: 'banana',
    },
    {
      label: 'Orange',
      value: 'orange',
    },
  ];

  const [selectedValue, setSelectedValue] = useState('apple');

  return (
    <div className="flex justify-between">
      <DropdownMenu align="start" label="Select fruit" size="regular">
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
      <DropdownMenu align="end" label="Select fruit" size="regular">
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
