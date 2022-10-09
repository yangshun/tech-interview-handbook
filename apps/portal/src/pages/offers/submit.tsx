import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@tih/ui';

import BackgroundForm from '~/components/offers/forms/BackgroundForm';
import OfferAnalysis from '~/components/offers/forms/OfferAnalysis';
import OfferDetailsForm from '~/components/offers/forms/OfferDetailsForm';
import OfferProfileSave from '~/components/offers/forms/OfferProfileSave';

type Money = {
  currency: string;
  value: number;
};

type FullTimeJobData = {
  base: Money;
  bonus: Money;
  level: string;
  specialization: string;
  stocks: Money;
  title: string;
  totalCompensation: Money;
};

type FullTimeOfferFormData = {
  comments: string;
  companyId: string;
  job: FullTimeJobData;
  jobType: string;
  location: string;
  monthYearReceived: string;
  negotiationStrategy: string;
};

type InternshipJobData = {
  internshipCycle: string;
  monthlySalary: Money;
  specialization: string;
  startYear: number;
  title: string;
};

type InternshipOfferFormData = {
  comments: string;
  companyId: string;
  job: InternshipJobData;
  jobType: string;
  location: string;
  monthYearReceived: string;
  negotiationStrategy: string;
};

type OfferDetailsFormData = FullTimeOfferFormData | InternshipOfferFormData;

type SpecificYoe = {
  domain: string;
  yoe: number;
};

type FullTimeExperience = {
  level: string;
  totalCompensation: Money;
};

type InternshipExperience = {
  monthlySalary: Money;
};

type GeneralExperience = {
  companyId: string;
  durationInMonths: number;
  jobType: string;
  specialization: string;
  title: string;
};

type Experience =
  | (FullTimeExperience & GeneralExperience)
  | (GeneralExperience & InternshipExperience);

type Education = {
  endDate: Date;
  field: string;
  school: string;
  startDate: Date;
  type: string;
};

type BackgroundFormData = {
  education: Education;
  experience: Experience;
  specificYoes: Array<SpecificYoe>;
  totalYoe: number;
};

// Export type SubmitOfferFormData
export type SubmitOfferFormData = {
  background: BackgroundFormData;
  offers: Array<OfferDetailsFormData>;
};

function Breadcrumbs() {
  return (
    <p className="mb-4 text-right text-sm text-gray-400">
      {'Offer details > Background > Analysis > Save'}
    </p>
  );
}

export default function OffersSubmissionPage() {
  const [formStep, setFormStep] = useState(0);
  const formMethods = useForm<SubmitOfferFormData>({
    defaultValues: {
      offers: [
        {
          comments: '',
          companyId: 'Shopee',
          job: {
            base: {
              currency: 'USD',
              value: 0,
            },
            bonus: {
              currency: 'USD',
              value: 0,
            },
            level: '',
            specialization: '',
            stocks: {
              currency: 'USD',
              value: 0,
            },
            title: '',
            totalCompensation: {
              currency: 'USD',
              value: 0,
            },
          },
          jobType: 'FULLTIME',
          monthYearReceived: '',
          negotiationStrategy: '',
        },
      ],
    },
  });

  const nextStep = () => setFormStep(formStep + 1);
  const previousStep = () => setFormStep(formStep - 1);
  const formComponents = [
    <OfferDetailsForm key={0} />,
    <BackgroundForm key={1} />,
    <OfferAnalysis key={2} />,
    <OfferProfileSave key={3} />,
  ];

  const onSubmit: SubmitHandler<SubmitOfferFormData> = async () => {
    nextStep();
  };

  return (
    <div className="fixed h-full w-full overflow-y-scroll">
      <div className="mb-20 flex justify-center">
        <div className="my-5 block w-3/4 rounded-lg bg-white py-10 px-10 shadow-lg">
          <Breadcrumbs />
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              {formComponents[formStep]}
              {/* <pre>{JSON.stringify(formMethods.watch(), null, 2)}</pre> */}
              {(formStep === 0 || formStep === 2) && (
                <div className="flex justify-end">
                  <Button
                    icon={ArrowRightIcon}
                    label="Next"
                    variant="secondary"
                    onClick={nextStep}
                  />
                </div>
              )}
              {formStep === 1 && (
                <div className="flex items-center justify-between">
                  <Button
                    icon={ArrowLeftIcon}
                    label="Previous"
                    variant="secondary"
                    onClick={previousStep}
                  />
                  <Button label="Submit" type="submit" variant="primary" />{' '}
                </div>
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
