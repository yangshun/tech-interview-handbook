import { subMonths, subYears } from 'date-fns';
import Router, { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { NoSymbolIcon } from '@heroicons/react/24/outline';
import type { QuestionsQuestionType } from '@prisma/client';
import { SlideOut } from '@tih/ui';

import QuestionOverviewCard from '~/components/questions/card/QuestionOverviewCard';
import ContributeQuestionCard from '~/components/questions/ContributeQuestionCard';
import FilterSection from '~/components/questions/filter/FilterSection';
import type { LandingQueryData } from '~/components/questions/LandingComponent';
import LandingComponent from '~/components/questions/LandingComponent';
import QuestionSearchBar from '~/components/questions/QuestionSearchBar';

import type { QuestionAge } from '~/utils/questions/constants';
import {
  COMPANIES,
  LOCATIONS,
  QUESTION_AGES,
  QUESTION_TYPES,
} from '~/utils/questions/constants';
import createSlug from '~/utils/questions/createSlug';
import {
  useSearchFilter,
  useSearchFilterSingle,
} from '~/utils/questions/useSearchFilter';
import { trpc } from '~/utils/trpc';

export default function QuestionsHomePage() {
  const router = useRouter();

  const [selectedCompanies, setSelectedCompanies, areCompaniesInitialized] =
    useSearchFilter('companies');
  const [
    selectedQuestionTypes,
    setSelectedQuestionTypes,
    areQuestionTypesInitialized,
  ] = useSearchFilter<QuestionsQuestionType>('questionTypes', {
    queryParamToValue: (param) => {
      return param.toUpperCase() as QuestionsQuestionType;
    },
  });
  const [
    selectedQuestionAge,
    setSelectedQuestionAge,
    isQuestionAgeInitialized,
  ] = useSearchFilterSingle<QuestionAge>('questionAge', {
    defaultValue: 'all',
  });
  const [selectedLocations, setSelectedLocations, areLocationsInitialized] =
    useSearchFilter('locations');

  const today = useMemo(() => new Date(), []);
  const startDate = useMemo(() => {
    return selectedQuestionAge === 'last-year'
      ? subYears(new Date(), 1)
      : selectedQuestionAge === 'last-6-months'
      ? subMonths(new Date(), 6)
      : selectedQuestionAge === 'last-month'
      ? subMonths(new Date(), 1)
      : undefined;
  }, [selectedQuestionAge]);

  const { data: questions } = trpc.useQuery(
    [
      'questions.questions.getQuestionsByFilter',
      {
        companyNames: selectedCompanies,
        endDate: today,
        locations: selectedLocations,
        questionTypes: selectedQuestionTypes,
        roles: [],
        startDate,
      },
    ],
    {
      keepPreviousData: true,
    },
  );

  const utils = trpc.useContext();
  const { mutate: createQuestion } = trpc.useMutation(
    'questions.questions.create',
    {
      onSuccess: () => {
        utils.invalidateQueries('questions.questions.getQuestionsByFilter');
      },
    },
  );

  const [hasLanded, setHasLanded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const companyFilterOptions = useMemo(() => {
    return COMPANIES.map((company) => ({
      ...company,
      checked: selectedCompanies.includes(company.value),
    }));
  }, [selectedCompanies]);

  const questionTypeFilterOptions = useMemo(() => {
    return QUESTION_TYPES.map((questionType) => ({
      ...questionType,
      checked: selectedQuestionTypes.includes(questionType.value),
    }));
  }, [selectedQuestionTypes]);

  const questionAgeFilterOptions = useMemo(() => {
    return QUESTION_AGES.map((questionAge) => ({
      ...questionAge,
      checked: selectedQuestionAge === questionAge.value,
    }));
  }, [selectedQuestionAge]);

  const locationFilterOptions = useMemo(() => {
    return LOCATIONS.map((location) => ({
      ...location,
      checked: selectedLocations.includes(location.value),
    }));
  }, [selectedLocations]);

  const handleLandingQuery = async (data: LandingQueryData) => {
    const { company, location, questionType } = data;

    setSelectedCompanies([company]);
    setSelectedLocations([location]);
    setSelectedQuestionTypes([questionType as QuestionsQuestionType]);
    setHasLanded(true);
  };

  const areFiltersInitialized = useMemo(() => {
    return (
      areCompaniesInitialized &&
      areQuestionTypesInitialized &&
      isQuestionAgeInitialized &&
      areLocationsInitialized
    );
  }, [
    areCompaniesInitialized,
    areQuestionTypesInitialized,
    isQuestionAgeInitialized,
    areLocationsInitialized,
  ]);

  const { pathname } = router;
  useEffect(() => {
    if (areFiltersInitialized) {
      // Router.replace used instead of router.replace to avoid
      // the page reloading itself since the router.replace
      // callback changes on every page load
      Router.replace({
        pathname,
        query: {
          companies: selectedCompanies,
          locations: selectedLocations,
          questionAge: selectedQuestionAge,
          questionTypes: selectedQuestionTypes,
        },
      });
      const hasFilter =
        selectedCompanies.length > 0 ||
        selectedLocations.length > 0 ||
        selectedQuestionAge !== 'all' ||
        selectedQuestionTypes.length > 0;
      if (hasFilter) {
        setHasLanded(true);
      }

      setLoaded(true);
    }
  }, [
    areFiltersInitialized,
    hasLanded,
    loaded,
    pathname,
    selectedCompanies,
    selectedLocations,
    selectedQuestionAge,
    selectedQuestionTypes,
  ]);

  if (!loaded) {
    return null;
  }
  const filterSidebar = (
    <div className="mt-2 divide-y divide-slate-200 px-4">
      <FilterSection
        label="Company"
        options={companyFilterOptions}
        searchPlaceholder="Add company filter"
        onOptionChange={(optionValue, checked) => {
          if (checked) {
            setSelectedCompanies([...selectedCompanies, optionValue]);
          } else {
            setSelectedCompanies(
              selectedCompanies.filter((company) => company !== optionValue),
            );
          }
        }}
      />
      <FilterSection
        label="Question types"
        options={questionTypeFilterOptions}
        showAll={true}
        onOptionChange={(optionValue, checked) => {
          if (checked) {
            setSelectedQuestionTypes([...selectedQuestionTypes, optionValue]);
          } else {
            setSelectedQuestionTypes(
              selectedQuestionTypes.filter(
                (questionType) => questionType !== optionValue,
              ),
            );
          }
        }}
      />
      <FilterSection
        isSingleSelect={true}
        label="Question age"
        options={questionAgeFilterOptions}
        showAll={true}
        onOptionChange={(optionValue) => {
          setSelectedQuestionAge(optionValue);
        }}
      />
      <FilterSection
        label="Location"
        options={locationFilterOptions}
        searchPlaceholder="Add location filter"
        onOptionChange={(optionValue, checked) => {
          if (checked) {
            setSelectedLocations([...selectedLocations, optionValue]);
          } else {
            setSelectedLocations(
              selectedLocations.filter((location) => location !== optionValue),
            );
          }
        }}
      />
    </div>
  );

  return !hasLanded ? (
    <LandingComponent onLanded={handleLandingQuery}></LandingComponent>
  ) : (
    <main className="flex flex-1 flex-col items-stretch">
      <div className="flex h-full flex-1">
        <section className="flex min-h-0 flex-1 flex-col items-center overflow-auto">
          <div className="flex min-h-0 max-w-3xl flex-1 p-4">
            <div className="flex flex-1 flex-col items-stretch justify-start gap-4">
              <ContributeQuestionCard
                onSubmit={(data) => {
                  createQuestion({
                    companyId: data.company,
                    content: data.questionContent,
                    location: data.location,
                    questionType: data.questionType,
                    role: data.role,
                    seenAt: data.date,
                  });
                }}
              />
              <QuestionSearchBar
                sortOptions={[
                  {
                    label: 'Most recent',
                    value: 'most-recent',
                  },
                  {
                    label: 'Most upvotes',
                    value: 'most-upvotes',
                  },
                ]}
                sortValue="most-recent"
                onFilterOptionsToggle={() => {
                  setFilterDrawerOpen(!filterDrawerOpen);
                }}
                onSortChange={(value) => {
                  // eslint-disable-next-line no-console
                  console.log(value);
                }}
              />
              {(questions ?? []).map((question) => (
                <QuestionOverviewCard
                  key={question.id}
                  answerCount={question.numAnswers}
                  company={question.company}
                  content={question.content}
                  href={`/questions/${question.id}/${createSlug(
                    question.content,
                  )}`}
                  location={question.location}
                  questionId={question.id}
                  receivedCount={0}
                  role={question.role}
                  timestamp={question.seenAt.toLocaleDateString(undefined, {
                    month: 'short',
                    year: 'numeric',
                  })}
                  type={question.type} // TODO: Implement received count
                  upvoteCount={question.numVotes}
                />
              ))}
              {questions?.length === 0 && (
                <div className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-slate-200 p-4 text-slate-600">
                  <NoSymbolIcon className="h-6 w-6" />
                  <p>Nothing found. Try changing your search filters.</p>
                </div>
              )}
            </div>
          </div>
        </section>
        <aside className="hidden w-[300px] overflow-y-auto border-l bg-white py-4 lg:block">
          <h2 className="px-4 text-xl font-semibold">Filter by</h2>
          {filterSidebar}
        </aside>
        <SlideOut
          className="lg:hidden"
          enterFrom="end"
          isShown={filterDrawerOpen}
          size="sm"
          title="Filter by"
          onClose={() => {
            setFilterDrawerOpen(false);
          }}>
          {filterSidebar}
        </SlideOut>
      </div>
    </main>
  );
}
