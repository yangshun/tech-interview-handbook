import { subMonths, subYears } from 'date-fns';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import type { QuestionsQuestionType } from '@prisma/client';

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

  const { data: questions } = trpc.useQuery([
    'questions.questions.getQuestionsByFilter',
    {
      companies: selectedCompanies,
      endDate: today,
      locations: selectedLocations,
      questionTypes: selectedQuestionTypes,
      roles: [],
      startDate,
    },
  ]);

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

  const handleLandingQuery = (data: LandingQueryData) => {
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

  useEffect(() => {
    if (areFiltersInitialized) {
      const hasFilter =
        router.query.companies ||
        router.query.questionTypes ||
        router.query.questionAge ||
        router.query.locations;
      if (hasFilter) {
        setHasLanded(true);
      }
      // Console.log('landed', hasLanded);
      setLoaded(true);
    }
  }, [areFiltersInitialized, hasLanded, router.query]);

  if (!loaded) {
    return null;
  }

  return !hasLanded ? (
    <LandingComponent onLanded={handleLandingQuery}></LandingComponent>
  ) : (
    <main className="flex flex-1 flex-col items-stretch overflow-y-auto">
      <div className="flex pt-4">
        <aside className="w-[300px] border-r px-4">
          <h2 className="text-xl font-semibold">Filter by</h2>
          <div className="divide-y divide-slate-200">
            <FilterSection
              label="Company"
              options={companyFilterOptions}
              searchPlaceholder="Add company filter"
              onOptionChange={(optionValue, checked) => {
                if (checked) {
                  setSelectedCompanies([...selectedCompanies, optionValue]);
                } else {
                  setSelectedCompanies(
                    selectedCompanies.filter(
                      (company) => company !== optionValue,
                    ),
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
                  setSelectedQuestionTypes([
                    ...selectedQuestionTypes,
                    optionValue,
                  ]);
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
                    selectedLocations.filter(
                      (location) => location !== optionValue,
                    ),
                  );
                }
              }}
            />
          </div>
        </aside>
        <section className="flex min-h-0 flex-1 flex-col items-center overflow-auto pt-4">
          <div className="flex min-h-0 max-w-3xl flex-1">
            <div className="flex flex-1 flex-col items-stretch justify-start gap-4 pb-4">
              <ContributeQuestionCard
                onSubmit={(data) => {
                  createQuestion({
                    company: data.company,
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
                onSortChange={(value) => {
                  // eslint-disable-next-line no-console
                  console.log(value);
                }}
              />
              {(questions ?? []).map((question) => (
                <QuestionOverviewCard
                  // eslint-disable-next-line react/no-array-index-key
                  key={question.id}
                  answerCount={question.numAnswers}
                  content={question.content}
                  href={`/questions/${question.id}/${createSlug(
                    question.content,
                  )}`}
                  location={question.location}
                  receivedCount={0} // TODO: Implement received count
                  role={question.role}
                  timestamp={question.seenAt.toLocaleDateString()}
                  type={question.type}
                  upvoteCount={question.numVotes}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
