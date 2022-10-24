import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import {
  MagnifyingGlassIcon,
  NewspaperIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  CheckboxInput,
  CheckboxList,
  DropdownMenu,
  Pagination,
  Spinner,
  Tabs,
  TextInput,
} from '@tih/ui';

import ResumeFilterPill from '~/components/resumes/browse/ResumeFilterPill';
import type {
  Filter,
  FilterId,
  Shortcut,
} from '~/components/resumes/browse/resumeFilters';
import {
  BROWSE_TABS_VALUES,
  EXPERIENCES,
  INITIAL_FILTER_STATE,
  isInitialFilterState,
  LOCATIONS,
  ROLES,
  SHORTCUTS,
  SORT_OPTIONS,
} from '~/components/resumes/browse/resumeFilters';
import ResumeListItems from '~/components/resumes/browse/ResumeListItems';
import ResumeSignInButton from '~/components/resumes/shared/ResumeSignInButton';

import useDebounceValue from '~/utils/resumes/useDebounceValue';
import { trpc } from '~/utils/trpc';

import type { FilterState } from '../../components/resumes/browse/resumeFilters';

const STALE_TIME = 5 * 60 * 1000;
const DEBOUNCE_DELAY = 800;
const PAGE_LIMIT = 10;
const filters: Array<Filter> = [
  {
    id: 'role',
    label: 'Role',
    options: ROLES,
  },
  {
    id: 'experience',
    label: 'Experience',
    options: EXPERIENCES,
  },
  {
    id: 'location',
    label: 'Location',
    options: LOCATIONS,
  },
];

const getLoggedOutText = (tabsValue: string) => {
  switch (tabsValue) {
    case BROWSE_TABS_VALUES.STARRED:
      return 'to view starred resumes!';
    case BROWSE_TABS_VALUES.MY:
      return 'to view your submitted resumes!';
    default:
      return '';
  }
};

const getEmptyDataText = (
  tabsValue: string,
  searchValue: string,
  userFilters: FilterState,
) => {
  if (searchValue.length > 0) {
    return 'Try tweaking your search text to see more resumes.';
  }
  if (!isInitialFilterState(userFilters)) {
    return 'Try tweaking your filters to see more resumes.';
  }
  switch (tabsValue) {
    case BROWSE_TABS_VALUES.ALL:
      return 'Looks like SWEs are feeling lucky!';
    case BROWSE_TABS_VALUES.STARRED:
      return 'You have not starred any resumes. Star one to see it here!';
    case BROWSE_TABS_VALUES.MY:
      return 'Upload a resume to see it here!';
    default:
      return '';
  }
};

