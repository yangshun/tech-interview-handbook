import Image from 'next/future/image';

import { Button } from './Button';
import { Container } from './Container';
import backgroundImage from './images/background-call-to-action.jpg';

export function CallToAction() {
  return (
    <section
      className="relative overflow-hidden bg-blue-600 py-32"
      id="get-started-today">
      <Image
        alt=""
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        height={1244}
        src={backgroundImage}
        unoptimized={true}
        width={2347}
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Resume review can start right now.
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            It's free! Take charge of your resume game by learning from the top
            engineers in the field.
          </p>
          <Button className="mt-10" color="white" href="/resumes/browse">
            Start browsing now
          </Button>
        </div>
      </Container>
    </section>
  );
}
