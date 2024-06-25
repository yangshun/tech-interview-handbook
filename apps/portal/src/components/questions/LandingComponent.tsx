import { useEffect, useState } from 'react';
import { ArrowSmallRightIcon } from '@heroicons/react/24/outline';
import type { QuestionsQuestionType } from '@prisma/client';
import type { TypeaheadOption } from '~/ui';
import { Button, Select } from '~/ui';

import Container from '~/components/shared/Container';

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
} | null;

export type LandingComponentProps = {
  onLanded: (data: LandingQueryData) => void;
};

export default function LandingComponent({ onLanded }: LandingComponentProps) {
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
    <div className="relative pt-6 pb-16 sm:pb-24">
      <main className="mt-8 sm:mt-16">
        <Container>
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
              <div>
                <h1 className="text-primary-600 mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Tech Interview Question Bank
                </h1>
                <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Discover the latest tech interview questions asked by top
                  companies. Learn from answers by others.
                </p>
              </div>
            </div>
            <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
              <div className="bg-white shadow sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg">
                <div className="px-4 py-8 sm:px-10">
                  <div>
                    <Button
                      display="block"
                      href="/questions/browse"
                      label="Explore All Questions"
                      variant="primary"
                    />
                  </div>
                  <div className="relative mt-6">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-2 text-gray-500">Or</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="text-lg">Find questions</p>
                    <div className="mt-4 grid grid-cols-[auto_auto] items-baseline gap-x-4 gap-y-2">
                      <p className="text-slate-600">about</p>
                      <Select
                        isLabelHidden={true}
                        label="Type"
                        options={QUESTION_TYPES}
                        value={questionType}
                        onChange={(value) => {
                          handleChangeType(
                            value.toUpperCase() as QuestionsQuestionType,
                          );
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
                    <div className="mt-4 flex items-center">
                      <Button
                        addonPosition="end"
                        display="block"
                        icon={ArrowSmallRightIcon}
                        label="Go"
                        size="md"
                        variant="secondary"
                        onClick={() => {
                          if (company !== undefined && location !== undefined) {
                            onLanded({
                              companySlug: companyOptionToSlug(company),
                              location: locationOptionToSlug(location),
                              questionType,
                            });
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
