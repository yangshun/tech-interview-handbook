import Head from 'next/head';

import { CallToAction } from '~/components/resumes/landing/CallToAction';
import { Footer } from '~/components/resumes/landing/Footer';
import { Hero } from '~/components/resumes/landing/Hero';
import { PrimaryFeatures } from '~/components/resumes/landing/PrimaryFeatures';
import { Testimonials } from '~/components/resumes/landing/Testimonials';

export default function Home() {
  return (
    <>
      <Head>
        <title>Resume Review</title>
      </Head>

      <main className="h-[calc(100vh-2rem)] w-full overflow-y-auto">
        <Hero />
        <PrimaryFeatures />
        <CallToAction />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
