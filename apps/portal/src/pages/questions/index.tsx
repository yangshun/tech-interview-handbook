import Head from 'next/head';
import { useRouter } from 'next/router';

import type { LandingQueryData } from '~/components/questions/LandingComponent';
import LandingComponent from '~/components/questions/LandingComponent';

import { APP_TITLE } from '~/utils/questions/constants';

export default function QuestionsHomePage() {
  const router = useRouter();

  const handleLandingQuery = async (data: LandingQueryData) => {
    const { companySlug, location, questionType } = data;

    // Go to browse page
    router.push({
      pathname: '/questions/browse',
      query: {
        companies: [companySlug],
        locations: [location],
        questionTypes: [questionType],
      },
    });
  };

  return (
    <>
      <Head>
        <title>Home - {APP_TITLE}</title>
      </Head>
      <LandingComponent onLanded={handleLandingQuery}></LandingComponent>
    </>
  );
}
