import { useFormContext, useWatch } from 'react-hook-form';
import { JobType } from '@prisma/client';
import { Collapsible, RadioList } from '@tih/ui';

import {
  educationFieldOptions,
  educationLevelOptions,
  emptyOption,
  FieldError,
  locationOptions,
} from '~/components/offers/constants';
import type { BackgroundPostData } from '~/components/offers/types';
import CompaniesTypeahead from '~/components/shared/CompaniesTypeahead';
import type { JobTitleType } from '~/components/shared/JobTitles';
import { getLabelForJobTitleType } from '~/components/shared/JobTitles';
import JobTitlesTypeahead from '~/components/shared/JobTitlesTypahead';

import {
  Currency,
  CURRENCY_OPTIONS,
} from '~/utils/offers/currency/CurrencyEnum';

import FormRadioList from '../../forms/FormRadioList';
import FormSelect from '../../forms/FormSelect';
import FormTextInput from '../../forms/FormTextInput';

function YoeSection() {
  const { register, formState } = useFormContext<{
    background: BackgroundPostData;
  }>();
  const backgroundFields = formState.errors.background;
  return (
    <>
      <h6 className="mb-2 text-left text-xl font-medium text-slate-400">
        Years of Experience (YOE)
      </h6>

      <div className="mb-5 rounded-lg border border-slate-200 px-10 py-5">
        <div className="mb-2 grid grid-cols-3 space-x-3">
          <FormTextInput
            errorMessage={backgroundFields?.totalYoe?.message}
            label="Total YOE"
            placeholder="0"
            required={true}
            type="number"
            {...register(`background.totalYoe`, {
              min: { message: FieldError.NON_NEGATIVE_NUMBER, value: 0 },
              required: FieldError.REQUIRED,
              valueAsNumber: true,
            })}
          />
        </div>
        <Collapsible label="Add specific YOEs by domain">
          <div className="mb-5 grid grid-cols-2 space-x-3">
            <FormTextInput
              errorMessage={backgroundFields?.specificYoes?.[0]?.yoe?.message}
              label="Specific YOE 1"
              type="number"
              {...register(`background.specificYoes.0.yoe`, {
                min: { message: FieldError.NON_NEGATIVE_NUMBER, value: 0 },
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
              errorMessage={backgroundFields?.specificYoes?.[1]?.yoe?.message}
              label="Specific YOE 2"
              type="number"
              {...register(`background.specificYoes.1.yoe`, {
                min: { message: FieldError.NON_NEGATIVE_NUMBER, value: 0 },
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
    </>
  );
}

function FullTimeJobFields() {
  const { register, setValue, formState } = useFormContext<{
    background: BackgroundPostData;
  }>();
  const experiencesField = formState.errors.background?.experiences?.[0];

  const watchJobTitle = useWatch({
    name: 'background.experiences.0.title',
  });
  const watchCompanyId = useWatch({
    name: 'background.experiences.0.companyId',
  });
  const watchCompanyName = useWatch({
    name: 'background.experiences.0.companyName',
  });

  return (
    <>
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <div>
          <JobTitlesTypeahead
            value={{
              id: watchJobTitle,
              label: getLabelForJobTitleType(watchJobTitle as JobTitleType),
              value: watchJobTitle,
            }}
            onSelect={(option) => {
              if (option) {
                setValue('background.experiences.0.title', option.value);
              }
            }}
          />
        </div>
        <div>
          <CompaniesTypeahead
            value={{
              id: watchCompanyId,
              label: watchCompanyName,
              value: watchCompanyId,
            }}
            onSelect={(option) => {
              if (option) {
                setValue('background.experiences.0.companyId', option.value);
                setValue('background.experiences.0.companyName', option.label);
              }
            }}
          />
        </div>
      </div>
      <div className="mb-5 grid grid-cols-1 space-x-3">
        <FormTextInput
          endAddOn={
            <FormSelect
              borderStyle="borderless"
              defaultValue={Currency.SGD}
              isLabelHidden={true}
              label="Currency"
              options={CURRENCY_OPTIONS}
              {...register(
                `background.experiences.0.totalCompensation.currency`,
              )}
            />
          }
          endAddOnType="element"
          errorMessage={experiencesField?.totalCompensation?.value?.message}
          label="Total Compensation (Annual)"
          placeholder="0.00"
          startAddOn="$"
          startAddOnType="label"
          type="number"
          {...register(`background.experiences.0.totalCompensation.value`, {
            min: { message: FieldError.NON_NEGATIVE_NUMBER, value: 0 },
            valueAsNumber: true,
          })}
        />
      </div>
      <Collapsible label="Add more details">
        <div className="mb-5 grid grid-cols-2 space-x-3">
          <FormTextInput
            label="Level"
            placeholder="e.g. L4, Junior"
            {...register(`background.experiences.0.level`)}
          />
          <FormSelect
            display="block"
            label="Location"
            options={locationOptions}
            {...register(`background.experiences.0.location`)}
          />
        </div>
        <div className="mb-5 grid grid-cols-2 space-x-3">
          <FormTextInput
            errorMessage={experiencesField?.durationInMonths?.message}
            label="Duration (months)"
            type="number"
            {...register(`background.experiences.0.durationInMonths`, {
              min: { message: FieldError.NON_NEGATIVE_NUMBER, value: 0 },
              valueAsNumber: true,
            })}
          />
        </div>
      </Collapsible>
    </>
  );
}

function InternshipJobFields() {
  const { register, setValue, formState } = useFormContext<{
    background: BackgroundPostData;
  }>();
  const experiencesField = formState.errors.background?.experiences?.[0];

  const watchJobTitle = useWatch({
    name: 'background.experiences.0.title',
  });
  const watchCompanyId = useWatch({
    name: 'background.experiences.0.companyId',
  });
  const watchCompanyName = useWatch({
    name: 'background.experiences.0.companyName',
  });

  return (
    <>
      <div className="mb-5 grid grid-cols-2 space-x-3">
        <div>
          <JobTitlesTypeahead
            value={{
              id: watchJobTitle,
              label: getLabelForJobTitleType(watchJobTitle as JobTitleType),
              value: watchJobTitle,
            }}
            onSelect={(option) => {
              if (option) {
                setValue('background.experiences.0.title', option.value);
              }
            }}
          />
        </div>
        <div>
          <CompaniesTypeahead
            value={{
              id: watchCompanyId,
              label: watchCompanyName,
              value: watchCompanyId,
            }}
            onSelect={(option) => {
              if (option) {
                setValue('background.experiences.0.companyId', option.value);
                setValue('background.experiences.0.companyName', option.label);
              }
            }}
          />
        </div>
      </div>
      <div className="mb-5 grid grid-cols-1 space-x-3">
        <FormTextInput
          endAddOn={
            <FormSelect
              borderStyle="borderless"
              defaultValue={Currency.SGD}
              isLabelHidden={true}
              label="Currency"
              options={CURRENCY_OPTIONS}
              {...register(`background.experiences.0.monthlySalary.currency`)}
            />
          }
          endAddOnType="element"
          errorMessage={experiencesField?.monthlySalary?.value?.message}
          label="Salary (Monthly)"
          placeholder="0.00"
          startAddOn="$"
          startAddOnType="label"
          type="number"
          {...register(`background.experiences.0.monthlySalary.value`, {
            min: { message: FieldError.NON_NEGATIVE_NUMBER, value: 0 },
            valueAsNumber: true,
          })}
        />
      </div>
      <Collapsible label="Add more details">
        <div className="mb-5 grid grid-cols-2 space-x-3">
          <FormSelect
            display="block"
            label="Location"
            options={locationOptions}
            placeholder={emptyOption}
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
    name: 'background.experiences.0.jobType',
  });

  return (
    <>
      <h6 className="mb-2 text-left text-xl font-medium text-slate-400">
        Current / Previous Job
      </h6>
      <div className="mb-5 rounded-lg border border-slate-200 px-10 py-5">
        <div className="mb-5">
          <FormRadioList
            defaultValue={watchJobType}
            isLabelHidden={true}
            label="Job Type"
            orientation="horizontal"
            {...register('background.experiences.0.jobType')}>
            <RadioList.Item
              key="Full-time"
              label="Full-time"
              value={JobType.FULLTIME}
            />
            <RadioList.Item
              key="Internship"
              label="Internship"
              value={JobType.INTERN}
            />
          </FormRadioList>
        </div>
        {watchJobType === JobType.FULLTIME ? (
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
      <h6 className="mb-2 text-left text-xl font-medium text-slate-400">
        Education
      </h6>
      <div className="mb-5 rounded-lg border border-slate-200 px-10 py-5">
        <div className="mb-5 grid grid-cols-2 space-x-3">
          <FormSelect
            display="block"
            label="Education Level"
            options={educationLevelOptions}
            placeholder={emptyOption}
            {...register(`background.educations.0.type`)}
          />
          <FormSelect
            display="block"
            label="Field"
            options={educationFieldOptions}
            placeholder={emptyOption}
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
      <h5 className="mb-8 text-center text-4xl font-bold text-slate-900">
        Help us better gauge your offers
      </h5>
      <div>
        <YoeSection />
        <CurrentJobSection />
        <EducationSection />
      </div>
    </div>
  );
}
