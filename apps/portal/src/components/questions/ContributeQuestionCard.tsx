import { useState } from 'react';

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
        className="flex w-full flex-1 justify-between gap-2 rounded-md border border-slate-300 bg-white p-4 text-left transition hover:bg-slate-100"
        type="button"
        onClick={handleOpenContribute}>
        <div className="w-full rounded-md border border-slate-300 bg-slate-100 py-2 px-4 text-slate-400">
          <p className="font-semibold">
            Just completed your interview? Contribute your questions
          </p>
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