export default function ResumeHomePage() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const [tabsValue, setTabsValue] = useState(BROWSE_TABS_VALUES.ALL);
  const [sortOrder, setSortOrder] = useState('latest');
  const [searchValue, setSearchValue] = useState('');
  const [userFilters, setUserFilters] = useState(INITIAL_FILTER_STATE);
  const [shortcutSelected, setShortcutSelected] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const skip = (currentPage - 1) * PAGE_LIMIT;

  useEffect(() => {
    setCurrentPage(1);
  }, [userFilters, sortOrder, searchValue]);

  const allResumesQuery = trpc.useQuery(
    [
      'resumes.resume.findAll',
      {
        experienceFilters: userFilters.experience,
        locationFilters: userFilters.location,
        numComments: userFilters.numComments,
        roleFilters: userFilters.role,
        searchValue: useDebounceValue(searchValue, DEBOUNCE_DELAY),
        skip,
        sortOrder,
        take: PAGE_LIMIT,
      },
    ],
    {
      enabled: tabsValue === BROWSE_TABS_VALUES.ALL,
      staleTime: STALE_TIME,
    },
  );
  const starredResumesQuery = trpc.useQuery(
    [
      'resumes.resume.user.findUserStarred',
      {
        experienceFilters: userFilters.experience,
        locationFilters: userFilters.location,
        numComments: userFilters.numComments,
        roleFilters: userFilters.role,
        searchValue: useDebounceValue(searchValue, DEBOUNCE_DELAY),
        skip,
        sortOrder,
        take: PAGE_LIMIT,
      },
    ],
    {
      enabled: tabsValue === BROWSE_TABS_VALUES.STARRED,
      retry: false,
      staleTime: STALE_TIME,
    },
  );
  const myResumesQuery = trpc.useQuery(
    [
      'resumes.resume.user.findUserCreated',
      {
        experienceFilters: userFilters.experience,
        locationFilters: userFilters.location,
        numComments: userFilters.numComments,
        roleFilters: userFilters.role,
        searchValue: useDebounceValue(searchValue, DEBOUNCE_DELAY),
        skip,
        sortOrder,
        take: PAGE_LIMIT,
      },
    ],
    {
      enabled: tabsValue === BROWSE_TABS_VALUES.MY,
      retry: false,
      staleTime: STALE_TIME,
    },
  );

  const onSubmitResume = () => {
    if (sessionData === null) {
      router.push('/api/auth/signin');
    } else {
      router.push('/resumes/submit');
    }
  };

  const onFilterCheckboxChange = (
    isChecked: boolean,
    filterSection: FilterId,
    filterValue: string,
  ) => {
    if (isChecked) {
      setUserFilters({
        ...userFilters,
        [filterSection]: [...userFilters[filterSection], filterValue],
      });
    } else {
      setUserFilters({
        ...userFilters,
        [filterSection]: userFilters[filterSection].filter(
          (value) => value !== filterValue,
        ),
      });
    }
  };

  const onShortcutChange = ({
    sortOrder: shortcutSortOrder,
    filters: shortcutFilters,
    name: shortcutName,
  }: Shortcut) => {
    setShortcutSelected(shortcutName);
    setSortOrder(shortcutSortOrder);
    setUserFilters(shortcutFilters);
  };

  const onTabChange = (tab: string) => {
    setTabsValue(tab);
    setCurrentPage(1);
  };

  const getTabQueryData = () => {
    switch (tabsValue) {
      case BROWSE_TABS_VALUES.ALL:
        return allResumesQuery.data;
      case BROWSE_TABS_VALUES.STARRED:
        return starredResumesQuery.data;
      case BROWSE_TABS_VALUES.MY:
        return myResumesQuery.data;
      default:
        return null;
    }
  };

  const getTabResumes = () => {
    return getTabQueryData()?.mappedResumeData ?? [];
  };

  const getTabTotalPages = () => {
    const numRecords = getTabQueryData()?.totalRecords ?? 0;
    return numRecords % PAGE_LIMIT === 0
      ? numRecords / PAGE_LIMIT
      : Math.floor(numRecords / PAGE_LIMIT) + 1;
  };

  const isFetchingResumes =
    allResumesQuery.isFetching ||
    starredResumesQuery.isFetching ||
    myResumesQuery.isFetching;

  return (
    <>
      <Head>
        <title>Resume Review Portal</title>
      </Head>

      {/* Mobile Filters */}
      <div>
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
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-scroll bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-slate-900">
                      Shortcuts
                    </h2>
                    <button
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-slate-400"
                      type="button"
                      onClick={() => setMobileFiltersOpen(false)}>
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>

                  <form className="mt-4 border-t border-slate-200">
                    <ul
                      className="flex flex-wrap justify-start gap-4 px-4 py-3 font-medium text-slate-900"
                      role="list">
                      {SHORTCUTS.map((shortcut) => (
                        <li key={shortcut.name}>
                          <ResumeFilterPill
                            isSelected={shortcutSelected === shortcut.name}
                            title={shortcut.name}
                            onClick={() => onShortcutChange(shortcut)}
                          />
                        </li>
                      ))}
                    </ul>

                    {filters.map((filter) => (
                      <Disclosure
                        key={filter.id}
                        as="div"
                        className="border-t border-slate-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-slate-400 hover:text-slate-500">
                                <span className="font-medium text-slate-900">
                                  {filter.label}
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
                                {filter.options.map((option) => (
                                  <div
                                    key={option.value}
                                    className="[&>div>div:nth-child(1)>input]:text-primary-600 [&>div>div:nth-child(1)>input]:ring-primary-500 [&>div>div:nth-child(2)>label]:font-normal">
                                    <CheckboxInput
                                      label={option.label}
                                      value={userFilters[filter.id].includes(
                                        option.value,
                                      )}
                                      onChange={(isChecked) =>
                                        onFilterCheckboxChange(
                                          isChecked,
                                          filter.id,
                                          option.value,
                                        )
                                      }
                                    />
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
      </div>

      <main className="h-[calc(100vh-4rem)] flex-auto px-8 pb-4">
        <div className="flex justify-start">
          <div className="fixed top-0 bottom-0 mt-24 hidden w-64 overflow-auto lg:block">
            <h3 className="text-md font-medium tracking-tight text-gray-900">
              Shortcuts
            </h3>
            <div className="w-100 pt-4 sm:pr-0 md:pr-4">
              <form>
                <ul
                  className="flex w-11/12 flex-wrap justify-start gap-2 pb-6 text-sm font-medium text-slate-900"
                  role="list">
                  {SHORTCUTS.map((shortcut) => (
                    <li key={shortcut.name}>
                      <ResumeFilterPill
                        isSelected={shortcutSelected === shortcut.name}
                        title={shortcut.name}
                        onClick={() => onShortcutChange(shortcut)}
                      />
                    </li>
                  ))}
                </ul>
                <h3 className="text-md font-medium tracking-tight text-slate-900">
                  Explore these filters
                </h3>
                {filters.map((filter) => (
                  <Disclosure
                    key={filter.id}
                    as="div"
                    className="border-b border-slate-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-slate-400 hover:text-slate-500">
                            <span className="font-medium text-slate-900">
                              {filter.label}
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
                        <Disclosure.Panel className="pt-4">
                          <CheckboxList
                            description=""
                            isLabelHidden={true}
                            label=""
                            orientation="vertical">
                            {filter.options.map((option) => (
                              <div
                                key={option.value}
                                className="[&>div>div:nth-child(1)>input]:text-primary-600 [&>div>div:nth-child(1)>input]:ring-primary-500 [&>div>div:nth-child(2)>label]:font-normal">
                                <CheckboxInput
                                  label={option.label}
                                  value={userFilters[filter.id].includes(
                                    option.value,
                                  )}
                                  onChange={(isChecked) =>
                                    onFilterCheckboxChange(
                                      isChecked,
                                      filter.id,
                                      option.value,
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </CheckboxList>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </div>
          </div>
          <div className="relative lg:left-64 lg:w-[calc(100%-16rem)]">
            <div className="lg:border-grey-200 sticky top-0 z-10 flex flex-wrap items-center justify-between bg-gray-50 pt-6 pb-2 lg:border-b">
              <div className="border-grey-200 mb-4 flex w-full justify-between border-b pb-2 lg:mb-0 lg:w-auto lg:border-none lg:pb-0">
                <div>
                  <Tabs
                    label="Resume Browse Tabs"
                    tabs={[
                      {
                        label: 'All Resumes',
                        value: BROWSE_TABS_VALUES.ALL,
                      },
                      {
                        label: 'Starred Resumes',
                        value: BROWSE_TABS_VALUES.STARRED,
                      },
                      {
                        label: 'My Resumes',
                        value: BROWSE_TABS_VALUES.MY,
                      },
                    ]}
                    value={tabsValue}
                    onChange={onTabChange}
                  />
                </div>
                <div>
                  <button
                    className="bg-primary-500 ml-4 rounded-md py-2 px-3 text-sm font-medium text-white lg:hidden"
                    type="button"
                    onClick={onSubmitResume}>
                    Submit Resume
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-start gap-8">
                <div className="w-64">
                  <TextInput
                    isLabelHidden={true}
                    label="search"
                    placeholder="Search Resumes"
                    startAddOn={MagnifyingGlassIcon}
                    startAddOnType="icon"
                    type="text"
                    value={searchValue}
                    onChange={setSearchValue}
                  />
                </div>
                <div>
                  <DropdownMenu align="end" label={SORT_OPTIONS[sortOrder]}>
                    {Object.entries(SORT_OPTIONS).map(([key, value]) => (
                      <DropdownMenu.Item
                        key={key}
                        isSelected={sortOrder === key}
                        label={value}
                        onClick={() => setSortOrder(key)}></DropdownMenu.Item>
                    ))}
                  </DropdownMenu>
                </div>
                <button
                  className="-m-2 text-slate-400 hover:text-slate-500 lg:hidden"
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}>
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="h-6 w-6" />
                </button>
                <div>
                  <button
                    className="bg-primary-500 hidden w-36 rounded-md py-2 px-3 text-sm font-medium text-white lg:block"
                    type="button"
                    onClick={onSubmitResume}>
                    Submit Resume
                  </button>
                </div>
              </div>
            </div>
            {isFetchingResumes ? (
              <div className="w-full pt-4">
                {' '}
                <Spinner display="block" size="lg" />{' '}
              </div>
            ) : sessionData === null && tabsValue !== BROWSE_TABS_VALUES.ALL ? (
              <ResumeSignInButton
                className="mt-8"
                text={getLoggedOutText(tabsValue)}
              />
            ) : getTabResumes().length === 0 ? (
              <div className="mt-24 flex flex-wrap justify-center">
                <NewspaperIcon
                  className="mb-12 basis-full"
                  height={196}
                  width={196}
                />
                {getEmptyDataText(tabsValue, searchValue, userFilters)}
              </div>
            ) : (
              <div className="h-[calc(100vh-9rem)] pb-10 lg:h-[calc(100vh-6rem)]">
                <div className="h-[85%] overflow-y-auto">
                  <div>
                    <ResumeListItems resumes={getTabResumes()} />
                  </div>
                </div>
                <div className="flex h-[15%] items-center justify-center">
                  {getTabTotalPages() > 1 && (
                    <div>
                      <Pagination
                        current={currentPage}
                        end={getTabTotalPages()}
                        label="pagination"
                        start={1}
                        onSelect={(page) => setCurrentPage(page)}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
