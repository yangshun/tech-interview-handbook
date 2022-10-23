import Head from 'next/head';
import { useState } from 'react';
import { Menu } from '@headlessui/react';
import {
  EllipsisVerticalIcon,
  NoSymbolIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

import QuestionListCard from '~/components/questions/card/question/QuestionListCard';

import { Button } from '~/../../../packages/ui/dist';
import { APP_TITLE } from '~/utils/questions/constants';
import { SAMPLE_QUESTION } from '~/utils/questions/constants';
import createSlug from '~/utils/questions/createSlug';

export default function ListPage() {
  const questions = [
    SAMPLE_QUESTION,
    SAMPLE_QUESTION,
    SAMPLE_QUESTION,
    SAMPLE_QUESTION,
    SAMPLE_QUESTION,
    SAMPLE_QUESTION,
    SAMPLE_QUESTION,
    SAMPLE_QUESTION,
    SAMPLE_QUESTION,
    SAMPLE_QUESTION,
    SAMPLE_QUESTION,
    SAMPLE_QUESTION,
    SAMPLE_QUESTION,
    SAMPLE_QUESTION,
    SAMPLE_QUESTION,
  ];

  const lists = [
    { id: 1, name: 'list 1', questions },
    { id: 2, name: 'list 2', questions },
    { id: 3, name: 'list 3', questions },
    { id: 4, name: 'list 4', questions },
    { id: 5, name: 'list 5', questions },
  ];

  const [selectedList, setSelectedList] = useState(
    (lists ?? []).length > 0 ? lists[0].id : '',
  );
  const listOptions = (
    <>
      <ul className="flex flex-1 flex-col divide-y divide-solid divide-slate-200">
        {lists.map((list) => (
          <li
            key={list.id}
            className={`flex items-center hover:bg-gray-50 ${
              selectedList === list.id ? 'bg-primary-100' : ''
            }`}>
            <button
              className="flex w-full flex-1 justify-between  "
              type="button"
              onClick={() => {
                setSelectedList(list.id);
                // eslint-disable-next-line no-console
                console.log(selectedList);
              }}>
              <p className="text-primary-700 text-md p-3 font-medium">
                {list.name}
              </p>
            </button>
            <div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md p-2 text-sm font-medium text-white">
                    <EllipsisVerticalIcon
                      aria-hidden="true"
                      className="hover:text-primary-700 mr-1 h-5 w-5 text-violet-400"
                    />
                  </Menu.Button>
                </div>
                <Menu.Items className="w-18 absolute right-0 z-10 mr-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? 'bg-violet-500 text-white'
                              : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          type="button">
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
            </div>
          </li>
        ))}
      </ul>
      {lists?.length === 0 && (
        <div className="mx-2 flex items-center justify-center gap-2 rounded-md bg-slate-200 p-4 text-slate-600">
          <p>You have yet to create a list</p>
        </div>
      )}
    </>
  );
  return (
    <>
      <Head>
        <title>My Lists - {APP_TITLE}</title>
      </Head>
      <main className="flex flex-1 flex-col items-stretch">
        <div className="flex h-full flex-1">
          <aside className="w-[300px] overflow-y-auto border-l bg-white py-4 lg:block">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="px-4 text-xl font-semibold">My Lists</h2>
              <div className="px-4">
                <Button
                  icon={PlusIcon}
                  isLabelHidden={true}
                  label="Create"
                  size="md"
                  variant="tertiary"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                />
              </div>
            </div>
            {listOptions}
          </aside>
          <section className="flex min-h-0 flex-1 flex-col items-center overflow-auto">
            <div className="flex min-h-0 max-w-3xl flex-1 p-4">
              <div className="flex flex-1 flex-col items-stretch justify-start gap-4">
                {selectedList && (
                  <div className="flex flex-col gap-4 pb-4">
                    {(questions ?? []).map((question) => (
                      <QuestionListCard
                        key={question.id}
                        companies={question.companies}
                        content={question.content}
                        href={`/questions/${question.id}/${createSlug(
                          question.content,
                        )}`}
                        locations={question.locations}
                        questionId={question.id}
                        receivedCount={0}
                        roles={question.roles}
                        timestamp={question.seenAt.toLocaleDateString(
                          undefined,
                          {
                            month: 'short',
                            year: 'numeric',
                          },
                        )}
                        type={question.type}
                        onDelete={() => {
                          // eslint-disable-next-line no-console
                          console.log('delete');
                        }}
                      />
                    ))}
                    {questions?.length === 0 && (
                      <div className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-slate-200 p-4 text-slate-600">
                        <NoSymbolIcon className="h-6 w-6" />
                        <p>You have no added any questions to your list yet.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
