import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { Fragment, useRef, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { CheckIcon, HeartIcon, PlusIcon } from '@heroicons/react/20/solid';

import {
  useAddQuestionToListAsync,
  useCreateListAsync,
  useRemoveQuestionFromListAsync,
} from '~/utils/questions/mutations';
import { useProtectedCallback } from '~/utils/questions/useProtectedCallback';
import { trpc } from '~/utils/trpc';

import CreateListDialog from './CreateListDialog';

export type AddToListDropdownProps = {
  questionId: string;
};

export type DropdownButtonProps = PropsWithChildren<{
  onClick: () => void;
}>;

function DropdownButton({ onClick, children }: DropdownButtonProps) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={clsx(
            active ? 'bg-slate-100 text-slate-900' : 'text-slate-700',
            'flex w-full items-center px-4 py-2 text-sm',
          )}
          type="button"
          onClick={onClick}>
          {children}
        </button>
      )}
    </Menu.Item>
  );
}

export default function AddToListDropdown({
  questionId,
}: AddToListDropdownProps) {
  const [menuOpened, setMenuOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  const createListAsync = useCreateListAsync();
  const { data: lists } = trpc.useQuery(['questions.lists.getListsByUser']);

  const listsWithQuestionData = useMemo(() => {
    return lists?.map((list) => ({
      ...list,
      hasQuestion: list.questionEntries.some(
        (entry) => entry.question.id === questionId,
      ),
    }));
  }, [lists, questionId]);

  const addQuestionToList = useAddQuestionToListAsync();
  const removeQuestionFromList = useRemoveQuestionFromListAsync();

  const addClickOutsideListener = () => {
    document.addEventListener('click', handleClickOutside, true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setMenuOpened(false);
      document.removeEventListener('click', handleClickOutside, true);
    }
  };

  const handleAddToList = async (listId: string) => {
    await addQuestionToList({
      listId,
      questionId,
    });
  };

  const handleDeleteFromList = async (listId: string) => {
    const list = listsWithQuestionData?.find(
      (listWithQuestion) => listWithQuestion.id === listId,
    );
    if (!list) {
      return;
    }
    const entry = list.questionEntries.find(
      (questionEntry) => questionEntry.question.id === questionId,
    );
    if (!entry) {
      return;
    }
    await removeQuestionFromList({
      id: entry.id,
    });
  };

  const handleMenuButtonClick = useProtectedCallback(() => {
    addClickOutsideListener();
    setMenuOpened(!menuOpened);
  });

  const CustomMenuButton = ({ children }: PropsWithChildren<unknown>) => (
    <button
      className="focus:ring-primary-500 inline-flex w-full items-center justify-center rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100"
      type="button"
      onClick={handleMenuButtonClick}>
      {children}
    </button>
  );

  return (
    <div>
      <Menu ref={ref} as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button as={CustomMenuButton}>
            <HeartIcon aria-hidden="true" className="-ml-1 mr-2 h-5 w-5" />
            Add to list
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          show={menuOpened}>
          <Menu.Items
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-slate-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            static={true}>
            {menuOpened && (
              <>
                {(listsWithQuestionData ?? []).map((list) => (
                  <div key={list.id} className="py-1">
                    <DropdownButton
                      onClick={() => {
                        if (list.hasQuestion) {
                          handleDeleteFromList(list.id);
                        } else {
                          handleAddToList(list.id);
                        }
                      }}>
                      <div className="flex w-full flex-1 justify-between">
                        <span className="flex-1 overflow-hidden text-ellipsis text-start">
                          {list.name}
                        </span>
                        {list.hasQuestion && (
                          <CheckIcon
                            aria-hidden="true"
                            className="h-5 w-5 text-slate-400"
                          />
                        )}
                      </div>
                    </DropdownButton>
                  </div>
                ))}
                <DropdownButton
                  onClick={() => {
                    setShow(true);
                  }}>
                  <PlusIcon
                    aria-hidden="true"
                    className="mr-3 h-5 w-5 text-slate-500"
                  />
                  <span className="font-semibold text-slate-500">
                    Create new list
                  </span>
                </DropdownButton>
              </>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
      <CreateListDialog
        show={show}
        onCancel={() => {
          setShow(false);
        }}
        onSubmit={async (data) => {
          await createListAsync(data);
          setShow(false);
        }}
      />
    </div>
  );
}
