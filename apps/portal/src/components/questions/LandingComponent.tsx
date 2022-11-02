import { useEffect, useState } from 'react';
import { ArrowSmallRightIcon } from '@heroicons/react/24/outline';
import type { QuestionsQuestionType } from '@prisma/client';
import type { TypeaheadOption } from '@tih/ui';
import { Button, Select } from '@tih/ui';

import { companyOptionToSlug } from '~/utils/questions/companySlug';
import { QUESTION_TYPES } from '~/utils/questions/constants';
import { locationOptionToSlug } from '~/utils/questions/locationSlug';
import useDefaultCompany from '~/utils/questions/useDefaultCompany';
import useDefaultLocation from '~/utils/questions/useDefaultLocation';

import type { FilterChoice } from './filter/FilterSection';
import CompanyTypeahead from './typeahead/CompanyTypeahead';
import LocationTypeahead from './typeahead/LocationTypeahead';

import type { Location } from '~/types/questions';

export type LandingQueryData = {
  companySlug: string;
  location: string;
  questionType: QuestionsQuestionType;
};

export type LandingComponentProps = {
  onLanded: (data: LandingQueryData) => void;
};

export default function LandingComponent({
  onLanded: handleLandingQuery,
}: LandingComponentProps) {
  const defaultCompany = useDefaultCompany();
  const defaultLocation = useDefaultLocation();

  const [company, setCompany] = useState<FilterChoice | undefined>(
    defaultCompany,
  );
  const [location, setLocation] = useState<
    (Location & TypeaheadOption) | undefined
  >(defaultLocation);

  const [questionType, setQuestionType] =
    useState<QuestionsQuestionType>('CODING');

  const handleChangeCompany = (newCompany: FilterChoice) => {
    setCompany(newCompany);
  };

  const handleChangeLocation = (newLocation: Location & TypeaheadOption) => {
    setLocation(newLocation);
  };

  const handleChangeType = (newQuestionType: QuestionsQuestionType) => {
    setQuestionType(newQuestionType);
  };

  useEffect(() => {
    if (company === undefined) {
      setCompany(defaultCompany);
    }
  }, [defaultCompany, company]);

  useEffect(() => {
    if (location === undefined) {
      setLocation(defaultLocation);
    }
  }, [defaultLocation, location]);

  return (
    <main className="flex flex-1 flex-col items-center overflow-y-auto bg-white">
      <div className="flex flex-1 flex-col items-start justify-center gap-12 px-4">
        <header className="flex flex-col items-start gap-16">
          <div className="flex flex-col items-center self-stretch">
            <img
              alt="Questions Bank"
              className="h-40 w-40"
              src="/bank-logo.png"
            />
            <h1 className="text-center text-4xl font-bold text-slate-900">
              Tech Interview Question Bank
            </h1>
          </div>
          <p className="mb-2 max-w-lg text-5xl font-semibold text-slate-900 sm:max-w-3xl">
            Know the{' '}
            <span className="text-primary-700">
              latest SWE interview questions
            </span>{' '}
            asked by top companies.
          </p>
        </header>
        <div className="flex flex-col items-start gap-3 text-xl font-semibold text-slate-900">
          <p className="text-3xl">Find questions</p>
          <div className="grid grid-cols-[auto_auto] items-baseline gap-x-4 gap-y-2">
            <p className="text-slate-600">about</p>
            <Select
              isLabelHidden={true}
              label="Type"
              options={QUESTION_TYPES}
              value={questionType}
              onChange={(value) => {
                handleChangeType(value.toUpperCase() as QuestionsQuestionType);
              }}
            />
            <p className="text-slate-600">from</p>
            <CompanyTypeahead
              isLabelHidden={true}
              value={company}
              onSelect={(value) => {
                handleChangeCompany(value);
              }}
            />
            <p className="text-slate-600">in</p>
            <LocationTypeahead
              isLabelHidden={true}
              value={location}
              onSelect={(value) => {
                handleChangeLocation(value);
              }}
            />
          </div>
          <Button
            addonPosition="end"
            icon={ArrowSmallRightIcon}
            label="Go"
            size="md"
            variant="primary"
            onClick={() => {
              if (company !== undefined && location !== undefined) {
                return handleLandingQuery({
                  companySlug: companyOptionToSlug(company),
                  location: locationOptionToSlug(location),
                  questionType,
                });
              }
            }}
          />
        </div>
        <div className="flex justify-center">
          <iframe
            height={30}
            src="https://ghbtns.com/github-btn.html?user=yangshun&amp;repo=tech-interview-handbook&amp;type=star&amp;count=true&amp;size=large"
            title="GitHub Stars"
            width={160}
          />
        </div>
        <div>
          <p className="py-20 text-center text-white ">
            TODO questions Carousel
          </p>
        </div>
      </div>
    </main>
  );
}
