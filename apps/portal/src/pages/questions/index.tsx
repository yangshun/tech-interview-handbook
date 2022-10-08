import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import QuestionOverviewCard from '~/components/questions/card/QuestionOverviewCard';
import ContributeQuestionCard from '~/components/questions/ContributeQuestionCard';
import FilterSection from '~/components/questions/filter/FilterSection';
import type { LandingQueryData } from '~/components/questions/LandingComponent';
import LandingComponent from '~/components/questions/LandingComponent';
import QuestionSearchBar from '~/components/questions/QuestionSearchBar';

import {
  COMPANIES,
  LOCATIONS,
  QUESTION_AGES,
  QUESTION_TYPES,
} from '~/utils/questions/constants';

export default function QuestionsHomePage() {
  const router = useRouter();

  const [selectedCompanies, setSelectedCompanies] = useState<Array<string>>([]);

  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<
    Array<string>
  >([]);
  const [selectedQuestionAge, setSelectedQuestionAge] = useState<string>('all');
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
      const paramQuestionAge = router.query.questionAge;
      const questionAge = Array.isArray(paramQuestionAge)
        ? paramQuestionAge[0]
        : paramQuestionAge ?? 'all';
      setSelectedCompanies(paramToArray(router.query.companies));
      setSelectedQuestionTypes(paramToArray(router.query.questionTypes));
      setSelectedQuestionAge(questionAge);
      setSelectedLocations(paramToArray(router.query.locations));
      setIsSearchInitialized(true);

      const hasFilter =
        router.query.companies ||
        router.query.questionTypes ||
        router.query.questionAge ||
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
    selectedQuestionAge,
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
            questionTypes: selectedQuestionTypes,
            ...(selectedQuestionAge !== 'all'
              ? {
                  questionAge: selectedQuestionAge,
                }
              : {}),
          },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [
    selectedCompanies,
    selectedQuestionTypes,
    selectedQuestionAge,
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
        <aside className="w-[300px] border-r px-4">
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
                  setSelectedLocations((prev) => [...prev, optionValue]);
                } else {
                  setSelectedLocations((prev) =>
                    prev.filter((location) => location !== optionValue),
                  );
                }
              }}
            />
          </div>
        </aside>
        <section className="flex min-h-0 flex-1 flex-col items-center overflow-auto pt-4">
          <div className="flex min-h-0 max-w-3xl flex-1 gap-x-4">
            <div className="flex flex-1 flex-col items-stretch justify-start gap-4">
              <ContributeQuestionCard />
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
              {Array.from({ length: 10 }).map((_, index) => (
                <QuestionOverviewCard
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  answerCount={0}
                  content="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and"
                  location="Menlo Park, CA"
                  role="Senior Engineering Manager"
                  similarCount={0}
                  timestamp="Last month"
                  upvoteCount={0}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
