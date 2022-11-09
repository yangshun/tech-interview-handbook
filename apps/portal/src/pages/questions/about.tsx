import Head from 'next/head';

import Container from '~/components/shared/Container';

const people = [
  {
    bio: 'Dysfunctional human who cannot survive without 10 hours of sleep.',
    imageUrl: '/team/weilin.jpg',
    name: 'Ren Weilin',
    role: 'Front End Engineer',
  },
  {
    bio: 'Software engineer focused on developing robust and performant large-scale backend systems. Currently deepening my expertise in parallel and distributed computing and developing low-latency systems. When I am not debugging segmentation faults, you can find me playing poker, video games, or enjoying thrillers!',
    imageUrl: '/team/hongpo.jpg',
    name: 'Koh Hong Po',
    role: 'Back End Engineer',
  },
  {
    bio: 'Why spend 1 hour solving the problem when you can spend 10 hours doing abstraction, optimisation and automation (in order of increasing rates of success)?',
    imageUrl: '/team/jeffsieu.jpg',
    name: 'Jeff Sieu',
    role: 'Front End Engineer',
  },
  {
    bio: 'Excited to jump into anything.',
    imageUrl: '/team/zhiying.jpg',
    name: 'Tang Zhiying',
    role: 'Designer',
  },
];

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About us - Question Bank</title>
      </Head>
      <div className="lg:py-18 bg-white py-12">
        <Container variant="xs">
          <div className="space-y-12">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                About Question Bank
              </h1>
              <p className="text-lg text-slate-500">
                Question Bank is for the community to collate and share real
                interview questions from companies. We hope to provide a
                platform for everyone to be able to prepare themselves well for
                their upcoming interviews, and head into their assessment with
                confidence about the questions they will be facing.
              </p>
            </div>
            {/* Feedback */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Feedback to Us
              </h2>

              <p className="text-lg text-slate-500">
                Thank you for using our platform! Feel free to submit your
                feedback / feature request / bug report
                <a
                  className="text-primary-600 hover:text-primary-500 ml-1"
                  href="https://forms.gle/BPbhrcXWcFvCbvvv8"
                  rel="noreferrer"
                  target="_blank">
                  here
                </a>
                .
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Meet the Team
              </h2>
              <ul
                className="grid grid-cols-2 items-start gap-8 md:grid-cols-1 md:items-start md:space-y-0"
                role="list">
                {people.map((person) => (
                  <li key={person.name}>
                    <div className="space-y-4 sm:grid sm:grid-cols-4 sm:gap-6 sm:space-y-0 lg:gap-8">
                      <div className="aspect-w-2 aspect-h-2 h-0">
                        <img
                          alt={person.name}
                          className="rounded-lg object-cover shadow-lg"
                          src={person.imageUrl}
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <div className="space-y-4">
                          <div className="text-md space-y-1 font-medium leading-6 sm:text-lg">
                            <h3>{person.name}</h3>
                            <p className="text-primary-600">{person.role}</p>
                          </div>
                          <div className="text-sm sm:text-lg">
                            <p className="text-slate-500">{person.bio}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
