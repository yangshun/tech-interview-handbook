import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import QuestionOverviewCard from '~/components/questions/card/QuestionOverviewCard';
import ContributeQuestionCard from '~/components/questions/ContributeQuestionCard';
import type { FilterOptions } from '~/components/questions/filter/FilterSection';
import FilterSection from '~/components/questions/filter/FilterSection';
import type { LandingQueryData } from '~/components/questions/LandingComponent';
import LandingComponent from '~/components/questions/LandingComponent';
import QuestionSearchBar from '~/components/questions/QuestionSearchBar';

type FilterChoices = Array<Omit<FilterOptions, 'checked'>>;

const COMPANIES: FilterChoices = [
  {
    label: 'Google',
    value: 'google',
  },
  {
    label: 'Meta',
    value: 'meta',
  },
];

// Code, design, behavioral
const QUESTION_TYPES: FilterChoices = [
  {
    label: 'Coding',
    value: 'coding',
  },
  {
    label: 'Design',
    value: 'design',
  },
  {
    label: 'Behavioral',
    value: 'behavioral',
  },
];

const QUESTION_AGES: FilterChoices = [
  {
    label: 'Last month',
    value: 'last-month',
  },
  {
    label: 'Last 6 months',
    value: 'last-6-months',
  },
  {
    label: 'Last year',
    value: 'last-year',
  },
];

const LOCATIONS: FilterChoices = [
  {
    label: 'Singapore',
    value: 'singapore',
  },
];

export default function QuestionsHomePage() {
  const router = useRouter();

  const [selectedCompanies, setSelectedCompanies] = useState<Array<string>>([]);

  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<
    Array<string>
  >([]);
  const [selectedQuestionAges, setSelectedQuestionAges] = useState<
    Array<string>
  >([]);
  const [selectedLocations, setSelectedLocations] = useState<Array<string>>([]);
  const [hasLanded, setHasLanded] = useState(false);

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
      checked: selectedQuestionAges.includes(questionAge.value),
    }));
  }, [selectedQuestionAges]);

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
    setSelectedQuestionTypes([questionType]);
    setHasLanded(true);
  };

  const paramToArray = (
    param: Array<string> | string | undefined,
  ): Array<string> => {
    if (typeof param === 'string') {
      return [param];
    }
    return param ?? [];
  };

  const [isSearchInitialized, setIsSearchInitialized] = useState(false);

  // Set url query params
  useEffect(() => {
    if (router.isReady && !isSearchInitialized) {
      setSelectedCompanies(paramToArray(router.query.companies));
      setSelectedQuestionTypes(paramToArray(router.query.questionTypes));
      setSelectedQuestionAges(paramToArray(router.query.questionAges));
      setSelectedLocations(paramToArray(router.query.locations));
      setIsSearchInitialized(true);

      const hasFilter =
        router.query.companies ||
        router.query.questionTypes ||
        router.query.questionAges ||
        router.query.locations;
      if (hasFilter) {
        setHasLanded(true);
      }
    }
  }, [
    router.isReady,
    router.query,
    isSearchInitialized,
    hasLanded,
    selectedCompanies,
    selectedQuestionTypes,
    selectedQuestionAges,
    selectedLocations,
  ]);

  // Update url query params
  useEffect(() => {
    if (router.isReady && isSearchInitialized) {
      router.replace(
        {
          query: {
            companies: selectedCompanies,
            locations: selectedLocations,
            questionAges: selectedQuestionAges,
            questionTypes: selectedQuestionTypes,
          },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [
    selectedCompanies,
    selectedQuestionTypes,
    selectedQuestionAges,
    selectedLocations,
    router,
    router.isReady,
    isSearchInitialized,
  ]);

  return !hasLanded ? (
    <LandingComponent onLanded={handleLandingQuery}></LandingComponent>
  ) : (
    <main className="flex flex-1 flex-col items-stretch overflow-y-auto">
      <div className="flex pt-4">
        <section className="w-[300px] border-r px-4">
          <h2 className="text-xl font-semibold">Filter by</h2>
          <div className="divide-y divide-slate-200">
            <FilterSection
              label="Company"
              options={companyFilterOptions}
              searchPlaceholder="Add company filter"
              onOptionChange={(optionValue, checked) => {
                if (checked) {
                  setSelectedCompanies((prev) => [...prev, optionValue]);
                } else {
                  setSelectedCompanies((prev) =>
                    prev.filter((company) => company !== optionValue),
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
                  setSelectedQuestionTypes((prev) => [...prev, optionValue]);
                } else {
                  setSelectedQuestionTypes((prev) =>
                    prev.filter((questionType) => questionType !== optionValue),
                  );
                }
              }}
            />
            <FilterSection
              label="Question age"
              options={questionAgeFilterOptions}
              showAll={true}
              onOptionChange={(optionValue, checked) => {
                if (checked) {
                  setSelectedQuestionAges((prev) => [...prev, optionValue]);
                } else {
                  setSelectedQuestionAges((prev) =>
                    prev.filter((questionAge) => questionAge !== optionValue),
                  );
                }
              }}
            />
            <FilterSection
              label="Location"
              options={locationFilterOptions}
              searchPlaceholder="Add location filter"
              onOptionChange={(optionValue, checked) => {
                if (checked) {
                  setSelectedLocations((prev) => [...prev, optionValue]);
                } else {
                  setSelectedLocations((prev) =>
                    prev.filter((location) => location !== optionValue),
                  );
                }
              }}
            />
          </div>
        </section>
        <div className="flex flex-1 justify-center">
          <div className="flex max-w-3xl flex-1 gap-x-4">
            <div className="flex flex-1 flex-col items-stretch justify-start gap-4">
              <ContributeQuestionCard
                onSubmit={(data) => {
                  // eslint-disable-next-line no-console
                  console.log(data);
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
              />
              <QuestionOverviewCard
                answerCount={0}
                content="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and"
                location="Menlo Park, CA"
                role="Senior Engineering Manager"
                similarCount={0}
                timestamp="Last month"
                upvoteCount={0}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
