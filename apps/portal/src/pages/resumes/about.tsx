import Container from '~/components/shared/Container';

const people = [
  {
    bio: 'Keane loves to try out new technologies and build awesome stuff with awesome people. He spends most of his free time travelling to eat good food (that he can afford) and going to the gym.',
    imageUrl: '/team/keane.jpg',
    name: 'Keane Chan',
    role: 'Full Stack Engineer',
  },
  {
    bio: 'Su Yin loves coffee and games. Most of the time, she is either asleep, rushing work or at a pool table. She dreams of travelling the world with friends.',
    imageUrl: '/team/su-yin.jpg',
    name: 'Tan Su Yin',
    role: 'Full Stack Engineer',
  },
  {
    bio: 'Terence likes to explore new technologies and create cool, fun stuff. But usually he just spends his time fantasizing about the countries he could be traveling in instead of working on his assignments.',
    imageUrl: '/team/terence.jpg',
    name: 'Terence Ho',
    role: 'Full Stack Engineer',
  },
  {
    bio: 'Peirong likes to work in teams because he needs the peer pressure from others to deliver excellent work. In his free time, he enjoys running and watching vlogs of people having fun in adventurous locations which he does not have money for.',
    imageUrl: '/team/peirong.jpg',
    name: 'Wu Peirong',
    role: 'Full Stack Engineer',
  },
];

export default function AboutUsPage() {
  return (
    <div className="lg:py-18 bg-white py-12">
      <Container variant="xs">
        <div className="space-y-12">
          <div className="space-y-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Resume Review Portal
            </h1>
            <div className="flex justify-center text-2xl font-bold">
              <div className="font-display sm:text-md mx-auto max-w-xl text-2xl font-medium italic tracking-tight text-slate-500">
                Resume reviews{' '}
                <span className="text-primary-500 relative whitespace-nowrap">
                  <svg
                    aria-hidden="true"
                    className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
                    preserveAspectRatio="none"
                    viewBox="0 0 418 42">
                    <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                  </svg>
                  <span className="relative">made simple</span>
                </span>
              </div>
            </div>
          </div>

          {/* About Us Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              About Us 🤓
            </h2>
            <p className="text-lg text-slate-500">
              As you apply for your dream jobs or internships, have you ever
              felt unsure about your resume? Have you wondered about how others
              got past resume screening in a breeze? Wonder no more!
            </p>
            <p className="text-lg text-slate-500">
              Tech Interview Handbook's very own Resume Review portal is here to
              help! Simply submit your resume and collect invaluable feedback
              from our community of Software Engineers, Hiring Managers and so
              many more...
            </p>
          </div>

          {/* Feedback */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Feedback? New Features? BUGS?! 😱
            </h2>

            <p className="text-lg text-slate-500">
              Submit your feedback
              <a
                className="text-primary-600 hover:text-primary-500 ml-1"
                href="https://forms.gle/KgA6KWDD4XNa53uJA"
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
  );
}
