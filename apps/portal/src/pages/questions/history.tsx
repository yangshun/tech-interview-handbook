import Head from 'next/head';

import { APP_TITLE } from '~/utils/questions/constants';

export default function HistoryPage() {
  return (
    <>
      <Head>
        <title>History - {APP_TITLE}</title>
      </Head>
      <div className="v-full flex w-full items-center justify-center">
        <h1 className="text-center text-4xl font-bold">History</h1>
      </div>
    </>
  );
}
