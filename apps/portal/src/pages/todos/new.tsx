import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { trpc } from '~/utils/trpc';

export default function TodosCreate() {
  const todoCreateMutation = trpc.useMutation('todos.user.create');
  const [todoText, setTodoText] = useState('');
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <>
      <Head>
        <title>Add Todo</title>
      </Head>
      <main className="flex-1 overflow-y-auto">
        {/* Primary column */}
        <section
          aria-labelledby="primary-heading"
          className="flex h-full min-w-0 flex-1 flex-col lg:order-last">
          <div className="mx-auto w-96 space-y-4 py-8">
            <h1 className="text-4xl font-bold" id="primary-heading">
              Add Todo
            </h1>
            <form
              ref={formRef}
              className="w-full space-y-8 divide-y divide-gray-200"
              onSubmit={async (event) => {
                event.preventDefault();
                if (!formRef.current) {
                  return;
                }

                const formData = new FormData(formRef.current);
                // Trim todo text before submission.
                const text = (formData?.get('text') as string | null)?.trim();

                // Ignore if the text is empty.
                if (!text) {
                  return;
                }

                await todoCreateMutation.mutate({
                  text,
                });

                // Redirect back to the todo list page after it has been added.
                router.push('/todos');
              }}>
              <div className="mt-6">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="text">
                  Text
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    autoFocus={true}
                    className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="text"
                    name="text"
                    type="text"
                    value={todoText}
                    onChange={(event) => setTodoText(event.target.value)}
                  />
                </div>
              </div>
              <div className="pt-5">
                <div className="flex justify-end">
                  <Link
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    href="/todos">
                    Cancel
                  </Link>
                  <button
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    type="submit">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
