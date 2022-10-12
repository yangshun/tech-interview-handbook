import { useEffect, useState } from 'react';
import type { FieldValues, UseFieldArrayReturn } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { PlusIcon } from '@heroicons/react/20/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Button, Dialog } from '@tih/ui';

import FormMonthYearPicker from './components/FormMonthYearPicker';
import FormSelect from './components/FormSelect';
import FormTextArea from './components/FormTextArea';
import FormTextInput from './components/FormTextInput';
import {
  companyOptions,
  emptyOption,
  FieldError,
  internshipCycleOptions,
  locationOptions,
  titleOptions,
  yearOptions,
} from '../constants';
import type {
  FullTimeOfferDetailsFormData,
  InternshipOfferDetailsFormData,
} from '../types';
import { JobTypeLabel } from '../types';
import { JobType } from '../types';
import { CURRENCY_OPTIONS } from '../../../utils/offers/currency/CurrencyEnum';

type FullTimeOfferDetailsFormProps = Readonly<{
  index: number;
  setDialogOpen: (isOpen: boolean) => void;
}>;

function FullTimeOfferDetailsForm({
  index,
  setDialogOpen,
}: FullTimeOfferDetailsFormProps) {
  const { register, formState, setValue } = useFormContext<{
    offers: Array<FullTimeOfferDetailsFormData>;
  }>();
  const offerFields = formState.errors.offers?.[index];

  const watchCurrency = useWatch({
    name: `offers.${index}.job.totalCompensation.currency`,
  });

  useEffect(() => {
    setValue(`offers.${index}.job.base.currency`, watchCurrency);
    setValue(`offers.${index}.job.bonus.currency`, watchCurrency);
    setValue(`offers.${index}.job.stocks.currency`, watchCurrency);
  }, [watchCurrency, index, setValue]);

  return (
    <div className="my-5 rounded-lg border border-gray-200 px-10 py-5">
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormSelect
          display="block"
          errorMessage={offerFields?.job?.title?.message}
          label="Title"
          options={titleOptions}
          placeholder={emptyOption}
          required={true}
          {...register(`offers.${index}.job.title`, {
            required: FieldError.Required,
          })}
        />
        <FormTextInput
          errorMessage={offerFields?.job?.specialization?.message}
          label="Focus / Specialization"
          placeholder="e.g. Front End"
          required={true}
          {...register(`offers.${index}.job.specialization`, {
            required: FieldError.Required,
          })}
        />
      </div>
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormSelect
          display="block"
          errorMessage={offerFields?.companyId?.message}
          label="Company"
          options={companyOptions}
          placeholder={emptyOption}
          required={true}
          {...register(`offers.${index}.companyId`, {
            required: FieldError.Required,
          })}
        />
        <FormTextInput
          errorMessage={offerFields?.job?.level?.message}
          label="Level"
          placeholder="e.g. L4, Junior"
          required={true}
          {...register(`offers.${index}.job.level`, {
            required: FieldError.Required,
          })}
        />
      </div>
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormSelect
          display="block"
          errorMessage={offerFields?.location?.message}
          label="Location"
          options={locationOptions}
          placeholder={emptyOption}
          required={true}
          {...register(`offers.${index}.location`, {
            required: FieldError.Required,
          })}
        />
        <FormMonthYearPicker
          monthLabel="Date Received"
          monthRequired={true}
          yearLabel=""
          {...register(`offers.${index}.monthYearReceived`, {
            required: FieldError.Required,
          })}
        />
      </div>
      <div className="mb-5">
        <FormTextInput
          endAddOn={
            <FormSelect
              borderStyle="borderless"
              isLabelHidden={true}
              label="Currency"
              options={CURRENCY_OPTIONS}
              {...register(`offers.${index}.job.totalCompensation.currency`, {
                required: FieldError.Required,
              })}
            />
          }
          endAddOnType="element"
          errorMessage={offerFields?.job?.totalCompensation?.value?.message}
          label="Total Compensation (Annual)"
          placeholder="0"
          required={true}
          startAddOn="$"
          startAddOnType="label"
          type="number"
          {...register(`offers.${index}.job.totalCompensation.value`, {
            min: { message: FieldError.NonNegativeNumber, value: 0 },
            required: FieldError.Required,
            valueAsNumber: true,
          })}
        />
      </div>
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormTextInput
          endAddOn={
            <FormSelect
              borderStyle="borderless"
              isLabelHidden={true}
              label="Currency"
              options={CURRENCY_OPTIONS}
              {...register(`offers.${index}.job.base.currency`, {
                required: FieldError.Required,
              })}
            />
          }
          endAddOnType="element"
          errorMessage={offerFields?.job?.base?.value?.message}
          label="Base Salary (Annual)"
          placeholder="0"
          required={true}
          startAddOn="$"
          startAddOnType="label"
          type="number"
          {...register(`offers.${index}.job.base.value`, {
            min: { message: FieldError.NonNegativeNumber, value: 0 },
            required: FieldError.Required,
            valueAsNumber: true,
          })}
        />
        <FormTextInput
          endAddOn={
            <FormSelect
              borderStyle="borderless"
              isLabelHidden={true}
              label="Currency"
              options={CURRENCY_OPTIONS}
              {...register(`offers.${index}.job.bonus.currency`, {
                required: FieldError.Required,
              })}
            />
          }
          endAddOnType="element"
          errorMessage={offerFields?.job?.bonus?.value?.message}
          label="Bonus (Annual)"
          placeholder="0"
          required={true}
          startAddOn="$"
          startAddOnType="label"
          type="number"
          {...register(`offers.${index}.job.bonus.value`, {
            min: { message: FieldError.NonNegativeNumber, value: 0 },
            required: FieldError.Required,
            valueAsNumber: true,
          })}
        />
      </div>
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormTextInput
          endAddOn={
            <FormSelect
              borderStyle="borderless"
              isLabelHidden={true}
              label="Currency"
              options={CURRENCY_OPTIONS}
              {...register(`offers.${index}.job.stocks.currency`, {
                required: FieldError.Required,
              })}
            />
          }
          endAddOnType="element"
          errorMessage={offerFields?.job?.stocks?.value?.message}
          label="Stocks (Annual)"
          placeholder="0"
          required={true}
          startAddOn="$"
          startAddOnType="label"
          type="number"
          {...register(`offers.${index}.job.stocks.value`, {
            min: { message: FieldError.NonNegativeNumber, value: 0 },
            required: FieldError.Required,
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
            onClick={() => setDialogOpen(true)}
          />
        )}
      </div>
    </div>
  );
}

type InternshipOfferDetailsFormProps = Readonly<{
  index: number;
  setDialogOpen: (isOpen: boolean) => void;
}>;

function InternshipOfferDetailsForm({
  index,
  setDialogOpen,
}: InternshipOfferDetailsFormProps) {
  const { register, formState } = useFormContext<{
    offers: Array<InternshipOfferDetailsFormData>;
  }>();

  const offerFields = formState.errors.offers?.[index];

  return (
    <div className="my-5 rounded-lg border border-gray-200 px-10 py-5">
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormSelect
          display="block"
          errorMessage={offerFields?.job?.title?.message}
          label="Title"
          options={titleOptions}
          placeholder={emptyOption}
          required={true}
          {...register(`offers.${index}.job.title`, {
            minLength: 1,
            required: FieldError.Required,
          })}
        />
        <FormTextInput
          errorMessage={offerFields?.job?.specialization?.message}
          label="Focus / Specialization"
          placeholder="e.g. Front End"
          required={true}
          {...register(`offers.${index}.job.specialization`, {
            minLength: 1,
            required: FieldError.Required,
          })}
        />
      </div>
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormSelect
          display="block"
          errorMessage={offerFields?.companyId?.message}
          label="Company"
          options={companyOptions}
          placeholder={emptyOption}
          required={true}
          {...register(`offers.${index}.companyId`, {
            required: FieldError.Required,
          })}
        />
        <FormSelect
          display="block"
          errorMessage={offerFields?.location?.message}
          label="Location"
          options={locationOptions}
          placeholder={emptyOption}
          required={true}
          {...register(`offers.${index}.location`, {
            required: FieldError.Required,
          })}
        />
      </div>
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormSelect
          display="block"
          errorMessage={offerFields?.job?.internshipCycle?.message}
          label="Internship Cycle"
          options={internshipCycleOptions}
          placeholder={emptyOption}
          required={true}
          {...register(`offers.${index}.job.internshipCycle`, {
            required: FieldError.Required,
          })}
        />
        <FormSelect
          display="block"
          errorMessage={offerFields?.job?.startYear?.message}
          label="Internship Year"
          options={yearOptions}
          placeholder={emptyOption}
          required={true}
          {...register(`offers.${index}.job.startYear`, {
            required: FieldError.Required,
          })}
        />
      </div>
      <div className="mb-5">
        <FormMonthYearPicker
          monthLabel="Date Received"
          monthRequired={true}
          yearLabel=""
          {...register(`offers.${index}.monthYearReceived`, {
            required: FieldError.Required,
          })}
        />
      </div>
      <div className="mb-5">
        <FormTextInput
          endAddOn={
            <FormSelect
              borderStyle="borderless"
              isLabelHidden={true}
              label="Currency"
              options={CURRENCY_OPTIONS}
              {...register(`offers.${index}.job.monthlySalary.currency`, {
                required: FieldError.Required,
              })}
            />
          }
          endAddOnType="element"
          errorMessage={offerFields?.job?.monthlySalary?.value?.message}
          label="Salary (Monthly)"
          placeholder="0"
          required={true}
          startAddOn="$"
          startAddOnType="label"
          type="number"
          {...register(`offers.${index}.job.monthlySalary.value`, {
            min: { message: FieldError.NonNegativeNumber, value: 0 },
            required: FieldError.Required,
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
              setDialogOpen(true);
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
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      {fields.map((item, index) => {
        return (
          <div key={item.id}>
            {jobType === JobType.FullTime ? (
              <FullTimeOfferDetailsForm
                index={index}
                setDialogOpen={setDialogOpen}
              />
            ) : (
              <InternshipOfferDetailsForm
                index={index}
                setDialogOpen={setDialogOpen}
              />
            )}
            <Dialog
              isShown={isDialogOpen}
              primaryButton={
                <Button
                  display="block"
                  label="OK"
                  variant="primary"
                  onClick={() => {
                    remove(index);
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
              title="Remove this offer"
              onClose={() => setDialogOpen(false)}>
              <p>
                Are you sure you want to remove this offer? This action cannot
                be reversed.
              </p>
            </Dialog>
          </div>
        );
      })}
      <Button
        display="block"
        icon={PlusIcon}
        label="Add another offer"
        size="lg"
        variant="tertiary"
        onClick={() => append({})}
      />
    </div>
  );
}

export default function OfferDetailsForm() {
  const [jobType, setJobType] = useState(JobType.FullTime);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { control, register } = useFormContext();
  const fieldArrayValues = useFieldArray({ control, name: 'offers' });

  const toggleJobType = () => {
    if (jobType === JobType.FullTime) {
      setJobType(JobType.Internship);
    } else {
      setJobType(JobType.FullTime);
    }
    fieldArrayValues.remove();
  };

  const switchJobTypeLabel = () =>
    jobType === JobType.FullTime
      ? JobTypeLabel.INTERNSHIP
      : JobTypeLabel.FULLTIME;

  return (
    <div className="mb-5">
      <h5 className="mb-8 text-center text-4xl font-bold text-gray-900">
        Fill in your offer details
      </h5>
      <div className="flex w-full justify-center">
        <div className="mx-5 w-1/3">
          <Button
            display="block"
            label={JobTypeLabel.FULLTIME}
            size="md"
            variant={jobType === JobType.FullTime ? 'secondary' : 'tertiary'}
            onClick={() => {
              if (jobType === JobType.FullTime) {
                return;
              }
              setDialogOpen(true);
            }}
            {...register(`offers.${0}.jobType`)}
          />
        </div>
        <div className="mx-5 w-1/3">
          <Button
            display="block"
            label={JobTypeLabel.INTERNSHIP}
            size="md"
            variant={jobType === JobType.Internship ? 'secondary' : 'tertiary'}
            onClick={() => {
              if (jobType === JobType.Internship) {
                return;
              }
              setDialogOpen(true);
            }}
            {...register(`offers.${0}.jobType`)}
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
