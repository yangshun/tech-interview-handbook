import clsx from 'clsx';
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

import DropdownMenuItem from './DropdownMenuItem';

export type DropdownMenuAlignment = 'end' | 'start';
export type DropdownMenuSize = 'lg' | 'md' | 'sm';

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

const sizeClasses: Record<DropdownMenuSize, string> = {
  lg: 'px-5 py-2.5',
  md: 'px-4 py-2',
  sm: 'px-2.5 py-1.5',
};

const baseClasses: Record<DropdownMenuSize, string> = {
  lg: 'text-base rounded-xl',
  md: 'text-sm rounded-lg',
  sm: 'text-xs rounded-md',
};

const sizeIconSpacingEndClasses: Record<DropdownMenuSize, string> = {
  lg: 'ml-3 -mr-1',
  md: 'ml-2 -mr-1',
  sm: 'ml-2 -mr-0.5',
};

const sizeIconClasses: Record<DropdownMenuSize, string> = {
  lg: '!h-5 !w-5',
  md: '!h-5 !w-5',
  sm: '!h-4 !w-4',
};

export default function DropdownMenu({
  align = 'start',
  children,
  label,
  size = 'md',
}: Props) {
  return (
    <Menu as="div" className="relative inline-block">
      <div className="flex">
        <Menu.Button
          className={clsx(
            'group inline-flex items-center justify-center whitespace-nowrap border border-slate-300 bg-white font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2',
            baseClasses[size],
            sizeClasses[size],
          )}>
          <div>{label}</div>
          <ChevronDownIcon
            aria-hidden="true"
            className={clsx(
              'flex-shrink-0 text-slate-400 group-hover:text-slate-500',
              sizeIconSpacingEndClasses[size],
              sizeIconClasses[size],
            )}
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
