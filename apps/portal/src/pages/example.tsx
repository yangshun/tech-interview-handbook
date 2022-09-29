import { trpc } from '~/utils/trpc';

export default function Example() {
  const hello = trpc.useQuery(['example.hello', { text: 'from tRPC!' }]);
  const getAll = trpc.useQuery(['example.getAll']);

  return (
    <>
      <main className="flex-1 overflow-y-auto">
        {/* Primary column */}
        <section
          aria-labelledby="primary-heading"
          className="flex h-full min-w-0 flex-1 flex-col lg:order-last">
          <h1 className="sr-only" id="primary-heading">
            Photos
          </h1>
          <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
            {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
          </div>
          <pre className="w-1/2">{JSON.stringify(getAll.data, null, 2)}</pre>
        </section>
      </main>

      {/* Secondary column (hidden on smaller screens) */}
      <aside className="hidden w-96 overflow-y-auto border-l border-gray-200 bg-white lg:block">
        {/* Your content */}
      </aside>
    </>
  );
}
