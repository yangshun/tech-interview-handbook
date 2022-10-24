import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';

import { trpc } from '~/utils/trpc';

export default function TodoList() {
  const { data } = useSession();

  // Fetches todos when the component mounts.
  const todosQuery = trpc.useQuery(['todos.list']);
  // Context to be initialized here because of the rules of hooks.
  const trpcContext = trpc.useContext();

  const todoUpdateMutation = trpc.useMutation(['todos.user.update'], {
    onSuccess: () => {
      // Since a Todo has been updated, we invalidate the query for
      // all the todos to trigger a refetch.
      trpcContext.invalidateQueries(['todos.list']);
    },
  });
  const todoDeleteMutation = trpc.useMutation(['todos.user.delete']);
  const [currentlyEditingTodo, setCurrentlyEditingTodo] = useState<
    string | null
  >(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <>
      <Head>
        <title>Todo List</title>
      </Head>
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-slate-900">Todos</h1>
            <p className="mt-2 text-sm text-slate-700">
              A list of all Todos added by everyone.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto"
              href="/todos/new">
              Add Todo
            </Link>
          </div>
        </div>
        {todosQuery.isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-slate-300">
                    <thead className="bg-slate-50">
                      <tr className="divide-x divide-slate-200">
                        <th
                          className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-slate-900 sm:pl-6"
                          scope="col">
                          Description
                        </th>
                        <th
                          className="px-4 py-3.5 text-left text-sm font-semibold text-slate-900"
                          scope="col">
                          Creator
                        </th>
                        <th
                          className="px-4 py-3.5 text-left text-sm font-semibold text-slate-900"
                          scope="col">
                          Last Updated
                        </th>
                        <th
                          className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-slate-900 sm:pr-6"
                          scope="col">
                          Status
                        </th>
                        <th
                          className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-slate-900 sm:pr-6"
                          scope="col">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {todosQuery.data?.map((todo) => (
                        <tr key={todo.id} className="divide-x divide-slate-200">
                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-slate-500 sm:pl-6">
                            {todo.id === currentlyEditingTodo ? (
                              <form
                                ref={formRef}
                                onSubmit={async (event) => {
                                  event.preventDefault();
                                  if (!formRef.current) {
                                    return;
                                  }

                                  const formData = new FormData(
                                    formRef.current,
                                  );

                                  // Trim todo text before submission.
                                  const text = (
                                    formData?.get('text') as string | null
                                  )?.trim();

                                  // Ignore if the text is empty.
                                  if (!text) {
                                    return;
                                  }

                                  await todoUpdateMutation.mutate({
                                    id: todo.id,
                                    text,
                                  });

                                  setCurrentlyEditingTodo(null);
                                }}>
                                <input
                                  autoFocus={true}
                                  className="focus:border-primary-500 focus:ring-primary-500 block w-full min-w-0 flex-1 rounded-md border-slate-300 sm:text-sm"
                                  defaultValue={todo.text}
                                  name="text"
                                  type="text"
                                />
                              </form>
                            ) : (
                              todo.text
                            )}
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm text-slate-500">
                            {todo.user.name}
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm text-slate-500">
                            {todo.updatedAt.toLocaleString('en-US', {
                              dateStyle: 'long',
                              timeStyle: 'medium',
                            })}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-slate-500 sm:pr-6">
                            <input
                              checked={todo.status === 'COMPLETE'}
                              className="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-slate-300"
                              type="checkbox"
                              onChange={() => {
                                todoUpdateMutation.mutate({
                                  id: todo.id,
                                  status:
                                    todo.status === 'COMPLETE'
                                      ? 'INCOMPLETE'
                                      : 'COMPLETE',
                                });
                              }}
                            />
                          </td>
                          <td className="space-x-4 whitespace-nowrap py-4 pl-4 pr-4 text-sm text-slate-500 sm:pr-6">
                            {data?.user?.id === todo.userId && (
                              <>
                                {currentlyEditingTodo === todo.id ? (
                                  <a
                                    className="text-primary-600 hover:text-primary-900"
                                    href="#"
                                    onClick={() => {
                                      setCurrentlyEditingTodo(null);
                                    }}>
                                    Cancel
                                  </a>
                                ) : (
                                  <a
                                    className="text-primary-600 hover:text-primary-900"
                                    href="#"
                                    onClick={async () => {
                                      setCurrentlyEditingTodo(todo.id);
                                    }}>
                                    Edit
                                  </a>
                                )}
                                <a
                                  className="text-primary-600 hover:text-primary-900"
                                  href="#"
                                  onClick={async () => {
                                    const confirmDelete = window.confirm(
                                      'Are you sure you want to delete this Todo?',
                                    );

                                    if (!confirmDelete) {
                                      return;
                                    }

                                    todoDeleteMutation.mutate({
                                      id: todo.id,
                                    });
                                  }}>
                                  Delete
                                </a>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
