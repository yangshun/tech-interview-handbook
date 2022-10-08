import type { ChangeEvent } from 'react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
  BuildingOffice2Icon,
  CalendarDaysIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { HorizontalDivider, TextArea, TextInput } from '@tih/ui';

export type ContributeQuestionData = {
  company: string;
  date: Date;
  location: string;
  position: string;
  questionContent: string;
  questionType: string;
};

export type ContributeQuestionFormProps = {
  onSubmit: (data: ContributeQuestionData) => void;
};

export default function ContributeQuestionForm({
  onSubmit,
}: ContributeQuestionFormProps) {
  const { register: formRegister, handleSubmit } =
    useForm<ContributeQuestionData>();

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
        {/* <Button label="Contribute" type="submit" variant="primary" /> */}
      </div>
    </form>
  );
}
