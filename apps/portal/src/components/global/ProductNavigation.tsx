import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

type NavigationItem = Readonly<{
  children?: ReadonlyArray<NavigationItem>;
  href: string;
  name: string;
  target?: '_blank';
}>;

export type ProductNavigationItems = ReadonlyArray<NavigationItem>;

type Props = Readonly<{
  items: ProductNavigationItems;
  logo?: React.ReactNode;
  title: string;
  titleHref: string;
}>;

export default function ProductNavigation({
  items,
  logo,
  title,
  titleHref,
}: Props) {
  const router = useRouter();

  return (
    <nav aria-label="Global" className="flex h-full items-center space-x-8">
      <Link
        className="hover:text-primary-700 flex items-center gap-2 text-base font-medium"
        href={titleHref}>
        <div>
          {logo ?? (
            <img
              alt="Tech Interview Handbook"
              className="h-8 w-auto"
              src="/logo.svg"
            />
          )}
        </div>
        {title}
      </Link>
      <div className="hidden h-full items-center space-x-8 md:flex">
        {items.map((item) => {
          const isActive = router.pathname === item.href;
          return item.children != null && item.children.length > 0 ? (
            <Menu key={item.name} as="div" className="relative text-left">
              <Menu.Button className="focus:ring-primary-600 flex items-center rounded-md text-base font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2">
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
                              'block px-4 py-2 text-base text-slate-700',
                            )}
                            href={child.href}
                            rel={
                              !child.href.startsWith('/')
                                ? 'noopener noreferrer'
                                : undefined
                            }
                            target={child.target}>
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
              className={clsx(
                'hover:text-primary-600 inline-flex h-full items-center border-y-2 border-t-transparent text-base text-slate-900',
                isActive ? 'border-b-primary-500' : 'border-b-transparent',
              )}
              href={item.href}
              rel={
                !item.href.startsWith('/') ? 'noopener noreferrer' : undefined
              }
              target={item.target}>
              {item.name}
              {item.target ? (
                <ArrowTopRightOnSquareIcon className="h-5 w-5 pl-1" />
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
