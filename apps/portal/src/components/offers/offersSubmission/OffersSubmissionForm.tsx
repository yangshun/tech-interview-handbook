import { useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { JobType } from '@prisma/client';
import { Button } from '@tih/ui';

import { Breadcrumbs } from '~/components/offers/Breadcrumb';
import OffersProfileSave from '~/components/offers/offersSubmission/OffersProfileSave';
import BackgroundForm from '~/components/offers/offersSubmission/submissionForm/BackgroundForm';
import OfferDetailsForm from '~/components/offers/offersSubmission/submissionForm/OfferDetailsForm';
import type {
  OfferFormData,
  OffersProfileFormData,
} from '~/components/offers/types';
import type { Month } from '~/components/shared/MonthYearPicker';

import {
  cleanObject,
  removeEmptyObjects,
  removeInvalidMoneyData,
} from '~/utils/offers/form';
import { getCurrentMonth, getCurrentYear } from '~/utils/offers/time';
import { trpc } from '~/utils/trpc';

import OffersSubmissionAnalysis from './OffersSubmissionAnalysis';

import type { ProfileAnalysis } from '~/types/offers';

const defaultOfferValues = {
  comments: '',
  companyId: '',
  jobType: JobType.FULLTIME,
  location: '',
  monthYearReceived: {
    month: getCurrentMonth() as Month,
    year: getCurrentYear(),
  },
  negotiationStrategy: '',
};

export const defaultFullTimeOfferValues = {
  ...defaultOfferValues,
  jobType: JobType.FULLTIME,
};

export const defaultInternshipOfferValues = {
  ...defaultOfferValues,
  jobType: JobType.INTERN,
};

const defaultOfferProfileValues = {
  background: {
    educations: [],
    experiences: [{ jobType: JobType.FULLTIME }],
    specificYoes: [],
    totalYoe: 0,
  },
  offers: [defaultOfferValues],
};

type FormStep = {
  component: JSX.Element;
  hasNext: boolean;
  hasPrevious: boolean;
  label: string;
};

type Props = Readonly<{
  initialOfferProfileValues?: OffersProfileFormData;
  profileId?: string;
  token?: string;
}>;

export default function OffersSubmissionForm({
  initialOfferProfileValues = defaultOfferProfileValues,
  profileId: editProfileId = '',
  token: editToken = '',
}: Props) {
  const [formStep, setFormStep] = useState(0);
  const [profileId, setProfileId] = useState(editProfileId);
  const [token, setToken] = useState(editToken);
  const [analysis, setAnalysis] = useState<ProfileAnalysis | null>(null);

  const pageRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () =>
    pageRef.current?.scrollTo({ behavior: 'smooth', top: 0 });
  const formMethods = useForm<OffersProfileFormData>({
    defaultValues: initialOfferProfileValues,
    mode: 'all',
  });
  const { handleSubmit, trigger } = formMethods;

  const generateAnalysisMutation = trpc.useMutation(
    ['offers.analysis.generate'],
    {
      onError(error) {
        console.error(error.message);
      },
      onSuccess(data) {
        setAnalysis(data);
      },
    },
  );

  const formSteps: Array<FormStep> = [
    {
      component: (
        <OfferDetailsForm
          key={0}
          defaultJobType={initialOfferProfileValues.offers[0].jobType}
        />
      ),
      hasNext: true,
      hasPrevious: false,
      label: 'Offers',
    },
    {
      component: <BackgroundForm key={1} />,
      hasNext: false,
      hasPrevious: true,
      label: 'Background',
    },
    {
      component: (
        <OffersProfileSave key={2} profileId={profileId} token={token} />
      ),
      hasNext: true,
      hasPrevious: false,
      label: 'Save profile',
    },
    {
      component: (
        <OffersSubmissionAnalysis
          analysis={analysis}
          isError={generateAnalysisMutation.isError}
          isLoading={generateAnalysisMutation.isLoading}
          profileId={profileId}
          token={token}
        />
      ),
      hasNext: false,
      hasPrevious: true,
      label: 'Analysis',
    },
  ];

  const formStepsLabels = formSteps.map((step) => step.label);

  const nextStep = async (currStep: number) => {
    if (currStep === 0) {
      const result = await trigger('offers');
      if (!result) {
        return;
      }
    }
    setFormStep(formStep + 1);
    scrollToTop();
  };

  const previousStep = () => {
    setFormStep(formStep - 1);
    scrollToTop();
  };

  const mutationpath =
    profileId && token ? 'offers.profile.update' : 'offers.profile.create';

  const createOrUpdateMutation = trpc.useMutation([mutationpath], {
    onError(error) {
      console.error(error.message);
    },
    onSuccess(data) {
      generateAnalysisMutation.mutate({
        profileId: data?.id || '',
      });
      setProfileId(data.id);
      setToken(data.token);
      setFormStep(formStep + 1);
      scrollToTop();
    },
  });

  const onSubmit: SubmitHandler<OffersProfileFormData> = async (data) => {
    const result = await trigger();
    if (!result) {
      return;
    }

    data = removeInvalidMoneyData(data);
    data.offers = removeEmptyObjects(data.offers);

    const background = cleanObject(data.background);
    background.specificYoes = data.background.specificYoes.filter(
      (specificYoe) => specificYoe.domain && specificYoe.yoe > 0,
    );
    if (Object.entries(background.experiences[0]).length === 1) {
      background.experiences = [];
    }

    const offers = data.offers.map((offer: OfferFormData) => ({
      ...offer,
      monthYearReceived: new Date(
        offer.monthYearReceived.year,
        offer.monthYearReceived.month - 1, // Convert month to monthIndex
      ),
    }));

    if (profileId && token) {
      createOrUpdateMutation.mutate({
        background,
        id: profileId,
        offers,
        token,
      });
    } else {
      createOrUpdateMutation.mutate({ background, offers });
    }
  };

  return (
    <div ref={pageRef} className="fixed h-full w-full overflow-y-scroll">
      <div className="mb-20 flex justify-center">
        <div className="my-5 block w-full max-w-screen-md rounded-lg bg-white py-10 px-10 shadow-lg">
          <div className="mb-4 flex justify-end">
            <Breadcrumbs currentStep={formStep} stepLabels={formStepsLabels} />
          </div>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {formSteps[formStep].component}
              {/* <pre>{JSON.stringify(formMethods.watch(), null, 2)}</pre> */}
              {formSteps[formStep].hasNext && (
                <div className="flex justify-end">
                  <Button
                    disabled={false}
                    icon={ArrowRightIcon}
                    label="Next"
                    variant="secondary"
                    onClick={() => nextStep(formStep)}
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
