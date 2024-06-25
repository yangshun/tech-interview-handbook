import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { HorizontalDivider, useToast } from '~/ui';

import DiscardDraftDialog from './DiscardDraftDialog';
import type { ContributeQuestionFormProps } from './forms/ContributeQuestionForm';
import ContributeQuestionForm from './forms/ContributeQuestionForm';

export type ContributeQuestionDialogProps = Pick<
  ContributeQuestionFormProps,
  'onSubmit'
> & {
  onCancel: () => void;
  show: boolean;
};

export default function ContributeQuestionDialog({
  show,
  onSubmit,
  onCancel,
}: ContributeQuestionDialogProps) {
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  const { showToast } = useToast();

  const handleDraftDiscard = () => {
    setShowDiscardDialog(false);
    onCancel();
  };

  const handleDiscardCancel = () => {
    setShowDiscardDialog(false);
  };

  return (
    <div>
      <Transition.Root as={Fragment} show={show}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            onCancel();
          }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className="relative w-full max-w-5xl transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
                  <div className="bg-white px-6 pt-5">
                    <div className="flex flex-1 items-stretch">
                      <div className="mt-3 w-full sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-slate-900">
                          Contribute question
                        </Dialog.Title>
                        <div className="w-full">
                          <HorizontalDivider />
                        </div>
                        <div className="mt-2">
                          <ContributeQuestionForm
                            onDiscard={() => setShowDiscardDialog(true)}
                            onSimilarQuestionFound={() => {
                              onCancel();
                              showToast({
                                title:
                                  'Your response has been recorded. Draft discarded.',
                                variant: 'success',
                              });
                            }}
                            onSubmit={(data) => {
                              onSubmit(data);
                              onCancel();
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <DiscardDraftDialog
        show={showDiscardDialog}
        onCancel={handleDiscardCancel}
        onDiscard={handleDraftDiscard}></DiscardDraftDialog>
    </div>
  );
}
