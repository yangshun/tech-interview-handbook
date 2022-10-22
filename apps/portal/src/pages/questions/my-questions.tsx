import Head from 'next/head';

import { APP_TITLE } from '~/utils/questions/constants';

export default function MyQuestionsPage() {
  return (
    <>
      <Head>
        <title>My Questions - {APP_TITLE}</title>
      </Head>
      <div className="v-full flex w-full items-center justify-center">
        <h1 className="text-center text-4xl font-bold">My Questions</h1>
      </div>
    </>
  );
}
