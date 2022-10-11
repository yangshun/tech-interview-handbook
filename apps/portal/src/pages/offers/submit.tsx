import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@tih/ui';

import BackgroundForm from '~/components/offers/forms/BackgroundForm';
import OfferAnalysis from '~/components/offers/forms/OfferAnalysis';
import OfferDetailsForm from '~/components/offers/forms/OfferDetailsForm';
import OfferProfileSave from '~/components/offers/forms/OfferProfileSave';
import type {
  OfferDetailsFormData,
  SubmitOfferFormData,
} from '~/components/offers/types';
import type { Month } from '~/components/shared/MonthYearPicker';

import { cleanObject, removeInvalidMoneyData } from '~/utils/offers/form';
import { getCurrentMonth, getCurrentYear } from '~/utils/offers/time';
import { trpc } from '~/utils/trpc';

function Breadcrumbs() {
  return (
    <p className="mb-4 text-right text-sm text-gray-400">
      {'Offer details > Background > Analysis > Save'}
    </p>
  );
}

const defaultOfferValues = {
  offers: [
    {
      comments: '',
      companyId: '',
      job: {},
      jobType: 'FULLTIME',
      location: '',
      monthYearReceived: {
        month: getCurrentMonth() as Month,
        year: getCurrentYear(),
      },
      negotiationStrategy: '',
    },
  ],
};

type FormStep = {
  component: JSX.Element;
  hasNext: boolean;
  hasPrevious: boolean;
};

export default function OffersSubmissionPage() {
  const [formStep, setFormStep] = useState(0);
  const formMethods = useForm<SubmitOfferFormData>({
    defaultValues: defaultOfferValues,
    mode: 'all',
  });
  const { handleSubmit, trigger } = formMethods;

  const formSteps: Array<FormStep> = [
    {
      component: <OfferDetailsForm key={0} />,
      hasNext: true,
      hasPrevious: false,
    },
    {
      component: <BackgroundForm key={1} />,
      hasNext: false,
      hasPrevious: true,
    },
    { component: <OfferAnalysis key={2} />, hasNext: true, hasPrevious: false },
    {
      component: <OfferProfileSave key={3} />,
      hasNext: false,
      hasPrevious: false,
    },
  ];

  const nextStep = async (currStep: number) => {
    if (currStep === 0) {
      const result = await trigger('offers');
      if (!result) {
        return;
      }
    }
    setFormStep(formStep + 1);
  };

  const previousStep = () => setFormStep(formStep - 1);

  const createMutation = trpc.useMutation(['offers.profile.create'], {
    onError(error) {
      console.error(error.message);
    },
    onSuccess() {
      alert('offer profile submit success!');
      setFormStep(formStep + 1);
    },
  });

  const onSubmit: SubmitHandler<SubmitOfferFormData> = async (data) => {
    const result = await trigger();
    if (!result) {
      return;
    }
    data = removeInvalidMoneyData(data);
    const background = cleanObject(data.background);
    const offers = data.offers.map((offer: OfferDetailsFormData) => ({
      ...offer,
      monthYearReceived: new Date(
        offer.monthYearReceived.year,
        offer.monthYearReceived.month,
      ),
    }));
    const postData = { background, offers };

    postData.background.specificYoes = data.background.specificYoes.filter(
      (specificYoe) => specificYoe.domain && specificYoe.yoe > 0,
    );

    createMutation.mutate(postData);
  };

  return (
    <div className="fixed h-full w-full overflow-y-scroll">
      <div className="mb-20 flex justify-center">
        <div className="my-5 block w-full max-w-screen-md rounded-lg bg-white py-10 px-10 shadow-lg">
          <Breadcrumbs />
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
