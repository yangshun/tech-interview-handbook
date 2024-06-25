import Head from 'next/head';
import { Button } from '~/ui';

import Container from '~/components/shared/Container';

const features = [
  {
    description:
      "Preparing resumes for your next role? Browse for our community's best resumes. Upload yours and source for community reviews. Start your next job/internship hunt with a great resume!",
    href: '/resumes',
    img: '/logos/resumes-logo.svg',
    name: 'Resume Review',
  },
  {
    description:
      'Reveal stories behind offers. Help job seekers benchmark and analyse their anonymous offers with more context. Encourage discussions around offer profiles.',
    href: '/offers',
    img: '/logos/offers-logo.svg',
    name: 'Tech Offers',
  },
  {
    description:
      'A community driven interview question bank. Help job seekers prepare for their interviews with real questions from real companies.',
    href: '/questions',
    img: '/logos/bank-logo.png',
    name: 'Question Bank',
  },
];

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Tech Interview Handbook Portal</title>
      </Head>
      <div className="bg-white pb-24">
        <div className="space-y-12">
          <div className="bg-slate-100 py-8 text-center sm:py-16">
            <Container>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                <span className="block">Tech Interview Handbook</span>
                <span className="text-primary-600 block">Portal</span>
              </h1>
              <p className="mx-auto mt-3 max-w-md text-base text-slate-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                Suite of products to help you get better at technical
                interviews.
              </p>
            </Container>
          </div>
          <Container>
            <div>
              <h2 className="sr-only">Products.</h2>
              <dl className="space-y-10 lg:grid lg:grid-cols-3 lg:gap-12 lg:space-y-0">
                {features.map((feature) => (
                  <div key={feature.name}>
                    <dt>
                      <div className="flex justify-center">
                        <img
                          alt={feature.name}
                          className="h-48"
                          src={feature.img}
                        />
                      </div>
                      <p className="mt-8 text-xl font-medium leading-6 text-slate-900">
                        {feature.name}
                      </p>
                    </dt>
                    <dd className="mt-2 text-base text-slate-500">
                      {feature.description}
                    </dd>
                    <Button
                      className="mt-4"
                      href={feature.href}
                      label="Try it out"
                      variant="tertiary"
                    />
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
