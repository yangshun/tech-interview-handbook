import { useFormContext, useWatch } from 'react-hook-form';
import { Collapsible, RadioList } from '@tih/ui';

import FormRadioList from './FormRadioList';
import FormSelect from './FormSelect';
import FormTextInput from './FormTextInput';
import {
  companyOptions,
  educationFieldOptions,
  educationLevelOptions,
  locationOptions,
  titleOptions,
} from '../constants';
import { JobType } from '../types';
import { CURRENCY_OPTIONS } from '../util/currency/CurrencyEnum';

function YoeSection() {
  const { register } = useFormContext();
  return (
    <>
      <h6 className="mb-2 text-left text-xl font-medium text-gray-400">
        Years of Experience (YOE)
      </h6>

      <div className="mb-5 rounded-lg border border-gray-200 px-10 py-5">
        <div className="mb-2 grid grid-cols-3 space-x-3">
          <FormTextInput
            label="Total YOE"
            placeholder="0"
            type="number"
            {...register(`background.totalYoe`)}
          />
        </div>
        <div className="grid grid-cols-1 space-x-3">
          <Collapsible label="Add specific YOEs by domain">
            <div className="mb-5 grid grid-cols-2 space-x-3">
              <FormTextInput
                label="Specific YOE 1"
                type="number"
                {...register(`background.specificYoes.0.yoe`)}
              />
              <FormTextInput
                label="Specific Domain 1"
                placeholder="e.g. Frontend"
                {...register(`background.specificYoes.0.domain`)}
              />
            </div>
            <div className="mb-5 grid grid-cols-2 space-x-3">
              <FormTextInput
                label="Specific YOE 2"
                type="number"
                {...register(`background.specificYoes.1.yoe`)}
              />
              <FormTextInput
                label="Specific Domain 2"
                placeholder="e.g. Backend"
                {...register(`background.specificYoes.1.domain`)}
              />
            </div>
          </Collapsible>
        </div>
      </div>
    </>
  );
}

function FullTimeJobFields() {
  const { register } = useFormContext();
  return (
    <>
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormSelect
          display="block"
          label="Title"
          options={titleOptions}
          {...register(`background.experience.title`)}
        />
        <FormSelect
          display="block"
          label="Company"
          options={companyOptions}
          {...register(`background.experience.companyId`)}
        />
      </div>
      <div className="mb-5 grid grid-cols-1 space-x-3">
        <FormTextInput
          endAddOn={
            <FormSelect
              borderStyle="borderless"
              isLabelHidden={true}
              label="Currency"
              options={CURRENCY_OPTIONS}
              {...register(`background.experience.totalCompensation.currency`)}
            />
          }
          endAddOnType="element"
          label="Total Compensation (Annual)"
          placeholder="0.00"
          startAddOn="$"
          startAddOnType="label"
          type="number"
          {...register(`background.experience.totalCompensation.value`)}
        />
      </div>
      <Collapsible label="Add more details">
        <div className="mb-5 grid grid-cols-2 space-x-3">
          <FormTextInput
            label="Focus / Specialization"
            placeholder="e.g. Front End"
            {...register(`background.experience.specialization`)}
          />
          <FormTextInput
            label="Level"
            placeholder="e.g. L4, Junior"
            {...register(`background.experience.level`)}
          />
        </div>
        <div className="mb-5 grid grid-cols-2 space-x-3">
          <FormSelect
            display="block"
            label="Location"
            options={locationOptions}
            {...register(`background.experience.location`)}
          />
          <FormTextInput
            label="Duration (months)"
            type="number"
            {...register(`background.experience.durationInMonths`)}
          />
        </div>
      </Collapsible>
    </>
  );
}

function InternshipJobFields() {
  const { register } = useFormContext();
  return (
    <>
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <FormSelect
          display="block"
          label="Title"
          options={titleOptions}
          {...register(`background.experience.title`)}
        />
        <FormSelect
          display="block"
          label="Company"
          options={companyOptions}
          {...register(`background.experience.company`)}
        />
      </div>
      <div className="mb-5 grid grid-cols-1 space-x-3">
        <FormTextInput
          endAddOn={
            <FormSelect
              borderStyle="borderless"
              isLabelHidden={true}
              label="Currency"
              options={CURRENCY_OPTIONS}
              {...register(`background.experience.monthlySalary.currency`)}
            />
          }
          endAddOnType="element"
          label="Salary (Monthly)"
          placeholder="0.00"
          startAddOn="$"
          startAddOnType="label"
          type="number"
          {...register(`background.experience.monthlySalary.value`)}
        />
      </div>
      <Collapsible label="Add more details">
        <div className="mb-5 grid grid-cols-2 space-x-3">
          <FormTextInput
            label="Focus / Specialization"
            placeholder="e.g. Front End"
            {...register(`background.experience.specialization`)}
          />
          <FormSelect
            display="block"
            label="Location"
            options={locationOptions}
            {...register(`background.experience.location`)}
          />
        </div>
      </Collapsible>
    </>
  );
}

function CurrentJobSection() {
  const { register } = useFormContext();
  const watchJobType = useWatch({
    defaultValue: JobType.FullTime,
    name: 'background.experience.jobType',
  });

  return (
    <>
      <h6 className="mb-2 text-left text-xl font-medium text-gray-400">
        Current / Previous Job
      </h6>
      <div className="mb-5 rounded-lg border border-gray-200 px-10 py-5">
        <div className="mb-5">
          <FormRadioList
            defaultValue={JobType.FullTime}
            isLabelHidden={true}
            label="Job Type"
            orientation="horizontal"
            {...register('background.experience.jobType')}>
            <RadioList.Item
              key="Full-time"
              label="Full-time"
              value={JobType.FullTime}
            />
            <RadioList.Item
              key="Internship"
              label="Internship"
              value={JobType.Internship}
            />
          </FormRadioList>
        </div>
        {watchJobType === JobType.FullTime ? (
          <FullTimeJobFields />
        ) : (
          <InternshipJobFields />
        )}
      </div>
    </>
  );
}

function EducationSection() {
  const { register } = useFormContext();
  return (
    <>
      <h6 className="mb-2 text-left text-xl font-medium text-gray-400">
        Education
      </h6>
      <div className="mb-5 rounded-lg border border-gray-200 px-10 py-5">
        <div className="mb-5 grid grid-cols-2 space-x-3">
          <FormSelect
            display="block"
            label="Education Level"
            options={educationLevelOptions}
            {...register(`background.education.type`)}
          />
          <FormSelect
            display="block"
            label="Field"
            options={educationFieldOptions}
            {...register(`background.education.field`)}
          />
        </div>
        <Collapsible label="Add more details">
          <div className="mb-5">
            <FormTextInput
              label="School"
              placeholder="e.g. National University of Singapore"
              {...register(`background.experience.specialization`)}
            />
          </div>
        </Collapsible>
      </div>
    </>
  );
}

export default function BackgroundForm() {
  return (
    <div>
      <h5 className="mb-2 text-center text-4xl font-bold text-gray-900">
        Help us better gauge your offers
      </h5>
      <h6 className="mx-10 mb-8 text-center text-lg font-light text-gray-600">
        This section is optional, but your background information helps us
        benchmark your offers.
      </h6>
      <div>
        <YoeSection />
        <CurrentJobSection />
        <EducationSection />
      </div>
    </div>
  );
}
