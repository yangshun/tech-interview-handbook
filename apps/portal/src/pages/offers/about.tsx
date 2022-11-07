import Head from 'next/head';

import Container from '~/components/shared/Container';

const people = [
  {
    bio: 'I like to play games, so I treat life like a game. I collect achievements by crossing items off my bucket list.',
    imageUrl: '/team/bryann.jpg',
    name: 'Bryann Yeap',
    role: 'Back End Engineer',
  },
  {
    bio: 'I dream of eating hot food in the cold winter, falling off the grid in a skydive, and watching auroras dance in the night sky. For now, I am living in reality as a full-time coder.',
    imageUrl: '/team/ai-ling.jpg',
    name: 'Hong Ai Ling',
    role: 'Front End Engineer',
  },
  {
    bio: 'I’m an avid Manchester United fan who loves to code. To fuel my late night coding sessions, I love to brew my own coffee from different parts of the world.',
    imageUrl: '/team/stuart.jpg',
    name: 'Stuart Long',
    role: 'Back End Engineer',
  },
  {
    bio: 'I thrive under pressure, coffee and cat. In my own time, I like playing the flute, building fun stuff with friends and watching animes.',
    imageUrl: '/team/ziqing.jpg',
    name: 'Zhang Ziqing',
    role: 'Front End Engineer',
  },
];

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About us - Tech Offers Repo</title>
      </Head>
      <div className="lg:py-18 bg-white py-12">
        <Container variant="xs">
          <div className="space-y-12">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                About Tech Offers Repo
              </h1>
              <p className="text-lg text-slate-500">
                Tech Offers Repo, a project under the series of Tech Interview
                Handbook (TIH), reveals the stories behind offers by focusing on
                the profiles of the offer receivers. It helps job seekers
                benchmark and analyse their anonymous offers with more context
                and encourages discussions around offer profiles.
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
                  href="https://forms.gle/6zV5yimPyiByKqDy8"
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
