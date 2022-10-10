import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  BuildingOffice2Icon,
  CalendarDaysIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import type { QuestionsQuestionType } from '@prisma/client';
import { Button, Collapsible, Select, TextArea, TextInput } from '@tih/ui';

import { QUESTION_TYPES } from '~/utils/questions/constants';
import {
  useFormRegister,
  useSelectRegister,
} from '~/utils/questions/useFormRegister';

import Checkbox from './ui-patch/Checkbox';

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
  const { register: formRegister, handleSubmit } =
    useForm<ContributeQuestionData>();
  const register = useFormRegister(formRegister);
  const selectRegister = useSelectRegister(formRegister);

  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const handleCheckSimilarQuestions = (checked: boolean) => {
    setCanSubmit(checked);
  };
  return (
    <form
      className=" flex flex-1 flex-col items-stretch justify-center pb-[50px]"
      onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        label="Question Prompt"
        placeholder="Contribute a question"
        required={true}
        rows={5}
        {...register('questionContent')}
      />
      <div className="mt-3 mb-1 flex flex-wrap items-end gap-2">
        <div className="mr-2 min-w-[113px] max-w-[113px] flex-1">
          <Select
            defaultValue="coding"
            label="Type"
            options={QUESTION_TYPES}
            required={true}
            {...selectRegister('questionType')}
          />
        </div>
        <div className="min-w-[150px] max-w-[300px] flex-1">
          <TextInput
            label="Company"
            required={true}
            startAddOn={BuildingOffice2Icon}
            startAddOnType="icon"
            {...register('company')}
          />
        </div>

        <div className="min-w-[150px] max-w-[300px] flex-1">
          <TextInput
            label="Date"
            required={true}
            startAddOn={CalendarDaysIcon}
            startAddOnType="icon"
            {...register('date', {
              valueAsDate: true,
            })}
          />
        </div>
      </div>
      <Collapsible defaultOpen={true} label="Additional info">
        <div className="justify-left flex flex-wrap items-end gap-2">
          <div className="min-w-[150px] max-w-[300px] flex-1">
            <TextInput
              label="Location"
              required={true}
              startAddOn={CalendarDaysIcon}
              startAddOnType="icon"
              {...register('location')}
            />
          </div>
          <div className="min-w-[150px] max-w-[200px] flex-1">
            <TextInput
              label="Role"
              required={true}
              startAddOn={UserIcon}
              startAddOnType="icon"
              {...register('role')}
            />
          </div>
        </div>
      </Collapsible>
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
      <div className="bg-primary-50 fixed bottom-0 left-0 w-full px-4 py-3 sm:flex sm:flex-row sm:justify-between sm:px-6">
        <div className="mb-1 flex">
          <Checkbox
            checked={canSubmit}
            label="I have checked that my question is new"
            onChange={handleCheckSimilarQuestions}></Checkbox>
        </div>
        <div className=" flex gap-x-2">
          <button
            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            type="button"
            onClick={onDiscard}>
            Discard
          </button>
          <Button
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-400 sm:ml-3 sm:w-auto sm:text-sm"
            disabled={!canSubmit}
            label="Contribute"
            type="submit"
            variant="primary"></Button>
        </div>
      </div>
    </form>
  );
}
