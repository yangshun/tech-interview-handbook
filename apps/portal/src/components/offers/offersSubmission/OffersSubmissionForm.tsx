import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { JobType } from '@prisma/client';
import { Button, useToast } from '@tih/ui';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';
import type { BreadcrumbStep } from '~/components/offers/Breadcrumbs';
import { Breadcrumbs } from '~/components/offers/Breadcrumbs';
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

const defaultOfferValues = {
  cityId: '',
  comments: '',
  companyId: '',
  jobTitle: '',
  jobType: JobType.FULLTIME,
  monthYearReceived: {
    month: getCurrentMonth() as Month,
    year: getCurrentYear(),
  },
  negotiationStrategy: '',
};

export const defaultFullTimeOfferValues = {
  ...defaultOfferValues,
  jobType: JobType.FULLTIME,
  offersFullTime: {
    baseSalary: {
      currency: 'SGD',
      value: null,
    },
    bonus: {
      currency: 'SGD',
      value: null,
    },
    level: '',
    stocks: {
      currency: 'SGD',
      value: null,
    },
    totalCompensation: {
      currency: 'SGD',
      value: null,
    },
  },
};

export const defaultInternshipOfferValues = {
  ...defaultOfferValues,
  jobType: JobType.INTERN,
  offersIntern: {
    internshipCycle: null,
    monthlySalary: {
      currency: 'SGD',
      value: null,
    },
    startYear: null,
  },
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
  const [step, setStep] = useState(0);
  const [params, setParams] = useState({
    profileId: editProfileId,
    token: editToken,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { event: gaEvent } = useGoogleAnalytics();
  const { showToast } = useToast();
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () =>
    pageRef.current?.scrollTo({ behavior: 'smooth', top: 0 });
  const formMethods = useForm<OffersProfileFormData>({
    defaultValues: initialOfferProfileValues,
    mode: 'all',
  });
  const {
    handleSubmit,
    trigger,
    formState: { isSubmitting, isSubmitSuccessful },
  } = formMethods;

  const generateAnalysisMutation = trpc.useMutation(
    ['offers.analysis.generate'],
    {
      onError(error) {
        console.error(error.message);
      },
      onSuccess() {
        router.push(
          `/offers/submit/result/${params.profileId}?token=${params.token}`,
        );
      },
    },
  );

  const steps = [<OfferDetailsForm key={0} />, <BackgroundForm key={1} />];

  const breadcrumbSteps: Array<BreadcrumbStep> = [
    {
      label: 'Offers',
      step: 0,
    },
    {
      label: 'Background',
      step: 1,
    },
    {
      label: 'Save profile',
    },
    {
      label: 'Analysis',
    },
  ];

  const setStepWithValidation = async (nextStep: number) => {
    if (nextStep === 1) {
      const result = await trigger('offers');
      if (!result) {
        return;
      }
    }
    setStep(nextStep);
  };

  const mutationpath =
    editProfileId && editToken
      ? 'offers.profile.update'
      : 'offers.profile.create';

  const createOrUpdateMutation = trpc.useMutation([mutationpath], {
    onError(error) {
      console.error(error.message);
      showToast({
        title:
          editProfileId && editToken
            ? 'Error updating offer profile.'
            : 'Error creating offer profile',
        variant: 'failure',
      });
    },
    onSuccess(data) {
      setParams({ profileId: data.id, token: data.token });
      setIsSubmitted(true);
      showToast({
        title:
          editProfileId && editToken
            ? 'Offer profile updated successfully!'
            : 'Offer profile created successfully!',
        variant: 'success',
      });
    },
  });

  const onSubmit: SubmitHandler<OffersProfileFormData> = async (data) => {
    const result = await trigger();
    if (!result || isSubmitting || isSubmitSuccessful) {
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

    if (params.profileId && params.token) {
      createOrUpdateMutation.mutate({
        background,
        id: params.profileId,
        offers,
        token: params.token,
      });
    } else {
      createOrUpdateMutation.mutate({ background, offers });
    }
    gaEvent({
      action: 'offers.submit_profile',
      category: 'submission',
      label: 'Submit profile',
    });
  };

  useEffect(() => {
    if (isSubmitted) {
      generateAnalysisMutation.mutate({
        profileId: params.profileId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted, params]);

  useEffect(() => {
    scrollToTop();
  }, [step]);

  useEffect(() => {
    const warningText =
      'Leave this page? Changes that you made will not be saved.';
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return (e.returnValue = warningText);
    };
    const handleRouteChange = (url: string) => {
      if (url.includes('/offers/submit/result')) {
        return;
      }
      if (window.confirm(warningText)) {
        return;
      }
      router.events.emit('routeChangeError');
      throw 'routeChange aborted.';
    };
    window.addEventListener('beforeunload', handleWindowClose);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      router.events.off('routeChangeStart', handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={pageRef} className="w-full">
      <div className="flex justify-center">
        <div className="block w-full max-w-screen-md overflow-hidden rounded-lg sm:shadow-lg md:my-10">
          <div className="flex justify-center bg-slate-100 px-4 py-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              currentStep={step}
              setStep={setStepWithValidation}
              steps={breadcrumbSteps}
            />
          </div>
          <div className="bg-white p-6 sm:p-10">
            <FormProvider {...formMethods}>
              <form
                className="space-y-6 text-sm"
                onSubmit={handleSubmit(onSubmit)}>
                {steps[step]}
                {step === 0 && (
                  <div className="flex justify-end">
                    <Button
                      disabled={false}
                      icon={ArrowRightIcon}
                      label="Next"
                      variant="primary"
                      onClick={() => {
                        setStepWithValidation(step + 1);
                        gaEvent({
                          action: 'offers.profile_submission_navigate_next',
                          category: 'submission',
                          label: 'Navigate next',
                        });
                      }}
                    />
                  </div>
                )}
                {step === 1 && (
                  <div className="flex items-center justify-between">
                    <Button
                      addonPosition="start"
                      icon={ArrowLeftIcon}
                      label="Previous"
                      variant="secondary"
                      onClick={() => {
                        setStep(step - 1);
                        gaEvent({
                          action: 'offers.profile_submission_navigation_back',
                          category: 'submission',
                          label: 'Navigate back',
                        });
                      }}
                    />
                    <Button
                      disabled={isSubmitting || isSubmitSuccessful}
                      icon={ArrowRightIcon}
                      isLoading={isSubmitting || isSubmitSuccessful}
                      label="Submit"
                      type="submit"
                      variant="primary"
                    />
                  </div>
                )}
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
