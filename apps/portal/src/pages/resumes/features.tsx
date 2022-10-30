import Head from 'next/head';

import { CallToAction } from '~/components/resumes/landing/CallToAction';
import { Hero } from '~/components/resumes/landing/Hero';
import { PrimaryFeatures } from '~/components/resumes/landing/PrimaryFeatures';

export default function Home() {
  return (
    <>
      <Head>
        <title>Resume Review Portal</title>
      </Head>

      <main className="h-full w-full overflow-y-auto">
        <Hero />
        <PrimaryFeatures />
        <CallToAction />
      </main>
    </>
  );
}
