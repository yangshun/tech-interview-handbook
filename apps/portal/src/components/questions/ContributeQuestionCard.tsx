import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  BuildingOffice2Icon,
  CalendarDaysIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { Button, TextInput } from '@tih/ui';

import { useFormRegister } from '~/utils/questions/useFormRegister';

import ContributeQuestionDialog from './ContributeQuestionDialog';

export type ContributeQuestionData = {
  company: string;
  date: Date;
  questionContent: string;
  questionType: string;
};

export type ContributeQuestionCardProps = {
  onSubmit: (data: ContributeQuestionData) => void;
};

export default function ContributeQuestionCard({
  onSubmit,
}: ContributeQuestionCardProps) {
  const { register: formRegister, handleSubmit } =
    useForm<ContributeQuestionData>();
  const register = useFormRegister(formRegister);
  const [showDraftDialog, setShowDraftDialog] = useState(false);

  const handleDraftDialogCancel = () => {
    setShowDraftDialog(false);
  };

  return (
    <>
      <form
        className="flex flex-col items-stretch justify-center gap-2 rounded-md border border-slate-300 p-4"
        onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          isLabelHidden={true}
          label="Question"
          placeholder="Contribute a question"
          {...register('questionContent')}
        />
        <div className="flex items-end justify-center gap-x-2">
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
              label="Question type"
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
          <Button
            label="Contribute"
            type="submit"
            variant="primary"
            onClick={() => setShowDraftDialog(true)}
          />
        </div>
      </form>
      <ContributeQuestionDialog
        show={showDraftDialog}
        onCancel={handleDraftDialogCancel}
      />
    </>
  );
}
