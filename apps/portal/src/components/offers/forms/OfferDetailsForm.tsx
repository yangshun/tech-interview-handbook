import { useState } from 'react';
import type {
  FieldValues,
  UseFieldArrayRemove,
  UseFieldArrayReturn,
} from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { PlusIcon } from '@heroicons/react/20/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@tih/ui';

import FormMonthYearPicker from './components/FormMonthYearPicker';
import FormSelect from './components/FormSelect';
import FormTextArea from './components/FormTextArea';
import FormTextInput from './components/FormTextInput';
import {
  companyOptions,
  internshipCycleOptions,
  locationOptions,
  titleOptions,
  yearOptions,
} from '../constants';
import type { OfferDetailsFormData } from '../types';
import { JobType } from '../types';
import { CURRENCY_OPTIONS } from '../../../utils/offers/currency/CurrencyEnum';

type FullTimeOfferDetailsFormProps = Readonly<{
  index: number;
  remove: UseFieldArrayRemove;
}>;

function FullTimeOfferDetailsForm({
  index,
  remove,
}: FullTimeOfferDetailsFormProps) {
  const { register } = useFormContext<{
    offers: Array<OfferDetailsFormData>;
  }>();

  return (
    <div className="my-5 rounded-lg border border-gray-200 px-10 py-5">
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormSelect
          display="block"
          label="Title"
          options={titleOptions}
          required={true}
          {...register(`offers.${index}.job.title`, {
            required: true,
          })}
        />
        <FormTextInput
          label="Focus / Specialization"
          placeholder="e.g. Front End"
          required={true}
          {...register(`offers.${index}.job.specialization`, {
            required: true,
          })}
        />
      </div>
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormSelect
          display="block"
          label="Company"
          options={companyOptions}
          required={true}
          {...register(`offers.${index}.companyId`, { required: true })}
        />
        <FormTextInput
          label="Level"
          placeholder="e.g. L4, Junior"
          required={true}
          {...register(`offers.${index}.job.level`, { required: true })}
        />
      </div>
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormSelect
          display="block"
          label="Location"
          options={locationOptions}
          required={true}
          {...register(`offers.${index}.location`, { required: true })}
        />
        <FormMonthYearPicker
          {...register(`offers.${index}.monthYearReceived`, { required: true })}
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
                required: true,
              })}
            />
          }
          endAddOnType="element"
          label="Total Compensation (Annual)"
          placeholder="0.00"
          required={true}
          startAddOn="$"
          startAddOnType="label"
          type="number"
          {...register(`offers.${index}.job.totalCompensation.value`, {
            required: true,
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
                required: true,
              })}
            />
          }
          endAddOnType="element"
          label="Base Salary (Annual)"
          placeholder="0.00"
          required={true}
          startAddOn="$"
          startAddOnType="label"
          type="number"
          {...register(`offers.${index}.job.base.value`, {
            required: true,
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
                required: true,
              })}
            />
          }
          endAddOnType="element"
          label="Bonus (Annual)"
          placeholder="0.00"
          required={true}
          startAddOn="$"
          startAddOnType="label"
          type="number"
          {...register(`offers.${index}.job.bonus.value`, {
            required: true,
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
                required: true,
              })}
            />
          }
          endAddOnType="element"
          label="Stocks (Annual)"
          placeholder="0.00"
          required={true}
          startAddOn="$"
          startAddOnType="label"
          type="number"
          {...register(`offers.${index}.job.stocks.value`, {
            required: true,
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
      {fields.map((item, index) =>
        jobType === JobType.FullTime ? (
          <FullTimeOfferDetailsForm
            key={`offer.${item.id}`}
            index={index}
            remove={remove}
          />
        ) : (
          <InternshipOfferDetailsForm
            key={`offer.${item.id}`}
            index={index}
            remove={remove}
          />
        ),
      )}
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

type InternshipOfferDetailsFormProps = Readonly<{
  index: number;
  remove: UseFieldArrayRemove;
}>;

function InternshipOfferDetailsForm({
  index,
  remove,
}: InternshipOfferDetailsFormProps) {
  const { register } = useFormContext<{
    offers: Array<OfferDetailsFormData>;
  }>();

  return (
    <div className="my-5 rounded-lg border border-gray-200 px-10 py-5">
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormSelect
          display="block"
          label="Title"
          options={titleOptions}
          required={true}
          {...register(`offers.${index}.job.title`, {
            minLength: 1,
            required: true,
          })}
        />
        <FormTextInput
          label="Focus / Specialization"
          placeholder="e.g. Front End"
          required={true}
          {...register(`offers.${index}.job.specialization`, {
            minLength: 1,
            required: true,
          })}
        />
      </div>
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormSelect
          display="block"
          label="Company"
          options={companyOptions}
          required={true}
          {...register(`offers.${index}.companyId`, {
            required: true,
          })}
        />
        <FormSelect
          display="block"
          label="Location"
          options={locationOptions}
          required={true}
          {...register(`offers.${index}.location`, {
            required: true,
          })}
        />
      </div>
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormSelect
          display="block"
          label="Internship Cycle"
          options={internshipCycleOptions}
          required={true}
          {...register(`offers.${index}.job.internshipCycle`, {
            required: true,
          })}
        />
        <FormSelect
          display="block"
          label="Internship Year"
          options={yearOptions}
          required={true}
          {...register(`offers.${index}.job.startYear`, {
            required: true,
          })}
        />
      </div>
      <div className="mb-5 flex items-center space-x-9">
        <p className="text-sm">Date received:</p>
        <FormMonthYearPicker
          {...register(`offers.${index}.monthYearReceived`, { required: true })}
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
                required: true,
              })}
            />
          }
          endAddOnType="element"
          label="Salary (Monthly)"
          placeholder="0.00"
          required={true}
          startAddOn="$"
          startAddOnType="label"
          type="number"
          {...register(`offers.${index}.job.monthlySalary.value`, {
            required: true,
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
            onClick={() => remove(index)}
          />
        )}
      </div>
    </div>
  );
}

export default function OfferDetailsForm() {
  const [jobType, setJobType] = useState(JobType.FullTime);
  const { control, register } = useFormContext();
  const fieldArrayValues = useFieldArray({ control, name: 'offers' });

  const changeJobType = (jobTypeChosen: JobType) => () => {
    if (jobType === jobTypeChosen) {
      return;
    }

    setJobType(jobTypeChosen);
    fieldArrayValues.remove();
  };

  return (
    <div className="mb-5">
      <h5 className="mb-8 text-center text-4xl font-bold text-gray-900">
        Fill in your offer details
      </h5>
      <div className="flex w-full justify-center">
        <div className="mx-5 w-1/3">
          <Button
            display="block"
            label="Full-time"
            size="md"
            variant={jobType === JobType.FullTime ? 'secondary' : 'tertiary'}
            onClick={changeJobType(JobType.FullTime)}
            {...register(`offers.${0}.jobType`)}
          />
        </div>
        <div className="mx-5 w-1/3">
          <Button
            display="block"
            label="Internship"
            size="md"
            variant={jobType === JobType.Internship ? 'secondary' : 'tertiary'}
            onClick={changeJobType(JobType.Internship)}
            {...register(`offers.${0}.jobType`)}
          />
        </div>
      </div>
      <OfferDetailsFormArray
        fieldArrayValues={fieldArrayValues}
        jobType={jobType}
      />
    </div>
  );
}
