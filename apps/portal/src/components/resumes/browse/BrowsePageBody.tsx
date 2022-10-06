import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Tabs } from '@tih/ui';

import BrowseListItem from './BrowseListItem';
import {
  EXPERIENCE,
  LOCATION,
  ROLES,
  SORT_OPTIONS,
  TEST_RESUMES,
  TOP_HITS,
} from './constants';
import FilterPill from './FilterPill';

const filters = [
  {
    id: 'roles',
    name: 'Roles',
    options: ROLES,
  },
  {
    id: 'experience',
    name: 'Experience',
    options: EXPERIENCE,
  },
  {
    id: 'location',
    name: 'Location',
    options: LOCATION,
  },
];

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ');
}

export default function BrowsePageBody() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [tabsValue, setTabsValue] = useState('all');
  return (
    <div className="w-screen sm:px-4 md:px-8">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root as={Fragment} show={mobileFiltersOpen}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400"
                      type="button"
                      onClick={() => setMobileFiltersOpen(false)}>
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      className="px-2 py-3 font-medium text-gray-900"
                      role="list">
                      {TOP_HITS.map((category) => (
                        <li key={category.name}>
                          <a className="block px-2 py-3" href={category.href}>
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure
                        key={section.id}
                        as="div"
                        className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      aria-hidden="true"
                                      className="h-5 w-5"
                                    />
                                  ) : (
                                    <PlusIcon
                                      aria-hidden="true"
                                      className="h-5 w-5"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center">
                                    <input
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      defaultChecked={option.checked}
                                      defaultValue={option.value}
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      type="checkbox"
                                    />
                                    <label
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}>
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="w-full">
          <div className="flex items-start justify-between gap-3">
            <div className="w-100 pt-4 sm:pr-0 md:pr-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <h1 className="mb-4 tracking-tight text-gray-900">Filters</h1>
                <ul
                  className="flex flex-wrap justify-start gap-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                  role="list">
                  {TOP_HITS.map((category) => (
                    <li key={category.name}>
                      {/* TODO: Replace onSelect with filtering function */}
                      <FilterPill title={category.name} onClick={() => true} />
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  aria-hidden="true"
                                  className="h-5 w-5"
                                />
                              ) : (
                                <PlusIcon
                                  aria-hidden="true"
                                  className="h-5 w-5"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center">
                                <input
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  defaultChecked={option.checked}
                                  defaultValue={option.value}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                />
                                <label
                                  className="ml-3 text-sm text-gray-600"
                                  htmlFor={`filter-${section.id}-${optionIdx}`}>
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </div>
            <div className="w-full">
              <Tabs
                label="Resume Browse Tabs"
                tabs={[
                  {
                    label: 'All Resumes',
                    value: 'all',
                  },
                  {
                    label: 'Starred Resumes',
                    value: 'starred',
                  },
                  {
                    label: 'My Resumes',
                    value: 'my',
                  },
                ]}
                value={tabsValue}
                onChange={setTabsValue}
              />
              <ul role="list">
                {TEST_RESUMES.map((resumeObj) => (
                  <li key={resumeObj.title}>
                    <BrowseListItem href="#" resumeInfo={resumeObj} />
                  </li>
                ))}
              </ul>
            </div>

            <Menu as="div" className="relative inline-block pt-4 text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {SORT_OPTIONS.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            className={classNames(
                              option.current
                                ? 'font-medium text-gray-900'
                                : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm',
                            )}
                            href={option.href}>
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <div className="flex self-start pt-4">
              <button
                className="text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                type="button"
                onClick={() => setMobileFiltersOpen(true)}>
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
