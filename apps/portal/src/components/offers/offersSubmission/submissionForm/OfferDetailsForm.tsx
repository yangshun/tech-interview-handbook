import { useEffect, useState } from 'react';
import type {
  FieldValues,
  UseFieldArrayRemove,
  UseFieldArrayReturn,
} from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { PlusIcon } from '@heroicons/react/20/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import { JobType } from '@prisma/client';
import { Button, Dialog } from '@tih/ui';

import CompaniesTypeahead from '~/components/shared/CompaniesTypeahead';
import JobTitlesTypeahead from '~/components/shared/JobTitlesTypahead';

import {
  defaultFullTimeOfferValues,
  defaultInternshipOfferValues,
} from '../OffersSubmissionForm';
import {
  emptyOption,
  FieldError,
  internshipCycleOptions,
  locationOptions,
  yearOptions,
} from '../../constants';
import FormMonthYearPicker from '../../forms/FormMonthYearPicker';
import FormSelect from '../../forms/FormSelect';
import FormTextArea from '../../forms/FormTextArea';
import FormTextInput from '../../forms/FormTextInput';
import type { OfferFormData } from '../../types';
import { JobTypeLabel } from '../../types';
import {
  Currency,
  CURRENCY_OPTIONS,
} from '../../../../utils/offers/currency/CurrencyEnum';

type FullTimeOfferDetailsFormProps = Readonly<{
  index: number;
  remove: UseFieldArrayRemove;
}>;

