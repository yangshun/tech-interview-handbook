import { useState } from 'react';
import { TextInput } from '@tih/ui';

import { useProtectedCallback } from '~/utils/questions/useProtectedCallback';

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

  const handleOpenContribute = useProtectedCallback(() => {
    setShowDraftDialog(true);
  });

  return (
    <div className="w-full">
      <button
        className="flex w-full flex-1 justify-between gap-2 rounded-md border border-slate-300 bg-white p-4 text-left hover:bg-slate-100"
        type="button"
        onClick={handleOpenContribute}>
        <div className="w-full">
          <TextInput
            disabled={true}
            isLabelHidden={true}
            label="Question"
            placeholder="Contribute a question"
            onChange={handleOpenContribute}
          />
        </div>
        <div className="flex flex-wrap items-end justify-start gap-2">
          <h1 className="bg-primary-600 hover:bg-primary-700 rounded-full px-3 py-2 text-white">
            Contribute
          </h1>
        </div>
      </button>
      <ContributeQuestionDialog
        show={showDraftDialog}
        onCancel={handleDraftDialogCancel}
        onSubmit={onSubmit}
      />
    </div>
  );
}
