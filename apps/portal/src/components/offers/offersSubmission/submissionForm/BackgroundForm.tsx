import { useFormContext, useWatch } from 'react-hook-form';
import { JobType } from '@prisma/client';
import { Collapsible, RadioList } from '~/ui';

import { FieldError } from '~/components/offers/constants';
import type { BackgroundPostData } from '~/components/offers/types';

import { CURRENCY_OPTIONS } from '~/utils/offers/currency/CurrencyEnum';
import { validatePositiveNumber } from '~/utils/offers/form';

import { EducationFieldOptions } from '../../EducationFields';
import { EducationLevelOptions } from '../../EducationLevels';
import FormCitiesTypeahead from '../../forms/FormCitiesTypeahead';
import FormCompaniesTypeahead from '../../forms/FormCompaniesTypeahead';
import FormJobTitlesTypeahead from '../../forms/FormJobTitlesTypeahead';
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
                validate: validatePositiveNumber,
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
                validate: validatePositiveNumber,
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

type FullTimeJobFieldsProps = Readonly<{
  defaultCurrency: string;
}>;

function FullTimeJobFields({ defaultCurrency }: FullTimeJobFieldsProps) {
  const { register, formState } = useFormContext<{
    background: BackgroundPostData;
  }>();
  const experiencesField = formState.errors.background?.experiences?.[0];

  return (
    <>
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-6">
        <FormJobTitlesTypeahead name="background.experiences.0.title" />
        <FormCompaniesTypeahead
          names={{
            label: 'background.experiences.0.companyName',
            value: 'background.experiences.0.companyId',
          }}
        />
      </div>
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-6">
        <FormTextInput
          endAddOn={
            <FormSelect
              borderStyle="borderless"
              defaultValue={defaultCurrency}
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
          <FormCitiesTypeahead
            names={{
              label: 'background.experiences.0.cityName',
              value: 'background.experiences.0.cityId',
            }}
          />
          <FormTextInput
            errorMessage={experiencesField?.durationInMonths?.message}
            label="Duration (months)"
            type="number"
            {...register(`background.experiences.0.durationInMonths`, {
              min: { message: FieldError.NON_NEGATIVE_NUMBER, value: 0 },
              validate: validatePositiveNumber,
              valueAsNumber: true,
            })}
          />
        </div>
      </Collapsible>
    </>
  );
}

type InternshipJobFieldsProps = Readonly<{
  defaultCurrency: string;
}>;

function InternshipJobFields({ defaultCurrency }: InternshipJobFieldsProps) {
  const { register, formState } = useFormContext<{
    background: BackgroundPostData;
  }>();
  const experiencesField = formState.errors.background?.experiences?.[0];

  return (
    <>
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-6">
        <FormJobTitlesTypeahead name="background.experiences.0.title" />
        <FormCompaniesTypeahead
          names={{
            label: 'background.experiences.0.companyName',
            value: 'background.experiences.0.companyId',
          }}
        />
      </div>
      <FormTextInput
        endAddOn={
          <FormSelect
            borderStyle="borderless"
            defaultValue={defaultCurrency}
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
          <FormCitiesTypeahead
            names={{
              label: 'background.experiences.0.cityName',
              value: 'background.experiences.0.cityId',
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

type CurrentJobSectionProps = Readonly<{
  defaultCurrency: string;
}>;

function CurrentJobSection({ defaultCurrency }: CurrentJobSectionProps) {
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
        <FullTimeJobFields defaultCurrency={defaultCurrency} />
      ) : (
        <InternshipJobFields defaultCurrency={defaultCurrency} />
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

type BackgroundFormProps = Readonly<{
  defaultCurrency: string;
}>;

export default function BackgroundForm({
  defaultCurrency,
}: BackgroundFormProps) {
  return (
    <div className="space-y-6">
      <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-center sm:text-4xl">
        Help us better gauge your offers
      </h2>
      <div className="space-y-8 rounded-lg border border-slate-200 p-6 sm:space-y-16 sm:p-8">
        <YoeSection />
        <CurrentJobSection defaultCurrency={defaultCurrency} />
        <EducationSection />
      </div>
    </div>
  );
}
