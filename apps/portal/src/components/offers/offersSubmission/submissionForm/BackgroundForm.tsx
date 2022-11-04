import { useFormContext, useWatch } from 'react-hook-form';
import { JobType } from '@prisma/client';
import { Collapsible, RadioList } from '@tih/ui';

import { FieldError } from '~/components/offers/constants';
import type { BackgroundPostData } from '~/components/offers/types';
import CitiesTypeahead from '~/components/shared/CitiesTypeahead';
import CompaniesTypeahead from '~/components/shared/CompaniesTypeahead';
import type { JobTitleType } from '~/components/shared/JobTitles';
import { getLabelForJobTitleType } from '~/components/shared/JobTitles';
import JobTitlesTypeahead from '~/components/shared/JobTitlesTypahead';

import {
  Currency,
  CURRENCY_OPTIONS,
} from '~/utils/offers/currency/CurrencyEnum';

import { EducationFieldOptions } from '../../EducationFields';
import { EducationLevelOptions } from '../../EducationLevels';
import FormRadioList from '../../forms/FormRadioList';
import FormSection from '../../forms/FormSection';
import FormSelect from '../../forms/FormSelect';
import FormTextInput from '../../forms/FormTextInput';

function YoeSection() {
  const { register, formState } = useFormContext<{
    background: BackgroundPostData;
  }>();
  const backgroundFields = formState.errors.background;

  return (
    <FormSection title="Years of Experience (YOE)">
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-6">
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
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-6">
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
              placeholder="e.g. Front End"
              {...register(`background.specificYoes.0.domain`)}
            />
          </div>
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-6">
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
              placeholder="e.g. Back End"
              {...register(`background.specificYoes.1.domain`)}
            />
          </div>
        </div>
      </Collapsible>
    </FormSection>
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
  const watchCityId = useWatch({
    name: 'background.experiences.0.cityId',
  });
  const watchCityName = useWatch({
    name: 'background.experiences.0.cityName',
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-6">
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
            } else {
              setValue('background.experiences.0.companyId', '');
              setValue('background.experiences.0.companyName', '');
            }
          }}
        />
      </div>
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-6">
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <FormTextInput
            label="Level"
            placeholder="e.g. L4, Junior"
            {...register(`background.experiences.0.level`)}
          />
          <CitiesTypeahead
            label="Location"
            value={{
              id: watchCityId,
              label: watchCityName,
              value: watchCityId,
            }}
            onSelect={(option) => {
              if (option) {
                setValue('background.experiences.0.cityId', option.value);
                setValue('background.experiences.0.cityName', option.label);
              } else {
                setValue('background.experiences.0.cityId', '');
                setValue('background.experiences.0.cityName', '');
              }
            }}
          />
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
  const watchCityId = useWatch({
    name: 'background.experiences.0.cityId',
  });
  const watchCityName = useWatch({
    name: 'background.experiences.0.cityName',
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-6">
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
      <Collapsible label="Add more details">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <CitiesTypeahead
            label="Location"
            value={{
              id: watchCityId,
              label: watchCityName,
              value: watchCityId,
            }}
            onSelect={(option) => {
              if (option) {
                setValue('background.experiences.0.cityId', option.value);
                setValue('background.experiences.0.cityName', option.label);
              } else {
                setValue('background.experiences.0.cityId', '');
                setValue('background.experiences.0.cityName', '');
              }
            }}
          />
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

function CurrentJobSection() {
  const { register } = useFormContext();
  const watchJobType = useWatch({
    name: 'background.experiences.0.jobType',
  });

  return (
    <FormSection title="Current / Previous Job">
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
      {watchJobType === JobType.FULLTIME ? (
        <FullTimeJobFields />
      ) : (
        <InternshipJobFields />
      )}
    </FormSection>
  );
}

function EducationSection() {
  const { register } = useFormContext();
  return (
    <FormSection title="Education">
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-6">
        <FormSelect
          display="block"
          label="Education Level"
          options={EducationLevelOptions}
          {...register(`background.educations.0.type`)}
        />
        <FormSelect
          display="block"
          label="Field"
          options={EducationFieldOptions}
          {...register(`background.educations.0.field`)}
        />
      </div>
      <Collapsible label="Add more details">
        <FormTextInput
          label="School"
          placeholder="e.g. National University of Singapore"
          {...register(`background.educations.0.school`)}
        />
      </Collapsible>
    </FormSection>
  );
}

export default function BackgroundForm() {
  return (
    <div className="space-y-6">
      <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-center sm:text-4xl">
        Help us better gauge your offers
      </h2>
      <div className="space-y-8 rounded-lg border border-slate-200 p-6 sm:space-y-16 sm:p-8">
        <YoeSection />
        <CurrentJobSection />
        <EducationSection />
      </div>
    </div>
  );
}