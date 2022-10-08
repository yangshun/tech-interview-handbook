import type { Dispatch, SetStateAction } from 'react';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import ContributeQuestionForm from './ContributeQuestionForm';
import DiscardDraftModal from './DiscardDraftModal';

export type ContributeQuestionModalProps = {
  contributeState: boolean;
  setContributeState: Dispatch<SetStateAction<boolean>>;
};

export default function ContributeQuestionModal({
  contributeState,
  setContributeState,
}: ContributeQuestionModalProps) {
  const [isDiscardOpen, setIsDiscardOpen] = useState<boolean>(false);

  const handleDiscardDraft = () => {
    // eslint-disable-next-line no-console
    console.log('discarded draft');
    setContributeState(false);
    setIsDiscardOpen(false);
  };

  const handleCancelDiscard = () => {
    setIsDiscardOpen(false);
  };

  return (
    <div>
      <Transition.Root as={Fragment} show={contributeState}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setContributeState(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                <Dialog.Panel className="relative max-w-5xl transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900">
                          Question Draft
                        </Dialog.Title>
                        <div className="mt-2">
                          <ContributeQuestionForm
                            onDiscard={() => setIsDiscardOpen(true)}
                            onSubmit={(data) => {
                              // eslint-disable-next-line no-console
                              console.log(data);
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
      <DiscardDraftModal
        handleCancelDiscard={handleCancelDiscard}
        handleDiscardDraft={handleDiscardDraft}
        isDiscardOpen={isDiscardOpen}></DiscardDraftModal>
    </div>
  );
}
