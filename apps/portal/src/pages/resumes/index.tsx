import compareAsc from 'date-fns/compareAsc';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  CheckboxInput,
  CheckboxList,
  DropdownMenu,
  Tabs,
  TextInput,
} from '@tih/ui';

import type {
  FilterOption,
  SortOrder,
} from '~/components/resumes/browse/resumeConstants';
import {
  BROWSE_TABS_VALUES,
  EXPERIENCE,
  LOCATION,
  ROLE,
  SORT_OPTIONS,
  TOP_HITS,
} from '~/components/resumes/browse/resumeConstants';
import ResumeFilterPill from '~/components/resumes/browse/ResumeFilterPill';
import ResumeListItems from '~/components/resumes/browse/ResumeListItems';
import ResumeReviewsTitle from '~/components/resumes/ResumeReviewsTitle';
import ResumeSignInButton from '~/components/resumes/shared/ResumeSignInButton';

import { trpc } from '~/utils/trpc';

import type { Resume } from '~/types/resume';

type FilterId = 'experience' | 'location' | 'role';
type Filter = {
  id: FilterId;
  name: string;
  options: Array<FilterOption>;
};
type FilterState = Record<FilterId, Array<string>>;

const filters: Array<Filter> = [
  {
    id: 'role',
    name: 'Role',
    options: ROLE,
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

const INITIAL_FILTER_STATE: FilterState = {
  experience: Object.values(EXPERIENCE).map(({ value }) => value),
  location: Object.values(LOCATION).map(({ value }) => value),
  role: Object.values(ROLE).map(({ value }) => value),
};

const filterResumes = (
  resumes: Array<Resume>,
  searchValue: string,
  userFilters: FilterState,
) =>
  resumes
    .filter((resume) =>
      resume.title.toLowerCase().includes(searchValue.toLocaleLowerCase()),
    )
    .filter(
      ({ experience, location, role }) =>
        userFilters.role.includes(role) &&
        userFilters.experience.includes(experience) &&
        userFilters.location.includes(location),
    );

const sortComparators: Record<
  SortOrder,
  (resume1: Resume, resume2: Resume) => number
> = {
  latest: (resume1, resume2) =>
    compareAsc(resume2.createdAt, resume1.createdAt),
  popular: (resume1, resume2) => resume2.numStars - resume1.numStars,
  topComments: (resume1, resume2) => resume2.numComments - resume1.numComments,
};
const sortResumes = (resumes: Array<Resume>, sortOrder: SortOrder) =>
  resumes.sort(sortComparators[sortOrder]);

export default function ResumeHomePage() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const [tabsValue, setTabsValue] = useState(BROWSE_TABS_VALUES.ALL);
  const [sortOrder, setSortOrder] = useState(SORT_OPTIONS[0].value);
  const [searchValue, setSearchValue] = useState('');
  const [userFilters, setUserFilters] = useState(INITIAL_FILTER_STATE);
  const [resumes, setResumes] = useState<Array<Resume>>([]);
  const [renderSignInButton, setRenderSignInButton] = useState(false);
  const [signInButtonText, setSignInButtonText] = useState('');

  const allResumesQuery = trpc.useQuery(['resumes.resume.findAll'], {
    enabled: tabsValue === BROWSE_TABS_VALUES.ALL,
    onSuccess: (data) => {
      setResumes(data);
      setRenderSignInButton(false);
    },
  });
  const starredResumesQuery = trpc.useQuery(
    ['resumes.resume.user.findUserStarred'],
    {
      enabled: tabsValue === BROWSE_TABS_VALUES.STARRED,
      onError: () => {
        setResumes([]);
        setRenderSignInButton(true);
        setSignInButtonText('to view starred resumes');
      },
      onSuccess: (data) => {
        setResumes(data);
      },
      retry: false,
    },
  );
  const myResumesQuery = trpc.useQuery(
    ['resumes.resume.user.findUserCreated'],
    {
      enabled: tabsValue === BROWSE_TABS_VALUES.MY,
      onError: () => {
        setResumes([]);
        setRenderSignInButton(true);
        setSignInButtonText('to view your submitted resumes');
      },
      onSuccess: (data) => {
        setResumes(data);
      },
      retry: false,
    },
  );

  const onClickNew = () => {
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
                <h1 className="mb-4 tracking-tight text-gray-900">Filters</h1>
              </div>
              <div className="col-span-10">
                <div className="border-grey-200 grid grid-cols-12 items-center gap-4 border-b pb-2">
                  <div className="col-span-7">
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
                      onChange={setTabsValue}
                    />
                  </div>
                  <div className="col-span-3 self-end">
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
                  <div className="col-span-1 justify-self-center">
                    <DropdownMenu align="end" label="Sort">
                      {SORT_OPTIONS.map((option) => (
                        <DropdownMenu.Item
                          key={option.name}
                          isSelected={sortOrder === option.value}
                          label={option.name}
                          onClick={() =>
                            setSortOrder(option.value)
                          }></DropdownMenu.Item>
                      ))}
                    </DropdownMenu>
                  </div>
                  <div className="col-span-1">
                    <button
                      className="rounded-md bg-indigo-500 py-1 px-3 text-sm text-white"
                      type="button"
                      onClick={onClickNew}>
                      New
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12">
              <div className="col-span-2">
                <div className="w-100 pt-4 sm:pr-0 md:pr-4">
                  <form>
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      className="flex flex-wrap justify-start gap-4 pb-6 text-sm font-medium text-gray-900"
                      role="list">
                      {TOP_HITS.map((category) => (
                        <li key={category.name}>
                          {/* TODO: Replace onClick with filtering function */}
                          <ResumeFilterPill
                            title={category.name}
                            onClick={() => true}
                          />
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
                            <Disclosure.Panel className="pt-4">
                              <CheckboxList
                                description=""
                                isLabelHidden={true}
                                label=""
                                orientation="vertical">
                                {section.options.map((option) => (
                                  <div
                                    key={option.value}
                                    className="[&>div>div:nth-child(2)>label]:font-normal [&>div>div:nth-child(1)>input]:text-indigo-600 [&>div>div:nth-child(1)>input]:ring-indigo-500">
                                    <CheckboxInput
                                      label={option.label}
                                      value={userFilters[section.id].includes(
                                        option.value,
                                      )}
                                      onChange={(isChecked) =>
                                        onFilterCheckboxChange(
                                          isChecked,
                                          section.id,
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
              <div className="col-span-10 pr-8">
                {renderSignInButton && (
                  <ResumeSignInButton text={signInButtonText} />
                )}
                <ResumeListItems
                  isLoading={
                    allResumesQuery.isFetching ||
                    starredResumesQuery.isFetching ||
                    myResumesQuery.isFetching
                  }
                  resumes={sortResumes(
                    filterResumes(resumes, searchValue, userFilters),
                    sortOrder,
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
