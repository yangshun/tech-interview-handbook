import { useState } from 'react';
import {
  BuildingOffice2Icon,
  CalendarDaysIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { TextInput } from '@tih/ui';

import ContributeQuestionDialog from './ContributeQuestionDialog';
import type { ContributeQuestionFormProps } from './forms/ContributeQuestionForm';

export type ContributeQuestionCardProps = Pick<
  ContributeQuestionFormProps,
  'onSubmit'
>;

export default function ContributeQuestionCard({
  onSubmit,
}: ContributeQuestionCardProps) {
  const [showDraftDialog, setShowDraftDialog] = useState(false);

  const handleDraftDialogCancel = () => {
    setShowDraftDialog(false);
  };

  const handleOpenContribute = () => {
    setShowDraftDialog(true);
  };

  return (
    <button
      className="flex flex-col items-stretch justify-center gap-2 rounded-md border border-slate-300 bg-white p-4 text-left hover:bg-slate-100"
      type="button"
      onClick={handleOpenContribute}>
      <TextInput
        disabled={true}
        isLabelHidden={true}
        label="Question"
        placeholder="Contribute a question"
        onChange={handleOpenContribute}
      />
      <div className="flex flex-wrap items-end justify-center gap-x-2">
        <div className="min-w-[150px] flex-1">
          <TextInput
            disabled={true}
            label="Company"
            startAddOn={BuildingOffice2Icon}
            startAddOnType="icon"
            onChange={handleOpenContribute}
          />
        </div>
        <div className="min-w-[150px] flex-1">
          <TextInput
            disabled={true}
            label="Question type"
            startAddOn={QuestionMarkCircleIcon}
            startAddOnType="icon"
            onChange={handleOpenContribute}
          />
        </div>
        <div className="min-w-[150px] flex-1">
          <TextInput
            disabled={true}
            label="Date"
            startAddOn={CalendarDaysIcon}
            startAddOnType="icon"
            onChange={handleOpenContribute}
          />
        </div>
        <h1 className="bg-primary-600 hover:bg-primary-700 rounded-full px-3 py-2 text-white">
          Contribute
        </h1>
      </div>
      <ContributeQuestionDialog
        show={showDraftDialog}
        onCancel={handleDraftDialogCancel}
        onSubmit={onSubmit}
      />
    </button>
  );
}
