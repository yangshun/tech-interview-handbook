import clsx from 'clsx';
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

import DropdownMenuItem from './DropdownMenuItem';

export type DropdownMenuAlignment = 'end' | 'start';
export type DropdownMenuSize = 'default' | 'inherit';

type Props = Readonly<{
  align?: DropdownMenuAlignment;
  children: React.ReactNode; // TODO: Change to strict children.
  label: React.ReactNode;
  size?: DropdownMenuSize;
}>;

DropdownMenu.Item = DropdownMenuItem;

const alignmentClasses: Record<DropdownMenuAlignment, string> = {
  end: 'origin-top-right right-0',
  start: 'origin-top-left left-0',
};

export default function DropdownMenu({
  align = 'start',
  children,
  label,
  size = 'default',
}: Props) {
  return (
    <Menu as="div" className="relative inline-block">
      <div className="flex">
        <Menu.Button
          className={clsx(
            'group inline-flex items-center justify-center font-medium text-slate-700 hover:text-slate-900',
            size === 'default' && 'text-sm',
          )}>
          <div>{label}</div>
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-slate-400 group-hover:text-slate-500"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items
          className={clsx(
            alignmentClasses[align],
            'ring-primary-500 absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-opacity-5 focus:outline-none',
          )}>
          <div className="py-1">{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
