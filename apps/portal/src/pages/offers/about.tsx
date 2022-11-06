import Container from '~/components/shared/Container';

const people = [
  {
    bio: 'I like to play games so I treat life like a game.',
    imageUrl: '/team/bryann.jpg',
    name: 'Bryann Yeap',
    role: 'Back End Engineer',
  },
  {
    bio: 'I am always up for sushi.',
    imageUrl: '/team/ai-ling.jpg',
    name: 'Hong Ai Ling',
    role: 'Back End Engineer',
  },
  {
    bio: 'I love to watch football and code.',
    imageUrl: '/team/stuart.jpg',
    name: 'Stuart Long',
    role: 'Front End Engineer',
  },
  {
    bio: 'Ziqing is a human who thrives under pressure, coffee and cat. In her own time, she likes playing the flute, building fun stuff with friends and watching animes.',
    imageUrl: '/team/ziqing.jpg',
    name: 'Zhang Ziqing',
    role: 'Front End Engineer',
  },
];

export default function AboutPage() {
  return (
    <div className="lg:py-18 bg-white py-12">
      <Container variant="xs">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              About Tech Offers Repo
            </h1>
            <p className="text-lg text-slate-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
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
  );
}
