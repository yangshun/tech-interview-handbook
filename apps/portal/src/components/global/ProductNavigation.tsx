import clsx from 'clsx';
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
    <nav aria-label="Global" className="flex space-x-10">
      <span className="text-primary-700 text-sm font-medium">{title}</span>
      {items.map((item) =>
        item.children != null && item.children.length > 0 ? (
          <Menu key={item.name} as="div" className="relative text-left">
            <Menu.Button className="focus:ring-primary-600 flex items-center rounded-md text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2">
              <span>{item.name}</span>
              <ChevronDownIcon
                aria-hidden="true"
                className="ml-1 h-5 w-5 text-gray-500"
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
                        <a
                          className={clsx(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700',
                          )}
                          href={child.href}>
                          {child.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <a
            key={item.name}
            className="text-sm font-medium text-gray-900"
            href={item.href}>
            {item.name}
          </a>
        ),
      )}
    </nav>
  );
}
