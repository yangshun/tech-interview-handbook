import { useMemo, useState } from 'react';

import ContributeQuestionCard from '~/components/questions/ContributeQuestionCard';
import type { FilterOptions } from '~/components/questions/filter/FilterSection';
import FilterSection from '~/components/questions/filter/FilterSection';
import NavBar from '~/components/questions/NavBar';
import QuestionOverviewCard from '~/components/questions/QuestionOverviewCard';
import QuestionSearchBar from '~/components/questions/QuestionSearchBar';

type FilterChoices = Array<Omit<FilterOptions, 'checked'>>;

const companies: FilterChoices = [
  {
    label: 'Google',
    value: 'Google',
  },
  {
    label: 'Meta',
    value: 'meta',
  },
];

// Code, design, behavioral
const questionTypes: FilterChoices = [
  {
    label: 'Code',
    value: 'code',
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

const questionAges: FilterChoices = [
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

const locations: FilterChoices = [
  {
    label: 'Singapore',
    value: 'singapore',
  },
];

export default function QuestionsHomePage() {
  const [selectedCompanies, setSelectedCompanies] = useState<Array<string>>([]);
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<
    Array<string>
  >([]);
  const [selectedQuestionAges, setSelectedQuestionAges] = useState<
    Array<string>
  >([]);
  const [selectedLocations, setSelectedLocations] = useState<Array<string>>([]);

  const companyFilterOptions = useMemo(() => {
    return companies.map((company) => ({
      ...company,
      checked: selectedCompanies.includes(company.value),
    }));
  }, [selectedCompanies]);

  const questionTypeFilterOptions = useMemo(() => {
    return questionTypes.map((questionType) => ({
      ...questionType,
      checked: selectedQuestionTypes.includes(questionType.value),
    }));
  }, [selectedQuestionTypes]);

  const questionAgeFilterOptions = useMemo(() => {
    return questionAges.map((questionAge) => ({
      ...questionAge,
      checked: selectedQuestionAges.includes(questionAge.value),
    }));
  }, [selectedQuestionAges]);

  const locationFilterOptions = useMemo(() => {
    return locations.map((location) => ({
      ...location,
      checked: selectedLocations.includes(location.value),
    }));
  }, [selectedLocations]);

  return (
    <main className="flex flex-1 flex-col items-stretch overflow-y-auto">
      <div className="pb-4">
        <NavBar></NavBar>
      </div>
      <div className="flex">
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
