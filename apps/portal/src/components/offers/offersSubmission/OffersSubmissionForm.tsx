import { useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@tih/ui';

import { Breadcrumbs } from '~/components/offers/Breadcrumb';
import OfferAnalysis from '~/components/offers/offersSubmission/analysis/OfferAnalysis';
import OfferProfileSave from '~/components/offers/offersSubmission/OfferProfileSave';
import BackgroundForm from '~/components/offers/offersSubmission/submissionForm/BackgroundForm';
import OfferDetailsForm from '~/components/offers/offersSubmission/submissionForm/OfferDetailsForm';
import type {
  OfferFormData,
  OffersProfileFormData,
} from '~/components/offers/types';
import { JobType } from '~/components/offers/types';
import type { Month } from '~/components/shared/MonthYearPicker';

import { cleanObject, removeInvalidMoneyData } from '~/utils/offers/form';
import { getCurrentMonth, getCurrentYear } from '~/utils/offers/time';
import { trpc } from '~/utils/trpc';

import type { CreateOfferProfileResponse } from '~/types/offers';

const defaultOfferValues = {
  comments: '',
  companyId: '',
  jobType: JobType.FullTime,
  location: '',
  monthYearReceived: {
    month: getCurrentMonth() as Month,
    year: getCurrentYear(),
  },
  negotiationStrategy: '',
};

export const defaultFullTimeOfferValues = {
  ...defaultOfferValues,
  jobType: JobType.FullTime,
};

export const defaultInternshipOfferValues = {
  ...defaultOfferValues,
  jobType: JobType.Intern,
};

const defaultOfferProfileValues = {
  background: {
    educations: [],
    experiences: [{ jobType: JobType.FullTime }],
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
  profileId,
  token,
}: Props) {
  const [formStep, setFormStep] = useState(0);
  const [createProfileResponse, setCreateProfileResponse] =
    useState<CreateOfferProfileResponse>({
      id: profileId || '',
      token: token || '',
    });

  const pageRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () =>
    pageRef.current?.scrollTo({ behavior: 'smooth', top: 0 });
  const formMethods = useForm<OffersProfileFormData>({
    defaultValues: initialOfferProfileValues,
    mode: 'all',
  });
  const { handleSubmit, trigger } = formMethods;

  const formSteps: Array<FormStep> = [
    {
      component: <OfferDetailsForm key={0} />,
      hasNext: true,
      hasPrevious: false,
      label: 'Offer details',
    },
    {
      component: <BackgroundForm key={1} />,
      hasNext: false,
      hasPrevious: true,
      label: 'Background',
    },
    {
      component: <OfferAnalysis key={2} profileId={createProfileResponse.id} />,
      hasNext: true,
      hasPrevious: false,
      label: 'Analysis',
    },
    {
      component: (
        <OfferProfileSave
          key={3}
          profileId={createProfileResponse.id || ''}
          token={createProfileResponse.token}
        />
      ),
      hasNext: false,
      hasPrevious: false,
      label: 'Save',
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

  const generateAnalysisMutation = trpc.useMutation(
    ['offers.analysis.generate'],
    {
      onError(error) {
        console.error(error.message);
      },
    },
  );

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
      setCreateProfileResponse(data);
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
