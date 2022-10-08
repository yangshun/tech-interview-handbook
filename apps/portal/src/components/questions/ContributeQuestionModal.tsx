import type { Dispatch, SetStateAction } from 'react';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import Checkbox from './ui-patch/Checkbox';

export type ContributeQuestionModalProps = {
  contributeState: boolean;
  setContributeState: Dispatch<SetStateAction<boolean>>;
};

export default function ContributeQuestionModal({
  contributeState,
  setContributeState,
}: ContributeQuestionModalProps) {
  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  const handleCheckSimilarQuestions = (checked: boolean) => {
    setCanSubmit(checked);
  };

  return (
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900">
                        Question Draft
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Question Contribution form
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-primary-50 px-4 py-3 sm:flex sm:flex-row sm:justify-between sm:px-6">
                  <div className="mb-1 flex">
                    <Checkbox
                      checked={canSubmit}
                      label="I have checked that my question is new"
                      onChange={handleCheckSimilarQuestions}></Checkbox>
                  </div>
                  <div className=" flex gap-x-2">
                    <button
                      className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      type="button"
                      onClick={() => setContributeState(false)}>
                      Discard
                    </button>
                    <button
                      className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-400 sm:ml-3 sm:w-auto sm:text-sm"
                      disabled={!canSubmit}
                      type="button"
                      onClick={() => setContributeState(false)}>
                      Contribute
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
