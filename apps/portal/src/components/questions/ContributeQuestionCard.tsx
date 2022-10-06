import type { ComponentProps, Ref } from 'react';
import { forwardRef } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import {
  BuildingOffice2Icon,
  CalendarDaysIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { Button, TextInput } from '@tih/ui';

export type ContributeQuestionData = {
  company: string;
  date: Date;
  questionContent: string;
  questionType: string;
};

type FormTextInputProps = Omit<ComponentProps<typeof TextInput>, 'onChange'> &
  Pick<UseFormRegisterReturn<never>, 'onChange'>;

function FormTextInputWithRef(
  props: FormTextInputProps,
  ref?: Ref<HTMLInputElement>,
) {
  const { onChange, ...rest } = props;
  return (
    <TextInput onChange={(_, event) => onChange(event)} {...rest} ref={ref} />
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

  return (
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
        <div className="flex-1">
          <FormTextInput
            label="Company"
            startIcon={BuildingOffice2Icon}
            {...register('company')}
          />
        </div>
        <div className="flex-1">
          <FormTextInput
            label="Question type"
            startIcon={QuestionMarkCircleIcon}
            {...register('questionType')}
          />
        </div>
        <div className="flex-1">
          <FormTextInput
            label="Date"
            startIcon={CalendarDaysIcon}
            {...register('date')}
          />
        </div>
        <Button label="Contribute" type="submit" variant="primary" />
      </div>
    </form>
  );
}
