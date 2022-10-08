import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  BuildingOffice2Icon,
  CalendarDaysIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Button, HorizontalDivider, TextArea, TextInput } from '@tih/ui';

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
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const handleCheckSimilarQuestions = (checked: boolean) => {
    setCanSubmit(checked);
  };
  const register = useCallback(
    (...args: Parameters<typeof formRegister>) => {
      const { onChange, ...rest } = formRegister(...args);
      return {
        ...rest,
        onChange: (value: string, event: ChangeEvent<unknown>) => {
          onChange(event);
        },
      };
    },
    [formRegister],
  );

  return (
    <form
      className="flex flex-col items-stretch justify-center gap-2"
      onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        isLabelHidden={true}
        label="Question"
        placeholder="Contribute a question"
        rows={5}
        {...register('questionContent')}
      />
      <div className="flex flex-wrap items-end justify-center gap-x-2">
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
      <div className="w-full">
        <HorizontalDivider />
      </div>
      <div className="flex flex-wrap items-end justify-center gap-x-2">
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
      <div className="bg-primary-50 px-4 py-3 sm:flex sm:flex-row sm:justify-between sm:px-6">
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
