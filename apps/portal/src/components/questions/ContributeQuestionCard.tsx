import type { ComponentProps, ForwardedRef } from 'react';
import { useState } from 'react';
import { forwardRef } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import {
  BuildingOffice2Icon,
  CalendarDaysIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { Button, TextInput } from '@tih/ui';

import ContributeQuestionModal from './ContributeQuestionModal';

export type ContributeQuestionData = {
  company: string;
  date: Date;
  questionContent: string;
  questionType: string;
};

type TextInputProps = ComponentProps<typeof TextInput>;

type FormTextInputProps = Omit<TextInputProps, 'onChange'> &
  Pick<UseFormRegisterReturn<never>, 'onChange'>;

function FormTextInputWithRef(
  props: FormTextInputProps,
  ref?: ForwardedRef<HTMLInputElement>,
) {
  const { onChange, ...rest } = props;
  return (
    <TextInput
      {...(rest as TextInputProps)}
      ref={ref}
      onChange={(_, event) => onChange(event)}
    />
  );
}

const FormTextInput = forwardRef(FormTextInputWithRef);

export type ContributeQuestionCardProps = {
  onSubmit: (data: ContributeQuestionData) => void;
};

export default function ContributeQuestionCard({
  onSubmit,
}: ContributeQuestionCardProps) {
  const { register, handleSubmit } = useForm<ContributeQuestionData>();
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <>
      <form
        className="flex flex-col items-stretch justify-center gap-2 rounded-md border border-slate-300 p-4"
        onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          isLabelHidden={true}
          label="Question"
          placeholder="Contribute a question"
          {...register('questionContent')}
        />
        <div className="flex items-end justify-center gap-x-2">
          <div className="min-w-[150px] flex-1">
            <FormTextInput
              label="Company"
              startAddOn={BuildingOffice2Icon}
              startAddOnType="icon"
              {...register('company')}
            />
          </div>
          <div className="min-w-[150px] flex-1">
            <FormTextInput
              label="Question type"
              startAddOn={QuestionMarkCircleIcon}
              startAddOnType="icon"
              {...register('questionType')}
            />
          </div>
          <div className="min-w-[150px] flex-1">
            <FormTextInput
              label="Date"
              startAddOn={CalendarDaysIcon}
              startAddOnType="icon"
              {...register('date')}
            />
          </div>
          <Button
            label="Contribute"
            type="submit"
            variant="primary"
            onClick={() => setOpen(true)}
          />
        </div>
      </form>

      <ContributeQuestionModal
        contributeState={isOpen}
        setContributeState={setOpen}></ContributeQuestionModal>
    </>
  );
}
