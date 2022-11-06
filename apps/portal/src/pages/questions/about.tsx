import Container from '~/components/shared/Container';

const people = [
  {
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    imageUrl: '/team/TODO.jpg',
    name: 'Jeff Sieu',
    role: 'Role TODO',
  },
  {
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    imageUrl: '/team/TODO.jpg',
    name: 'Koh Hong Po',
    role: 'Role TODO',
  },
  {
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    imageUrl: '/team/TODO.jpg',
    name: 'Ren Weilin',
    role: 'Role TODO',
  },
  {
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    imageUrl: '/team/TODO.jpg',
    name: 'Tang Zhiying',
    role: 'Role TODO',
  },
];

export default function AboutPage() {
  return (
    <div className="lg:py-18 bg-white py-12">
      <Container variant="xs">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              About Question Bank
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
