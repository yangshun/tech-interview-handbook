import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  BuildingOffice2Icon,
  CalendarDaysIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import {
  Button,
  Collapsible,
  HorizontalDivider,
  TextArea,
  TextInput,
} from '@tih/ui';

import { useFormRegister } from '~/utils/questions/useFormRegister';

import SimilarQuestionCard from './card/SimilarQuestionCard';
import Checkbox from './ui-patch/Checkbox';

export type ContributeQuestionData = {
  company: string;
  date: Date;
  location: string;
  position: string;
  questionContent: string;
  questionType: string;
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

  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const handleCheckSimilarQuestions = (checked: boolean) => {
    setCanSubmit(checked);
  };
  return (
    <form
      className="flex flex-col items-stretch justify-center gap-2 pb-[100px]"
      onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        isLabelHidden={true}
        label="Question"
        placeholder="Contribute a question"
        rows={5}
        {...register('questionContent')}
      />
      <div className="flex flex-wrap items-end justify-center gap-2">
        <div className="min-w-[150px] flex-1">
          <TextInput
            label="Company"
            startAddOn={BuildingOffice2Icon}
            startAddOnType="icon"
            {...register('company')}
          />
        </div>
        <div className="min-w-[150px] flex-1">
          <TextInput
            label="Type"
            startAddOn={QuestionMarkCircleIcon}
            startAddOnType="icon"
            {...register('questionType')}
          />
        </div>
        <div className="min-w-[150px] flex-1">
          <TextInput
            label="Date"
            startAddOn={CalendarDaysIcon}
            startAddOnType="icon"
            {...register('date')}
          />
        </div>
      </div>
      <Collapsible defaultOpen={true} label="Additional info">
        <div className="flex flex-wrap items-end justify-center gap-2">
          <div className="min-w-[150px] flex-1">
            <TextInput
              label="Location"
              startAddOn={CalendarDaysIcon}
              startAddOnType="icon"
              {...register('location')}
            />
          </div>
          <div className="min-w-[150px] flex-1">
            <TextInput
              label="Position"
              startAddOn={UserIcon}
              startAddOnType="icon"
              {...register('position')}
            />
          </div>
        </div>
      </Collapsible>
      <div className="w-full">
        <HorizontalDivider />
      </div>
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
      <h1>Are these questions the same as yours?</h1>
      <div>
        <SimilarQuestionCard
          content="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices"
          location="Menlo Park, CA"
          role="Senior Engineering Manager"
          similarCount={0}
          timestamp="Today"
          onSimilarQuestionClick={() => {
            // eslint-disable-next-line no-console
            console.log('hi!');
          }}
        />
      </div>
    </form>
  );
}
