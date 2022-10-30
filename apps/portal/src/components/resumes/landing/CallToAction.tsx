import { Button } from '@tih/ui';

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
          <Button
            className="mt-4"
            href="/resumes"
            label="Start browsing now"
            variant="primary"
          />
        </div>
      </Container>
    </section>
  );
}
