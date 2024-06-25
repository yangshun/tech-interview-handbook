import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

type Props = Readonly<{
  children: ReactNode;
  defaultOpen?: boolean;
  label: ReactNode;
}>;

export default function Collapsible({ children, defaultOpen, label }: Props) {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button className="-mx-2.5 box-content flex w-full justify-between rounded-lg px-2.5 py-2 text-left text-sm font-medium text-slate-900 hover:bg-slate-100 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
            <ChevronDownIcon
              className={clsx(
                'mr-1 -ml-1 h-5 w-5 text-slate-500',
                open && 'rotate-180 transform',
              )}
            />
            <span className="flex-1">{label}</span>
          </Disclosure.Button>
          <Disclosure.Panel className="w-full pt-1 pb-2 text-sm text-gray-500">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
