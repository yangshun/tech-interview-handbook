import { startOfMonth } from 'date-fns';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { QuestionsQuestionType } from '@prisma/client';
import {
  Button,
  CheckboxInput,
  HorizontalDivider,
  Select,
  TextArea,
} from '@tih/ui';

import { LOCATIONS, QUESTION_TYPES, ROLES } from '~/utils/questions/constants';
import {
  useFormRegister,
  useSelectRegister,
} from '~/utils/questions/useFormRegister';

import CompanyTypeahead from '../typeahead/CompanyTypeahead';
import LocationTypeahead from '../typeahead/LocationTypeahead';
import RoleTypeahead from '../typeahead/RoleTypeahead';
import type { Month } from '../../shared/MonthYearPicker';
import MonthYearPicker from '../../shared/MonthYearPicker';

export type ContributeQuestionData = {
  company: string;
  date: Date;
  location: string;
  position: string;
  questionContent: string;
  questionType: QuestionsQuestionType;
  role: string;
};

export type ContributeQuestionFormProps = {
  onDiscard: () => void;
  onSubmit: (data: ContributeQuestionData) => void;
};

export default function ContributeQuestionForm({
  onSubmit,
  onDiscard,
}: ContributeQuestionFormProps) {
  const {
    control,
    register: formRegister,
    handleSubmit,
  } = useForm<ContributeQuestionData>({
    defaultValues: {
      date: startOfMonth(new Date()),
    },
  });
  const register = useFormRegister(formRegister);
  const selectRegister = useSelectRegister(formRegister);

  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const handleCheckSimilarQuestions = (checked: boolean) => {
    setCanSubmit(checked);
  };
  return (
    <form
      className="flex flex-1 flex-col items-stretch justify-center gap-y-4"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="min-w-[113px] max-w-[113px] flex-1">
        <Select
          defaultValue="coding"
          label="Type"
          options={QUESTION_TYPES}
          required={true}
          {...selectRegister('questionType')}
        />
      </div>
      <TextArea
        label="Question Prompt"
        placeholder="Contribute a question"
        required={true}
        rows={5}
        {...register('questionContent')}
      />
      <HorizontalDivider />
      <h2 className="text-md text-primary-800 font-semibold">
        Additional information
      </h2>
      <div className="flex flex-col flex-wrap items-stretch gap-2 sm:flex-row sm:items-end">
        <div className="flex-1 sm:min-w-[150px] sm:max-w-[300px]">
          <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <LocationTypeahead
                required={true}
                onSelect={(option) => {
                  field.onChange(option.value);
                }}
                {...field}
                value={LOCATIONS.find(
                  (location) => location.value === field.value,
                )}
              />
            )}
          />
        </div>
        <div className="flex-1 sm:min-w-[150px] sm:max-w-[300px]">
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <MonthYearPicker
                monthRequired={true}
                value={{
                  month: ((field.value.getMonth() as number) + 1) as Month,
                  year: field.value.getFullYear(),
                }}
                yearRequired={true}
                onChange={({ month, year }) =>
                  field.onChange(startOfMonth(new Date(year, month - 1)))
                }
              />
            )}
          />
        </div>
      </div>
      <div className="flex flex-col flex-wrap items-stretch gap-2 sm:flex-row sm:items-end">
        <div className="flex-1 sm:min-w-[150px] sm:max-w-[300px]">
          <Controller
            control={control}
            name="company"
            render={({ field }) => (
              <CompanyTypeahead
                required={true}
                onSelect={({ id }) => {
                  field.onChange(id);
                }}
              />
            )}
          />
        </div>
        <div className="flex-1 sm:min-w-[150px] sm:max-w-[200px]">
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <RoleTypeahead
                required={true}
                onSelect={(option) => {
                  field.onChange(option.value);
                }}
                {...field}
                value={ROLES.find((role) => role.value === field.value)}
              />
            )}
          />
        </div>
      </div>
      {/* <div className="w-full">
        <HorizontalDivider />
      </div>
      <h1 className="mb-3">
        Are these questions the same as yours? TODO:Change to list
      </h1>
      <div>
        <SimilarQuestionCard
          content="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices"
          location="Menlo Park, CA"
          receivedCount={0}
          role="Senior Engineering Manager"
          timestamp="Today"
          onSimilarQuestionClick={() => {
            // eslint-disable-next-line no-console
            console.log('hi!');
          }}
        />
      </div> */}
      <div
        className="bg-primary-50 flex w-full flex-col gap-y-2 py-3 shadow-[0_0_0_100vmax_theme(colors.primary.50)] sm:flex-row sm:justify-between"
        style={{
          // Hack to make the background bleed outside the container
          clipPath: 'inset(0 -100vmax)',
        }}>
        <div className="my-2 flex sm:my-0">
          <CheckboxInput
            label="I have checked that my question is new"
            value={canSubmit}
            onChange={handleCheckSimilarQuestions}
          />
        </div>
        <div className="flex gap-x-2">
          <button
            className="focus:ring-primary-500 inline-flex w-full justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-base font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            type="button"
            onClick={onDiscard}>
            Discard
          </button>
          <Button
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-slate-400 sm:ml-3 sm:w-auto sm:text-sm"
            disabled={!canSubmit}
            label="Contribute"
            type="submit"
            variant="primary"></Button>
        </div>
      </div>
    </form>
  );
}
