import clsx from 'clsx';
import Link from 'next/link';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { HorizontalDivider } from '~/ui';

import type { GlobalNavigationItems } from './GlobalNavigation';
import type { ProductNavigationItems } from './ProductNavigation';

type Props = Readonly<{
  globalNavigationItems: GlobalNavigationItems;
  isShown?: boolean;
  logo?: React.ReactNode;
  productNavigationItems: ProductNavigationItems;
  productTitle: string;
  setIsShown: (isShown: boolean) => void;
}>;

export default function MobileNavigation({
  globalNavigationItems,
  isShown,
  logo,
  productNavigationItems,
  productTitle,
  setIsShown,
}: Props) {
  return (
    <Transition.Root as={Fragment} show={isShown}>
      <Dialog as="div" className="relative z-20 md:hidden" onClose={setIsShown}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-slate-600 bg-opacity-75" />
        </Transition.Child>
        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full">
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <div className="absolute top-1 right-0 -mr-14 p-1">
                  <button
                    className="flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                    type="button"
                    onClick={() => setIsShown(false)}>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                    <span className="sr-only">Close sidebar</span>
                  </button>
                </div>
              </Transition.Child>
              <div className="flex flex-shrink-0 items-center px-4">
                <Link href="/">
                  {logo ?? (
                    <img
                      alt="Tech Interview Handbook"
                      className="h-8 w-auto"
                      src="/logo.svg"
                    />
                  )}
                </Link>
              </div>
              <div className="mt-5 h-0 flex-1 overflow-y-auto px-2">
                <div className="mb-2 px-3 py-2 font-medium">{productTitle}</div>
                <nav className="flex flex-col">
                  <div className="space-y-1">
                    {productNavigationItems.map((item) => (
                      <a
                        key={item.name}
                        className={clsx(
                          'text-slate-700 hover:bg-slate-100',
                          'group flex items-center rounded-md py-2 px-3 text-sm font-medium',
                        )}
                        href={item.href}>
                        <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                  <div className="px-3">
                    <HorizontalDivider />
                  </div>
                  <div className="mb-2 px-3 py-2 text-sm font-medium">
                    Other Products
                  </div>
                  <div className="space-y-1">
                    {globalNavigationItems.map((item) => (
                      <a
                        key={item.name}
                        className={clsx(
                          'text-slate-700 hover:bg-slate-100',
                          'group flex items-center rounded-md py-2 px-3 text-sm font-medium',
                        )}
                        href={item.href}>
                        <item.icon
                          aria-hidden="true"
                          className={clsx(
                            'text-slate-500 group-hover:text-slate-700',
                            'mr-3 h-6 w-6',
                          )}
                        />
                        <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div aria-hidden="true" className="w-14 flex-shrink-0">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
