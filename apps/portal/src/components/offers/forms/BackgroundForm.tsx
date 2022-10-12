import { useFormContext, useWatch } from 'react-hook-form';
import { Collapsible, RadioList } from '@tih/ui';

import {
  companyOptions,
  educationFieldOptions,
  educationLevelOptions,
  locationOptions,
  titleOptions,
} from '~/components/offers/constants';
import FormRadioList from '~/components/offers/forms/components/FormRadioList';
import FormSelect from '~/components/offers/forms/components/FormSelect';
import FormTextInput from '~/components/offers/forms/components/FormTextInput';
import { JobType } from '~/components/offers/types';

import { CURRENCY_OPTIONS } from '~/utils/offers/currency/CurrencyEnum';

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
            {...register(`background.totalYoe`, {
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="grid grid-cols-1 space-x-3">
          <Collapsible label="Add specific YOEs by domain">
            <div className="mb-5 grid grid-cols-2 space-x-3">
              <FormTextInput
                label="Specific YOE 1"
                type="number"
                {...register(`background.specificYoes.0.yoe`, {
                  valueAsNumber: true,
                })}
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
                {...register(`background.specificYoes.1.yoe`, {
                  valueAsNumber: true,
                })}
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
          {...register(`background.experiences.0.title`)}
        />
        <FormSelect
          display="block"
          label="Company"
          options={companyOptions}
          {...register(`background.experiences.0.companyId`)}
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
              {...register(
                `background.experiences.0.totalCompensation.currency`,
              )}
            />
          }
          endAddOnType="element"
          label="Total Compensation (Annual)"
          placeholder="0.00"
          startAddOn="$"
          startAddOnType="label"
          type="number"
          {...register(`background.experiences.0.totalCompensation.value`, {
            valueAsNumber: true,
          })}
        />
      </div>
      <Collapsible label="Add more details">
        <div className="mb-5 grid grid-cols-2 space-x-3">
          <FormTextInput
            label="Focus / Specialization"
            placeholder="e.g. Front End"
            {...register(`background.experiences.0.specialization`)}
          />
          <FormTextInput
            label="Level"
            placeholder="e.g. L4, Junior"
            {...register(`background.experiences.0.level`)}
          />
        </div>
        <div className="mb-5 grid grid-cols-2 space-x-3">
          <FormSelect
            display="block"
            label="Location"
            options={locationOptions}
            {...register(`background.experiences.0.location`)}
          />
          <FormTextInput
            label="Duration (months)"
            type="number"
            {...register(`background.experiences.0.durationInMonths`, {
              valueAsNumber: true,
            })}
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
          {...register(`background.experiences.0.title`)}
        />
        <FormSelect
          display="block"
          label="Company"
          options={companyOptions}
          {...register(`background.experiences.0.company`)}
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
              {...register(`background.experiences.0.monthlySalary.currency`)}
            />
          }
          endAddOnType="element"
          label="Salary (Monthly)"
          placeholder="0.00"
          startAddOn="$"
          startAddOnType="label"
          type="number"
          {...register(`background.experiences.0.monthlySalary.value`)}
        />
      </div>
      <Collapsible label="Add more details">
        <div className="mb-5 grid grid-cols-2 space-x-3">
          <FormTextInput
            label="Focus / Specialization"
            placeholder="e.g. Front End"
            {...register(`background.experiences.0.specialization`)}
          />
          <FormSelect
            display="block"
            label="Location"
            options={locationOptions}
            {...register(`background.experiences.0.location`)}
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
    name: 'background.experiences.0.jobType',
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
            {...register('background.experiences.0.jobType')}>
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
            {...register(`background.educations.0.type`)}
          />
          <FormSelect
            display="block"
            label="Field"
            options={educationFieldOptions}
            {...register(`background.educations.0.field`)}
          />
        </div>
        <Collapsible label="Add more details">
          <div className="mb-5">
            <FormTextInput
              label="School"
              placeholder="e.g. National University of Singapore"
              {...register(`background.educations.0.school`)}
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
