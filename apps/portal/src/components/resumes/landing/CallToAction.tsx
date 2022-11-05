import { Container } from './Container';

export function CallToAction() {
  return (
    <section className="relative overflow-hidden py-32" id="get-started-today">
      <Container className="relative">
        <div className="mx-auto text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            People are using it as we speak
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-600">
            Check out how Alwyn from Open Government Products uses the platform
            to provide actionable feedback on a student's resume:
          </p>
          <div className="mt-10 flex justify-center">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
              frameBorder="0"
              height="480"
              src="https://www.youtube.com/embed/wVi5dhjDT8Y"
              title="Resume Review with Alwyn from OGP"
              width="853"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
