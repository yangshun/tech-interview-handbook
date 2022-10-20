import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  CheckboxInput,
  CheckboxList,
  DropdownMenu,
  Pagination,
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
  EXPERIENCE,
  INITIAL_FILTER_STATE,
  LOCATION,
  ROLE,
  SHORTCUTS,
  SORT_OPTIONS,
} from '~/components/resumes/browse/resumeFilters';
import ResumeListItems from '~/components/resumes/browse/ResumeListItems';
import ResumeReviewsTitle from '~/components/resumes/ResumeReviewsTitle';
import ResumeSignInButton from '~/components/resumes/shared/ResumeSignInButton';

import { trpc } from '~/utils/trpc';

const filters: Array<Filter> = [
  {
    id: 'role',
    label: 'Role',
    options: ROLE,
  },
  {
    id: 'experience',
    label: 'Experience',
    options: EXPERIENCE,
  },
  {
    id: 'location',
    label: 'Location',
    options: LOCATION,
  },
];

export default function ResumeHomePage() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const [tabsValue, setTabsValue] = useState(BROWSE_TABS_VALUES.ALL);
  const [sortOrder, setSortOrder] = useState('latest');
  const [searchValue, setSearchValue] = useState('');
  const [userFilters, setUserFilters] = useState(INITIAL_FILTER_STATE);
  const [shortcutSelected, setShortcutSelected] = useState('All');
  const [renderSignInButton, setRenderSignInButton] = useState(false);
  const [signInButtonText, setSignInButtonText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_LIMIT = 10;
  const skip = (currentPage - 1) * PAGE_LIMIT;

  useEffect(() => {
    setCurrentPage(1);
  }, [userFilters, sortOrder]);

  const allResumesQuery = trpc.useQuery(
    [
      'resumes.resume.findAll',
      {
        experienceFilters: userFilters.experience,
        locationFilters: userFilters.location,
        numComments: userFilters.numComments,
        roleFilters: userFilters.role,
        skip,
        sortOrder,
      },
    ],
    {
      enabled: tabsValue === BROWSE_TABS_VALUES.ALL,
      onSuccess: () => {
        setRenderSignInButton(false);
      },
      staleTime: 5 * 60 * 1000,
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
        skip,
        sortOrder,
      },
    ],
    {
      enabled: tabsValue === BROWSE_TABS_VALUES.STARRED,
      onError: () => {
        setRenderSignInButton(true);
        setSignInButtonText('to view starred resumes');
      },
      retry: false,
      staleTime: 5 * 60 * 1000,
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
        skip,
        sortOrder,
      },
    ],
    {
      enabled: tabsValue === BROWSE_TABS_VALUES.MY,
      onError: () => {
        setRenderSignInButton(true);
        setSignInButtonText('to view your submitted resumes');
      },
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  );

  const onSubmitResume = () => {
    if (sessionData?.user?.id) {
      router.push('/resumes/submit');
    } else {
      router.push('/api/auth/signin');
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

  return (
    <>
      <Head>
        <title>Resume Review Portal</title>
      </Head>
      <main className="h-[calc(100vh-4rem)] flex-1 overflow-y-scroll">
        <div className="ml-4 py-4">
          <ResumeReviewsTitle />
        </div>
        <div className="mt-4 flex items-start">
          <div className="w-screen sm:px-4 md:px-8">
            <div className="grid grid-cols-12">
              <div className="col-span-2 self-end">
                <h3 className="text-md mb-4 font-medium tracking-tight text-gray-900">
                  Shortcuts:
                </h3>
              </div>
              <div className="col-span-10">
                <div className="border-grey-200 grid grid-cols-12 items-center gap-4 border-b pb-2">
                  <div className="col-span-5">
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
                  <div className="col-span-7 flex items-center justify-evenly">
                    <div className="w-64">
                      <form>
                        <TextInput
                          label=""
                          placeholder="Search Resumes"
                          startAddOn={MagnifyingGlassIcon}
                          startAddOnType="icon"
                          type="text"
                          value={searchValue}
                          onChange={setSearchValue}
                        />
                      </form>
                    </div>
                    <div>
                      <DropdownMenu align="end" label={SORT_OPTIONS[sortOrder]}>
                        {Object.entries(SORT_OPTIONS).map(([key, value]) => (
                          <DropdownMenu.Item
                            key={key}
                            isSelected={sortOrder === key}
                            label={value}
                            onClick={() =>
                              setSortOrder(key)
                            }></DropdownMenu.Item>
                        ))}
                      </DropdownMenu>
                    </div>
                    <div>
                      <button
                        className="rounded-md bg-indigo-500 py-2 px-3 text-sm font-medium text-white"
                        type="button"
                        onClick={onSubmitResume}>
                        Submit Resume
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12">
              <div className="col-span-2">
                <div className="w-100 pt-4 sm:pr-0 md:pr-4">
                  <form>
                    <h3 className="sr-only">Shortcuts</h3>
                    <ul
                      className="flex flex-wrap justify-start gap-4 pb-6 text-sm font-medium text-gray-900"
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
                    <h3 className="text-md my-4 font-medium tracking-tight text-gray-900">
                      Explore these filters:
                    </h3>
                    {filters.map((filter) => (
                      <Disclosure
                        key={filter.id}
                        as="div"
                        className="border-b border-gray-200 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
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
                                    className="[&>div>div:nth-child(2)>label]:font-normal [&>div>div:nth-child(1)>input]:text-indigo-600 [&>div>div:nth-child(1)>input]:ring-indigo-500">
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
              <div className="col-span-10 mb-6">
                {renderSignInButton && (
                  <ResumeSignInButton text={signInButtonText} />
                )}
                {getTabResumes().length === 0 && (
                  <div className="mt-4">Nothing to see here.</div>
                )}
                <ResumeListItems
                  isLoading={
                    allResumesQuery.isFetching ||
                    starredResumesQuery.isFetching ||
                    myResumesQuery.isFetching
                  }
                  resumes={getTabResumes()}
                />
                <div className="my-4 flex justify-center">
                  <Pagination
                    current={currentPage}
                    end={getTabTotalPages()}
                    label="pagination"
                    start={1}
                    onSelect={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
