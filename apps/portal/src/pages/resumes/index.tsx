import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import {
  MagnifyingGlassIcon,
  NewspaperIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import type { TypeaheadOption } from '~/ui';
import {
  Button,
  CheckboxInput,
  CheckboxList,
  DropdownMenu,
  Pagination,
  Spinner,
  Tabs,
  TextInput,
} from '~/ui';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';
import ResumeFilterPill from '~/components/resumes/browse/ResumeFilterPill';
import ResumeListItems from '~/components/resumes/browse/ResumeListItems';
import ResumeExperienceTypeahead from '~/components/resumes/shared/ResumeExperienceTypeahead';
import ResumeSignInButton from '~/components/resumes/shared/ResumeSignInButton';
import CountriesTypeahead from '~/components/shared/CountriesTypeahead';
import loginPageHref from '~/components/shared/loginPageHref';

import type { Filter, FilterId, Shortcut } from '~/utils/resumes/resumeFilters';
import type { SortOrder } from '~/utils/resumes/resumeFilters';
import {
  BROWSE_TABS_VALUES,
  getFilterLabel,
  INITIAL_FILTER_STATE,
  SHORTCUTS,
  SORT_OPTIONS,
} from '~/utils/resumes/resumeFilters';
import useDebounceValue from '~/utils/resumes/useDebounceValue';
import useSearchParams from '~/utils/resumes/useSearchParams';
import { trpc } from '~/utils/trpc';

import JobTitlesTypeahead from '../../components/shared/JobTitlesTypeahead';

const STALE_TIME = 5 * 60 * 1000;
const DEBOUNCE_DELAY = 800;
const PAGE_LIMIT = 10;
const filters: Array<Filter> = [
  {
    id: 'role',
    label: 'Role',
  },
  {
    id: 'experience',
    label: 'Experience',
  },
  {
    id: 'location',
    label: 'Location',
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

const getEmptyDataText = (tabsValue: string, searchValue: string) => {
  if (searchValue.length > 0) {
    return 'Try tweaking your search text to see more resumes.';
  }

  switch (tabsValue) {
    case BROWSE_TABS_VALUES.ALL:
      return 'Oops, there is no resumes to see here. Maybe try tweaking your filters to see more.';
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
  const [tabsValue, setTabsValue, isTabsValueInit] = useSearchParams(
    'tabsValue',
    BROWSE_TABS_VALUES.ALL,
  );
  const [sortOrder, setSortOrder, isSortOrderInit] = useSearchParams<SortOrder>(
    'sortOrder',
    'latest',
  );
  const [searchValue, setSearchValue, isSearchValueInit] = useSearchParams(
    'searchValue',
    '',
  );
  const [shortcutSelected, setShortcutSelected, isShortcutInit] =
    useSearchParams('shortcutSelected', 'General');
  const [currentPage, setCurrentPage, isCurrentPageInit] = useSearchParams(
    'currentPage',
    1,
  );
  const [userFilters, setUserFilters, isUserFiltersInit] = useSearchParams(
    'userFilters',
    INITIAL_FILTER_STATE,
  );
  const [isFiltersOpen, setIsFiltersOpen, isFiltersOpenInit] = useSearchParams<
    Record<FilterId, boolean>
  >('isFiltersOpen', {
    experience: false,
    location: false,
    role: false,
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { event: gaEvent } = useGoogleAnalytics();

  const skip = (currentPage - 1) * PAGE_LIMIT;
  const isSearchOptionsInit = useMemo(() => {
    return (
      isTabsValueInit &&
      isSortOrderInit &&
      isSearchValueInit &&
      isShortcutInit &&
      isCurrentPageInit &&
      isUserFiltersInit &&
      isFiltersOpenInit
    );
  }, [
    isTabsValueInit,
    isSortOrderInit,
    isSearchValueInit,
    isShortcutInit,
    isCurrentPageInit,
    isUserFiltersInit,
    isFiltersOpenInit,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [userFilters, sortOrder, setCurrentPage, searchValue]);

  useEffect(() => {
    // Router.replace used instead of router.replace to avoid
    // the page reloading itself since the router.replace
    // callback changes on every page load
    if (!isSearchOptionsInit) {
      return;
    }

    Router.replace({
      pathname: router.pathname,
      query: {
        currentPage: JSON.stringify(currentPage),
        isFiltersOpen: JSON.stringify(isFiltersOpen),
        searchValue: JSON.stringify(searchValue),
        shortcutSelected: JSON.stringify(shortcutSelected),
        sortOrder: JSON.stringify(sortOrder),
        tabsValue: JSON.stringify(tabsValue),
        userFilters: JSON.stringify(userFilters),
      },
    });
  }, [
    tabsValue,
    sortOrder,
    searchValue,
    userFilters,
    shortcutSelected,
    currentPage,
    router.pathname,
    isSearchOptionsInit,
    isFiltersOpen,
  ]);

  const allResumesQuery = trpc.useQuery(
    [
      'resumes.resume.findAll',
      {
        experienceFilters: userFilters.experience.map(({ value }) => value),
        isTop10: userFilters.isTop10,
        isUnreviewed: userFilters.isUnreviewed,
        locationFilters: userFilters.location.map(({ value }) => value),
        roleFilters: userFilters.role.map(({ value }) => value),
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
        experienceFilters: userFilters.experience.map(({ value }) => value),
        isTop10: userFilters.isTop10,
        isUnreviewed: userFilters.isUnreviewed,
        locationFilters: userFilters.location.map(({ value }) => value),
        roleFilters: userFilters.role.map(({ value }) => value),
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
        experienceFilters: userFilters.experience.map(({ value }) => value),
        isTop10: userFilters.isTop10,
        isUnreviewed: userFilters.isUnreviewed,
        locationFilters: userFilters.location.map(({ value }) => value),
        roleFilters: userFilters.role.map(({ value }) => value),
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
      router.push(loginPageHref());
    } else {
      router.push('/resumes/submit');
    }
  };

  const onClearFilterClick = (filterSection: FilterId) => {
    setUserFilters({
      ...userFilters,
      [filterSection]: [],
    });
  };

  const onShortcutChange = ({
    sortOrder: shortcutSortOrder,
    filters: shortcutFilters,
    name: shortcutName,
  }: Shortcut) => {
    setShortcutSelected(shortcutName);
    setSortOrder(shortcutSortOrder);
    setUserFilters(shortcutFilters);
    gaEvent({
      action: 'resumes.shortcut_button_click',
      category: 'engagement',
      label: `Select Shortcut: ${shortcutName}`,
    });
  };

  const onTabChange = (tab: string) => {
    setTabsValue(tab);
    setCurrentPage(1);
    gaEvent({
      action: 'resumes.tab_click',
      category: 'engagement',
      label: `Select Tab: ${tab}`,
    });
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

  const getTabFilterCounts = () => {
    return getTabQueryData()?.filterCounts;
  };

  const getFilterTypeahead = (filterId: FilterId) => {
    const onSelect = (option: TypeaheadOption | null) => {
      if (option === null) {
        return;
      }
      setUserFilters({
        ...userFilters,
        [filterId]: [...userFilters[filterId], option],
      });
      gaEvent({
        action: 'resumes.filter_typeahead_click',
        category: 'engagement',
        label: 'Select Filter',
      });
    };

    switch (filterId) {
      case 'experience':
        return (
          <ResumeExperienceTypeahead
            isLabelHidden={true}
            placeholder="Select experiences"
            selectedValues={
              new Set(userFilters[filterId].map(({ value }) => value))
            }
            onSelect={onSelect}
          />
        );
      case 'location':
        return (
          <CountriesTypeahead
            excludedValues={
              new Set(userFilters[filterId].map(({ value }) => value))
            }
            isLabelHidden={true}
            label="Location"
            placeholder="Select countries"
            onSelect={onSelect}
          />
        );
      case 'role':
        return (
          <JobTitlesTypeahead
            excludedValues={
              new Set(userFilters[filterId].map(({ value }) => value))
            }
            isLabelHidden={true}
            label="Role"
            noResultsMessage="No available roles."
            placeholder="Select roles"
            onSelect={onSelect}
          />
        );
      default:
        return null;
    }
  };

  const getFilterCount = (filterId: FilterId, value: string) => {
    const filterCountsData = getTabFilterCounts();
    if (
      filterCountsData === undefined ||
      filterCountsData[filterId] === undefined ||
      filterCountsData[filterId][value] === undefined
    ) {
      return 0;
    }
    return filterCountsData[filterId][value];
  };

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
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-slate-900">
                      Quick access
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
                      className="flex w-11/12 flex-wrap justify-start gap-2 px-4 py-4 font-medium text-slate-900"
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
                        className="border-t border-slate-200 px-4 pt-6 pb-4"
                        defaultOpen={isFiltersOpen[filter.id]}>
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button
                                className="flex w-full items-center justify-between bg-white px-2 py-3 text-slate-400 hover:text-slate-500"
                                onClick={() =>
                                  setIsFiltersOpen({
                                    ...isFiltersOpen,
                                    [filter.id]: !isFiltersOpen[filter.id],
                                  })
                                }>
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
                            <Disclosure.Panel className="space-y-4 pt-6">
                              <div className="space-y-3">
                                {getFilterTypeahead(filter.id)}
                                {userFilters[filter.id].map((option) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center px-1 text-sm">
                                    <CheckboxInput
                                      label={option.label}
                                      value={true}
                                      onChange={() =>
                                        setUserFilters({
                                          ...userFilters,
                                          [filter.id]: userFilters[
                                            filter.id
                                          ].filter(
                                            ({ value }) =>
                                              value !== option.value,
                                          ),
                                        })
                                      }
                                    />
                                    <span className="ml-1 text-slate-500">
                                      ({getFilterCount(filter.id, option.value)}
                                      )
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <p
                                className="inline-block cursor-pointer text-sm text-slate-500 underline hover:text-slate-700"
                                onClick={() => onClearFilterClick(filter.id)}>
                                Clear
                              </p>
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

      <main className="h-full flex-auto px-8 pb-4">
        <div className="flex justify-start">
          <div className="fixed top-0 bottom-0 mt-24 hidden w-64 overflow-auto lg:block">
            {/* Quick Access Section */}
            <h3 className="text-md font-medium tracking-tight text-gray-900">
              Quick access
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
                {/* Filter Section */}
                <h3 className="text-md font-medium tracking-tight text-slate-900">
                  Explore these filters
                </h3>
                {isFiltersOpenInit &&
                  filters.map((filter) => (
                    <Disclosure
                      key={filter.id}
                      as="div"
                      className="border-b border-slate-200 pt-6 pb-4"
                      defaultOpen={isFiltersOpen[filter.id]}>
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button
                              className="flex w-full items-center justify-between py-3 text-sm text-slate-400 hover:text-slate-500"
                              onClick={() =>
                                setIsFiltersOpen({
                                  ...isFiltersOpen,
                                  [filter.id]: !isFiltersOpen[filter.id],
                                })
                              }>
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
                          <Disclosure.Panel className="space-y-4 pt-4">
                            {getFilterTypeahead(filter.id)}
                            <CheckboxList
                              description=""
                              isLabelHidden={true}
                              label=""
                              orientation="vertical">
                              {userFilters[filter.id].map((option) => (
                                <div
                                  key={option.value}
                                  className="flex items-center px-1 text-sm">
                                  <CheckboxInput
                                    label={option.label}
                                    value={true}
                                    onChange={() =>
                                      setUserFilters({
                                        ...userFilters,
                                        [filter.id]: userFilters[
                                          filter.id
                                        ].filter(
                                          ({ value }) => value !== option.value,
                                        ),
                                      })
                                    }
                                  />
                                  <span className="ml-1 text-slate-500">
                                    ({getFilterCount(filter.id, option.value)})
                                  </span>
                                </div>
                              ))}
                            </CheckboxList>
                            <p
                              className="inline-block cursor-pointer text-sm text-slate-500 underline hover:text-slate-700"
                              onClick={() => onClearFilterClick(filter.id)}>
                              Clear
                            </p>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
              </form>
            </div>
          </div>
          <div className="relative lg:left-64 lg:w-[calc(100%-16rem)]">
            <div className="lg:border-grey-200 z-1 sticky top-16 flex flex-wrap items-center justify-between bg-slate-50 pt-6 pb-2 lg:border-b">
              <div className="border-grey-200 mb-4 flex w-full justify-between border-b pb-2 lg:mb-0 lg:w-auto lg:border-none xl:pb-0">
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
              </div>
              <div className="flex flex-wrap items-center justify-start gap-4 lg:gap-6">
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
                    onFocus={() =>
                      gaEvent({
                        action: 'resumes.search_input_focus',
                        category: 'engagement',
                        label: 'Click Search',
                      })
                    }
                  />
                </div>
                <DropdownMenu
                  align="end"
                  label={getFilterLabel('sort', sortOrder)}>
                  {SORT_OPTIONS.map(({ label, value }) => (
                    <DropdownMenu.Item
                      key={value}
                      isSelected={sortOrder === value}
                      label={label}
                      onClick={() => setSortOrder(value)}></DropdownMenu.Item>
                  ))}
                </DropdownMenu>
                <Button
                  className="lg:hidden"
                  icon={FunnelIcon}
                  isLabelHidden={true}
                  label="Filters"
                  variant="tertiary"
                  onClick={() => setMobileFiltersOpen(true)}
                />
                <Button
                  className="whitespace-pre-wrap px-2 lg:block"
                  label="Submit Resume"
                  variant="primary"
                  onClick={onSubmitResume}
                />
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
                {getEmptyDataText(tabsValue, searchValue)}
              </div>
            ) : (
              <div>
                <div className="h-[85%] overflow-y-auto">
                  <div>
                    <ResumeListItems resumes={getTabResumes()} />
                  </div>
                </div>
                <div className="flex h-[15%] items-center justify-center p-4">
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
