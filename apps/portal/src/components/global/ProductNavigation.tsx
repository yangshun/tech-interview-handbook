import clsx from 'clsx';
import Link from 'next/link';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

type NavigationItem = Readonly<{
  children?: ReadonlyArray<NavigationItem>;
  href: string;
  name: string;
}>;

export type ProductNavigationItems = ReadonlyArray<NavigationItem>;

type Props = Readonly<{
  items: ProductNavigationItems;
  title: string;
}>;

export default function ProductNavigation({ items, title }: Props) {
  return (
    <nav aria-label="Global" className="flex space-x-8">
      <span className="text-primary-700 text-sm font-medium">{title}</span>
      <div className="hidden space-x-8 md:flex">
        {items.map((item) =>
          item.children != null && item.children.length > 0 ? (
            <Menu key={item.name} as="div" className="relative text-left">
              <Menu.Button className="focus:ring-primary-600 flex items-center rounded-md text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2">
                <span>{item.name}</span>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="ml-1 h-5 w-5 text-slate-500"
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {item.children.map((child) => (
                      <Menu.Item key={child.name}>
                        {({ active }) => (
                          <Link
                            className={clsx(
                              active ? 'bg-slate-100' : '',
                              'block px-4 py-2 text-sm text-slate-700',
                            )}
                            href={child.href}>
                            {child.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <Link
              key={item.name}
              className="hover:text-primary-600 text-sm font-medium text-slate-900"
              href={item.href}>
              {item.name}
            </Link>
          ),
        )}
      </div>
    </nav>
  );
}
