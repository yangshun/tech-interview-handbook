import Link from 'next/link';

const navigation = [
  { href: '/questions/landing', name: '*Landing*' },
  { href: '/questions', name: 'Home' },
  { href: '#', name: 'My Lists' },
  { href: '#', name: 'My Questions' },
  { href: '#', name: 'History' },
];

export default function NavBar() {
  return (
    <header className="bg-indigo-600">
      <nav aria-label="Top" className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-3 lg:border-none">
          <div className="flex items-center">
            <a className="flex items-center" href="/questions">
              <span className="sr-only">TIH Question Bank</span>
              <img alt="TIH Logo" className="h-10 w-auto" src="/logo.svg" />
              <span className="ml-4 font-bold text-white">
                TIH Question Bank
              </span>
            </a>
            <div className="ml-8 hidden space-x-6 lg:block">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  className="font-sm text-sm text-white hover:text-indigo-50"
                  href={link.href}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-8 space-x-4">
            <a
              className="inline-block rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
              href="#">
              Sign in
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <Link
              key={link.name}
              className="text-base font-medium text-white hover:text-indigo-50"
              href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
