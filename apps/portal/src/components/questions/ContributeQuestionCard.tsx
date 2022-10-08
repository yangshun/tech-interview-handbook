import { useState } from 'react';
import {
  BuildingOffice2Icon,
  CalendarDaysIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { Button, TextInput } from '@tih/ui';

import ContributeQuestionDialog from './ContributeQuestionDialog';

export default function ContributeQuestionCard() {
  const [showDraftDialog, setShowDraftDialog] = useState(false);

  const handleDraftDialogCancel = () => {
    setShowDraftDialog(false);
  };

  const handleOnFocus = () => {
    (document.activeElement as HTMLElement).blur();
    setShowDraftDialog(true);
  };

  return (
    <>
      <div className="flex flex-col items-stretch justify-center gap-2 rounded-md border border-slate-300 bg-white p-4">
        <TextInput
          isLabelHidden={true}
          label="Question"
          placeholder="Contribute a question"
          onFocus={handleOnFocus}
        />
        <div className="flex items-end justify-center gap-x-2">
          <div className="min-w-[150px] flex-1">
            <TextInput
              label="Company"
              startAddOn={BuildingOffice2Icon}
              startAddOnType="icon"
              onFocus={handleOnFocus}
            />
          </div>
          <div className="min-w-[150px] flex-1">
            <TextInput
              label="Question type"
              startAddOn={QuestionMarkCircleIcon}
              startAddOnType="icon"
              onFocus={handleOnFocus}
            />
          </div>
          <div className="min-w-[150px] flex-1">
            <TextInput
              label="Date"
              startAddOn={CalendarDaysIcon}
              startAddOnType="icon"
              onFocus={handleOnFocus}
            />
          </div>
          <Button
            label="Contribute"
            type="submit"
            variant="primary"
            onClick={handleOnFocus}
          />
        </div>
      </div>
      <ContributeQuestionDialog
        show={showDraftDialog}
        onCancel={handleDraftDialogCancel}
      />
    </>
  );
}
