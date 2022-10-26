import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { Fragment, useRef, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { CheckIcon, HeartIcon } from '@heroicons/react/20/solid';

import { trpc } from '~/utils/trpc';

export type AddToListDropdownProps = {
  questionId: string;
};

export default function AddToListDropdown({
  questionId,
}: AddToListDropdownProps) {
  const [menuOpened, setMenuOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const utils = trpc.useContext();
  const { data: lists } = trpc.useQuery(['questions.lists.getListsByUser']);

  const listsWithQuestionData = useMemo(() => {
    return lists?.map((list) => ({
      ...list,
      hasQuestion: list.questionEntries.some(
        (entry) => entry.question.id === questionId,
      ),
    }));
  }, [lists, questionId]);

  const { mutateAsync: addQuestionToList } = trpc.useMutation(
    'questions.lists.createQuestionEntry',
    {
      // TODO: Add optimistic update
      onSuccess: () => {
        utils.invalidateQueries(['questions.lists.getListsByUser']);
      },
    },
  );

  const { mutateAsync: removeQuestionFromList } = trpc.useMutation(
    'questions.lists.deleteQuestionEntry',
    {
      // TODO: Add optimistic update
      onSuccess: () => {
        utils.invalidateQueries(['questions.lists.getListsByUser']);
      },
    },
  );

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

  const CustomMenuButton = ({ children }: PropsWithChildren<unknown>) => (
    <button
      className="focus:ring-primary-500 inline-flex w-full justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100"
      type="button"
      onClick={() => {
        addClickOutsideListener();
        setMenuOpened(!menuOpened);
      }}>
      {children}
    </button>
  );

  return (
    <Menu ref={ref} as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button as={CustomMenuButton}>
          <HeartIcon aria-hidden="true" className="-ml-1 mr-2 h-5 w-5" />
          Add to List
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
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={clsx(
                          active
                            ? 'bg-slate-100 text-slate-900'
                            : 'text-slate-700',
                          'group flex w-full items-center px-4 py-2 text-sm',
                        )}
                        type="button"
                        onClick={() => {
                          if (list.hasQuestion) {
                            handleDeleteFromList(list.id);
                          } else {
                            handleAddToList(list.id);
                          }
                        }}>
                        {list.hasQuestion && (
                          <CheckIcon
                            aria-hidden="true"
                            className="mr-3 h-5 w-5 text-slate-400 group-hover:text-slate-500"
                          />
                        )}
                        {list.name}
                      </button>
                    )}
                  </Menu.Item>
                </div>
              ))}
            </>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