function FullTimeOfferDetailsForm({
  index,
  remove,
}: FullTimeOfferDetailsFormProps) {
  const { register, formState, setValue } = useFormContext<{
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
    <div className="my-5 rounded-lg border border-slate-200 px-10 py-5">
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <div>
          <JobTitlesTypeahead
            required={true}
            onSelect={({ value }) =>
              setValue(`offers.${index}.offersFullTime.title`, value)
            }
          />
        </div>
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
      <div className="mb-5 flex grid grid-cols-2 space-x-3">
        <div>
          <CompaniesTypeahead
            required={true}
            onSelect={({ value }) =>
              setValue(`offers.${index}.companyId`, value)
            }
          />
        </div>
        <FormSelect
          display="block"
          errorMessage={offerFields?.location?.message}
          label="Location"
          options={locationOptions}
          placeholder={emptyOption}
          required={true}
          {...register(`offers.${index}.location`, {
            required: FieldError.REQUIRED,
          })}
        />
      </div>
      <div className="mb-5 flex grid grid-cols-2 items-start space-x-3">
        <FormMonthYearPicker
          monthLabel="Date Received"
          monthRequired={true}
          yearLabel=""
          {...register(`offers.${index}.monthYearReceived`, {
            required: FieldError.REQUIRED,
          })}
        />
      </div>
      <div className="mb-5">
        <FormTextInput
          endAddOn={
            <FormSelect
              borderStyle="borderless"
              defaultValue={Currency.SGD}
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
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormTextInput
          endAddOn={
            <FormSelect
              borderStyle="borderless"
              defaultValue={Currency.SGD}
              isLabelHidden={true}
              label="Currency"
              options={CURRENCY_OPTIONS}
              {...register(
                `offers.${index}.offersFullTime.baseSalary.currency`,
              )}
            />
          }
          endAddOnType="element"
          errorMessage={offerFields?.offersFullTime?.baseSalary?.value?.message}
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
              defaultValue={Currency.SGD}
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
      </div>
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormTextInput
          endAddOn={
            <FormSelect
              borderStyle="borderless"
              defaultValue={Currency.SGD}
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
      <div className="mb-5">
        <FormTextArea
          label="Negotiation Strategy / Interview Performance"
          placeholder="e.g. Did well in the behavioral interview / Used competing offers to negotiate for a higher salary"
          {...register(`offers.${index}.negotiationStrategy`)}
        />
      </div>
      <div className="mb-5">
        <FormTextArea
          label="Comments"
          placeholder="e.g. Benefits offered by the company"
          {...register(`offers.${index}.comments`)}
        />
      </div>
      <div className="flex justify-end">
        {index > 0 && (
          <Button
            icon={TrashIcon}
            label="Delete"
            variant="secondary"
            onClick={() => remove(index)}
          />
        )}
      </div>
    </div>
  );
}

type InternshipOfferDetailsFormProps = Readonly<{
  index: number;
  remove: UseFieldArrayRemove;
}>;

function InternshipOfferDetailsForm({
  index,
  remove,
}: InternshipOfferDetailsFormProps) {
  const { register, formState, setValue } = useFormContext<{
    offers: Array<OfferFormData>;
  }>();

  const offerFields = formState.errors.offers?.[index];

  return (
    <div className="my-5 rounded-lg border border-slate-200 px-10 py-5">
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <div>
          <JobTitlesTypeahead
            required={true}
            onSelect={({ value }) =>
              setValue(`offers.${index}.offersIntern.title`, value)
            }
          />
        </div>
      </div>
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <div>
          <CompaniesTypeahead
            required={true}
            onSelect={({ value }) =>
              setValue(`offers.${index}.companyId`, value)
            }
          />
        </div>
        <FormSelect
          display="block"
          errorMessage={offerFields?.location?.message}
          label="Location"
          options={locationOptions}
          placeholder={emptyOption}
          required={true}
          {...register(`offers.${index}.location`, {
            required: FieldError.REQUIRED,
          })}
        />
      </div>
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormSelect
          display="block"
          errorMessage={offerFields?.offersIntern?.internshipCycle?.message}
          label="Internship Cycle"
          options={internshipCycleOptions}
          placeholder={emptyOption}
          required={true}
          {...register(`offers.${index}.offersIntern.internshipCycle`, {
            required: FieldError.REQUIRED,
          })}
        />
        <FormSelect
          display="block"
          errorMessage={offerFields?.offersIntern?.startYear?.message}
          label="Internship Year"
          options={yearOptions}
          placeholder={emptyOption}
          required={true}
          {...register(`offers.${index}.offersIntern.startYear`, {
            required: FieldError.REQUIRED,
            valueAsNumber: true,
          })}
        />
      </div>
      <div className="mb-5">
        <FormMonthYearPicker
          monthLabel="Date Received"
          monthRequired={true}
          yearLabel=""
          {...register(`offers.${index}.monthYearReceived`, {
            required: FieldError.REQUIRED,
          })}
        />
      </div>
      <div className="mb-5">
        <FormTextInput
          endAddOn={
            <FormSelect
              borderStyle="borderless"
              defaultValue={Currency.SGD}
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
      <div className="mb-5">
        <FormTextArea
          label="Negotiation Strategy / Interview Performance"
          placeholder="e.g. Did well in the behavioral interview. Used competing offers to negotiate for a higher salary."
          {...register(`offers.${index}.negotiationStrategy`)}
        />
      </div>
      <div className="mb-5">
        <FormTextArea
          label="Comments"
          placeholder="e.g. Encountered similar questions using the Technical Interview Handbook."
          {...register(`offers.${index}.comments`)}
        />
      </div>
      <div className="flex justify-end">
        {index > 0 && (
          <Button
            icon={TrashIcon}
            label="Delete"
            variant="secondary"
            onClick={() => {
              remove(index);
            }}
          />
        )}
      </div>
    </div>
  );
}

type OfferDetailsFormArrayProps = Readonly<{
  fieldArrayValues: UseFieldArrayReturn<FieldValues, 'offers', 'id'>;
  jobType: JobType;
}>;

function OfferDetailsFormArray({
  fieldArrayValues,
  jobType,
}: OfferDetailsFormArrayProps) {
  const { append, remove, fields } = fieldArrayValues;

  return (
    <div>
      {fields.map((item, index) => {
        return (
          <div key={item.id}>
            {jobType === JobType.FULLTIME ? (
              <FullTimeOfferDetailsForm index={index} remove={remove} />
            ) : (
              <InternshipOfferDetailsForm index={index} remove={remove} />
            )}
          </div>
        );
      })}
      <Button
        display="block"
        icon={PlusIcon}
        label="Add another offer"
        size="lg"
        variant="tertiary"
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
  defaultJobType?: JobType;
}>;

export default function OfferDetailsForm({
  defaultJobType = JobType.FULLTIME,
}: OfferDetailsFormProps) {
  const [jobType, setJobType] = useState(defaultJobType);
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
    <div className="mb-5">
      <h5 className="mb-8 text-center text-4xl font-bold text-slate-900">
        Fill in your offer details
      </h5>
      <div className="flex w-full justify-center">
        <div className="mx-5 w-1/3">
          <Button
            display="block"
            label={JobTypeLabel.FULLTIME}
            size="md"
            variant={jobType === JobType.FULLTIME ? 'secondary' : 'tertiary'}
            onClick={() => {
              if (jobType === JobType.FULLTIME) {
                return;
              }
              setDialogOpen(true);
            }}
          />
        </div>
        <div className="mx-5 w-1/3">
          <Button
            display="block"
            label={JobTypeLabel.INTERN}
            size="md"
            variant={jobType === JobType.INTERN ? 'secondary' : 'tertiary'}
            onClick={() => {
              if (jobType === JobType.INTERN) {
                return;
              }
              setDialogOpen(true);
            }}
          />
        </div>
      </div>
      <OfferDetailsFormArray
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
              toggleJobType();
              setDialogOpen(false);
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
