import { useEffect, useState } from 'react';
import type {
  FieldValues,
  UseFieldArrayRemove,
  UseFieldArrayReturn,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { PlusIcon } from '@heroicons/react/20/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import { JobType } from '@prisma/client';
import { Button, Dialog, HorizontalDivider } from '~/ui';

import {
  defaultFullTimeOfferValues,
  defaultInternshipOfferValues,
} from '../OffersSubmissionForm';
import { FieldError, JobTypeLabel } from '../../constants';
import FormCitiesTypeahead from '../../forms/FormCitiesTypeahead';
import FormCompaniesTypeahead from '../../forms/FormCompaniesTypeahead';
import FormJobTitlesTypeahead from '../../forms/FormJobTitlesTypeahead';
import FormMonthYearPicker from '../../forms/FormMonthYearPicker';
import FormSection from '../../forms/FormSection';
import FormSelect from '../../forms/FormSelect';
import FormTextArea from '../../forms/FormTextArea';
import FormTextInput from '../../forms/FormTextInput';
import { InternshipCycleOptions } from '../../InternshipCycles';
import JobTypeTabs from '../../JobTypeTabs';
import type { OfferFormData } from '../../types';
import { YearsOptions } from '../../Years';
import { CURRENCY_OPTIONS } from '../../../../utils/offers/currency/CurrencyEnum';

type FullTimeOfferDetailsFormProps = Readonly<{
  defaultCurrency: string;
  index: number;
  remove: UseFieldArrayRemove;
}>;

function FullTimeOfferDetailsForm({
  index,
  remove,
  defaultCurrency,
}: FullTimeOfferDetailsFormProps) {
  const { register, formState, setValue, control } = useFormContext<{
    offers: Array<OfferFormData>;
  }>();
  const offerFields = formState.errors.offers?.[index];

  const watchCurrency = useWatch({
    name: `offers.${index}.offersFullTime.totalCompensation.currency`,
  });

  useEffect(() => {
    setValue(
      `offers.${index}.offersFullTime.baseSalary.currency`,
      watchCurrency,
    );
    setValue(`offers.${index}.offersFullTime.bonus.currency`, watchCurrency);
    setValue(`offers.${index}.offersFullTime.stocks.currency`, watchCurrency);
  }, [watchCurrency, index, setValue]);

  return (
    <div className="space-y-8 rounded-lg border border-slate-200 p-6 sm:space-y-16 sm:p-8">
      <FormSection title="Company & Title Information">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-6">
          <Controller
            control={control}
            name={`offers.${index}.offersFullTime.title`}
            render={() => (
              <FormJobTitlesTypeahead
                errorMessage={offerFields?.offersFullTime?.title?.message}
                name={`offers.${index}.offersFullTime.title`}
                required={true}
              />
            )}
            rules={{ required: true }}
          />
          <FormTextInput
            errorMessage={offerFields?.offersFullTime?.level?.message}
            label="Level"
            placeholder="e.g. L4, Junior"
            required={true}
            {...register(`offers.${index}.offersFullTime.level`, {
              required: FieldError.REQUIRED,
            })}
          />
        </div>
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-6">
          <Controller
            control={control}
            name={`offers.${index}.companyId`}
            render={() => (
              <FormCompaniesTypeahead
                errorMessage={offerFields?.companyId?.message}
                names={{
                  label: `offers.${index}.companyName`,
                  value: `offers.${index}.companyId`,
                }}
                required={true}
              />
            )}
            rules={{ required: true }}
          />
          <Controller
            control={control}
            name={`offers.${index}.cityId`}
            render={() => (
              <FormCitiesTypeahead
                errorMessage={offerFields?.cityId?.message}
                names={{
                  label: `offers.${index}.cityName`,
                  value: `offers.${index}.cityId`,
                }}
                required={true}
              />
            )}
            rules={{ required: true }}
          />
        </div>
      </FormSection>
      <FormSection title="Compensation Details">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-6">
          <FormMonthYearPicker
            monthLabel="Date Received"
            monthRequired={true}
            yearLabel=""
            {...register(`offers.${index}.monthYearReceived`, {
              required: FieldError.REQUIRED,
            })}
          />
          <FormTextInput
            endAddOn={
              <FormSelect
                borderStyle="borderless"
                defaultValue={defaultCurrency}
                isLabelHidden={true}
                label="Currency"
                options={CURRENCY_OPTIONS}
                {...register(
                  `offers.${index}.offersFullTime.totalCompensation.currency`,
                  {
                    required: FieldError.REQUIRED,
                  },
                )}
              />
            }
            endAddOnType="element"
            errorMessage={
              offerFields?.offersFullTime?.totalCompensation?.value?.message
            }
            label="Total Compensation (Annual)"
            placeholder="0"
            required={true}
            startAddOn="$"
            startAddOnType="label"
            type="number"
            {...register(
              `offers.${index}.offersFullTime.totalCompensation.value`,
              {
                min: { message: FieldError.NON_NEGATIVE_NUMBER, value: 0 },
                required: FieldError.REQUIRED,
                valueAsNumber: true,
              },
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <FormTextInput
            endAddOn={
              <FormSelect
                borderStyle="borderless"
                defaultValue={defaultCurrency}
                isLabelHidden={true}
                label="Currency"
                options={CURRENCY_OPTIONS}
                {...register(
                  `offers.${index}.offersFullTime.baseSalary.currency`,
                )}
              />
            }
            endAddOnType="element"
            errorMessage={
              offerFields?.offersFullTime?.baseSalary?.value?.message
            }
            label="Base Salary (Annual)"
            placeholder="0"
            startAddOn="$"
            startAddOnType="label"
            type="number"
            {...register(`offers.${index}.offersFullTime.baseSalary.value`, {
              min: { message: FieldError.NON_NEGATIVE_NUMBER, value: 0 },
              valueAsNumber: true,
            })}
          />
          <FormTextInput
            endAddOn={
              <FormSelect
                borderStyle="borderless"
                defaultValue={defaultCurrency}
                isLabelHidden={true}
                label="Currency"
                options={CURRENCY_OPTIONS}
                {...register(`offers.${index}.offersFullTime.bonus.currency`)}
              />
            }
            endAddOnType="element"
            errorMessage={offerFields?.offersFullTime?.bonus?.value?.message}
            label="Bonus (Annual)"
            placeholder="0"
            startAddOn="$"
            startAddOnType="label"
            type="number"
            {...register(`offers.${index}.offersFullTime.bonus.value`, {
              min: { message: FieldError.NON_NEGATIVE_NUMBER, value: 0 },
              valueAsNumber: true,
            })}
          />
          <FormTextInput
            endAddOn={
              <FormSelect
                borderStyle="borderless"
                defaultValue={defaultCurrency}
                isLabelHidden={true}
                label="Currency"
                options={CURRENCY_OPTIONS}
                {...register(`offers.${index}.offersFullTime.stocks.currency`)}
              />
            }
            endAddOnType="element"
            errorMessage={offerFields?.offersFullTime?.stocks?.value?.message}
            label="Stocks (Annual)"
            placeholder="0"
            startAddOn="$"
            startAddOnType="label"
            type="number"
            {...register(`offers.${index}.offersFullTime.stocks.value`, {
              min: { message: FieldError.NON_NEGATIVE_NUMBER, value: 0 },
              valueAsNumber: true,
            })}
          />
        </div>
      </FormSection>
      <FormSection title="Additional Information">
        <FormTextArea
          label="Negotiation Strategy / Interview Performance"
          placeholder="e.g. Did well in the behavioral interview / Used competing offers to negotiate for a higher salary"
          {...register(`offers.${index}.negotiationStrategy`)}
        />
        <FormTextArea
          label="Comments"
          placeholder="e.g. Benefits offered by the company"
          {...register(`offers.${index}.comments`)}
        />
        {index > 0 && (
          <div className="space-y-4 sm:space-y-6">
            <HorizontalDivider />
            <div className="flex justify-end">
              <Button
                icon={TrashIcon}
                label="Delete"
                variant="tertiary"
                onClick={() => {
                  remove(index);
                }}
              />
            </div>
          </div>
        )}
      </FormSection>
    </div>
  );
}

type InternshipOfferDetailsFormProps = Readonly<{
  defaultCurrency: string;
  index: number;
  remove: UseFieldArrayRemove;
}>;

function InternshipOfferDetailsForm({
  index,
  remove,
  defaultCurrency,
}: InternshipOfferDetailsFormProps) {
  const { register, formState, control } = useFormContext<{
    offers: Array<OfferFormData>;
  }>();
  const watchStartYear = useWatch({
    name: `offers.${index}.offersIntern.startYear`,
  });
  const offerFields = formState.errors.offers?.[index];

  return (
    <div className="space-y-8 rounded-lg border border-slate-200 p-6 sm:space-y-16 sm:p-8">
      <FormSection title="Company & Title Information">
        <Controller
          control={control}
          name={`offers.${index}.offersIntern.title`}
          render={() => (
            <FormJobTitlesTypeahead
              errorMessage={offerFields?.offersIntern?.title?.message}
              name={`offers.${index}.offersIntern.title`}
              required={true}
            />
          )}
          rules={{ required: true }}
        />
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-6">
          <Controller
            control={control}
            name={`offers.${index}.companyId`}
            render={() => (
              <FormCompaniesTypeahead
                errorMessage={offerFields?.companyId?.message}
                names={{
                  label: `offers.${index}.companyName`,
                  value: `offers.${index}.companyId`,
                }}
                required={true}
              />
            )}
            rules={{ required: true }}
          />
          <Controller
            control={control}
            name={`offers.${index}.cityId`}
            render={() => (
              <FormCitiesTypeahead
                errorMessage={offerFields?.cityId?.message}
                names={{
                  label: `offers.${index}.cityName`,
                  value: `offers.${index}.cityId`,
                }}
                required={true}
              />
            )}
            rules={{ required: true }}
          />
        </div>
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-6">
          <FormSelect
            display="block"
            errorMessage={offerFields?.offersIntern?.internshipCycle?.message}
            label="Internship Cycle"
            options={InternshipCycleOptions}
            required={true}
            {...register(`offers.${index}.offersIntern.internshipCycle`, {
              required: FieldError.REQUIRED,
            })}
          />
          <FormSelect
            display="block"
            errorMessage={offerFields?.offersIntern?.startYear?.message}
            label="Internship Year"
            options={YearsOptions(watchStartYear)}
            required={true}
            {...register(`offers.${index}.offersIntern.startYear`, {
              required: FieldError.REQUIRED,
              valueAsNumber: true,
            })}
          />
        </div>
      </FormSection>
      <FormSection title="Compensation Details">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-6">
          <FormMonthYearPicker
            monthLabel="Date Received"
            monthRequired={true}
            yearLabel=""
            {...register(`offers.${index}.monthYearReceived`, {
              required: FieldError.REQUIRED,
            })}
          />
          <FormTextInput
            endAddOn={
              <FormSelect
                borderStyle="borderless"
                defaultValue={defaultCurrency}
                isLabelHidden={true}
                label="Currency"
                options={CURRENCY_OPTIONS}
                {...register(
                  `offers.${index}.offersIntern.monthlySalary.currency`,
                  {
                    required: FieldError.REQUIRED,
                  },
                )}
              />
            }
            endAddOnType="element"
            errorMessage={
              offerFields?.offersIntern?.monthlySalary?.value?.message
            }
            label="Salary (Monthly)"
            placeholder="0"
            required={true}
            startAddOn="$"
            startAddOnType="label"
            type="number"
            {...register(`offers.${index}.offersIntern.monthlySalary.value`, {
              min: { message: FieldError.NON_NEGATIVE_NUMBER, value: 0 },
              required: FieldError.REQUIRED,
              valueAsNumber: true,
            })}
          />
        </div>
      </FormSection>
      <FormSection title="Additional Information">
        <FormTextArea
          label="Negotiation Strategy / Interview Performance"
          placeholder="e.g. Did well in the behavioral interview. Used competing offers to negotiate for a higher salary."
          {...register(`offers.${index}.negotiationStrategy`)}
        />
        <FormTextArea
          label="Comments"
          placeholder="e.g. Encountered similar questions using the Technical Interview Handbook."
          {...register(`offers.${index}.comments`)}
        />
      </FormSection>
      {index > 0 && (
        <div className="space-y-4 sm:space-y-6">
          <HorizontalDivider />
          <div className="flex justify-end">
            <Button
              icon={TrashIcon}
              label="Delete"
              variant="tertiary"
              onClick={() => {
                remove(index);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

type OfferDetailsFormArrayProps = Readonly<{
  defaultCurrency: string;
  fieldArrayValues: UseFieldArrayReturn<FieldValues, 'offers', 'id'>;
  jobType: JobType;
}>;

function OfferDetailsFormArray({
  fieldArrayValues,
  jobType,
  defaultCurrency,
}: OfferDetailsFormArrayProps) {
  const { append, remove, fields } = fieldArrayValues;

  return (
    <div className="space-y-8">
      {fields.map((item, index) => {
        return (
          <div key={item.id}>
            {jobType === JobType.FULLTIME ? (
              <FullTimeOfferDetailsForm
                defaultCurrency={defaultCurrency}
                index={index}
                remove={remove}
              />
            ) : (
              <InternshipOfferDetailsForm
                defaultCurrency={defaultCurrency}
                index={index}
                remove={remove}
              />
            )}
          </div>
        );
      })}
      <Button
        display="block"
        icon={PlusIcon}
        label="Add another offer"
        size="lg"
        variant="secondary"
        onClick={() =>
          append(
            jobType === JobType.FULLTIME
              ? defaultFullTimeOfferValues
              : defaultInternshipOfferValues,
          )
        }
      />
    </div>
  );
}

type OfferDetailsFormProps = Readonly<{
  defaultCurrency: string;
}>;

export default function OfferDetailsForm({
  defaultCurrency,
}: OfferDetailsFormProps) {
  const watchJobType = useWatch({
    name: `offers.0.jobType`,
  });
  const [jobType, setJobType] = useState(watchJobType as JobType);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { control } = useFormContext();
  const fieldArrayValues = useFieldArray({ control, name: 'offers' });
  const { append, remove } = fieldArrayValues;

  const toggleJobType = () => {
    remove();
    if (jobType === JobType.FULLTIME) {
      setJobType(JobType.INTERN);
      append(defaultInternshipOfferValues);
    } else {
      setJobType(JobType.FULLTIME);
      append(defaultFullTimeOfferValues);
    }
  };

  const switchJobTypeLabel = () =>
    jobType === JobType.FULLTIME ? JobTypeLabel.INTERN : JobTypeLabel.FULLTIME;

  return (
    <div className="space-y-6">
      <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-center sm:text-4xl">
        Fill in your offer details
      </h2>
      <JobTypeTabs
        value={jobType}
        onChange={(newJobType) => {
          if (newJobType === jobType) {
            return;
          }
          setDialogOpen(true);
        }}
      />
      <OfferDetailsFormArray
        defaultCurrency={defaultCurrency}
        fieldArrayValues={fieldArrayValues}
        jobType={jobType}
      />
      <Dialog
        isShown={isDialogOpen}
        primaryButton={
          <Button
            display="block"
            label="Switch"
            variant="primary"
            onClick={() => {
              setDialogOpen(false);
              toggleJobType();
            }}
          />
        }
        secondaryButton={
          <Button
            display="block"
            label="Cancel"
            variant="tertiary"
            onClick={() => setDialogOpen(false)}
          />
        }
        title={`Switch to ${switchJobTypeLabel()}`}
        onClose={() => setDialogOpen(false)}>
        {`Are you sure you want to switch to ${switchJobTypeLabel()}? The data you
        entered in the ${JobTypeLabel[jobType]} section will disappear.`}
      </Dialog>
    </div>
  );
}
