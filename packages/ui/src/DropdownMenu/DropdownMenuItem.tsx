import clsx from 'clsx';
import React from 'react';
import { Menu } from '@headlessui/react';

type Props = Readonly<{
  href?: string;
  isSelected?: boolean;
  label: React.ReactNode;
  onClick: () => void;
}>;

export default function DropdownMenuItem({
  href,
  isSelected = false,
  label,
  onClick,
}: Props) {
  return (
    <Menu.Item>
      {({ active }) => {
        const props = {
          children: label,
          className: clsx(
            isSelected ? 'font-medium text-slate-900' : 'text-slate-500',
            active && 'bg-slate-100',
            'block px-4 py-2 text-sm w-full text-left',
          ),
          onClick,
        };

        if (href == null) {
          return <button type="button" {...props} />;
        }

        // TODO: Change to <Link> when there's a need for client-side navigation.
        return <a href={href} {...props} />;
      }}
    </Menu.Item>
  );
}
