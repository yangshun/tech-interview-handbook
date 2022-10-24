import Link from 'next/link';

import { Container } from './Container';

export function CallToAction() {
  return (
    <section className="relative overflow-hidden py-32" id="get-started-today">
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Resume review can start right now.
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-600">
            It's free! Take charge of your resume game by learning from the top
            engineers in the field.
          </p>
          <Link href="/resumes/browse">
            <button
              className="bg-primary-500 mt-4 rounded-md py-2 px-3 text-sm font-medium text-white"
              type="button">
              Start browsing now
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
