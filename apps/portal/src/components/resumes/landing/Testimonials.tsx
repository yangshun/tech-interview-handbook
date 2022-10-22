import Image from 'next/future/image';

import { Container } from './Container';
import avatarImage1 from './images/avatars/avatar-1.png';
import avatarImage2 from './images/avatars/avatar-2.png';
import avatarImage3 from './images/avatars/avatar-3.png';
import avatarImage4 from './images/avatars/avatar-4.png';
import avatarImage5 from './images/avatars/avatar-5.png';

type QuoteProps = {
  className: string;
};

const testimonials = [
  {
    columns: [
      {
        author: {
          image: avatarImage1,
          name: 'Sheryl Berge',
          role: 'CEO at Lynch LLC',
        },
        content:
          'TaxPal is so easy to use I can’t help but wonder if it’s really doing the things the government expects me to do.',
      },
      {
        author: {
          image: avatarImage4,
          name: 'Amy Hahn',
          role: 'Director at Velocity Industries',
        },
        content:
          'I’m trying to get a hold of someone in support, I’m in a lot of trouble right now and they are saying it has something to do with my books. Please get back to me right away.',
      },
    ],
    name: 'column-one',
  },
  {
    columns: [
      {
        author: {
          image: avatarImage5,
          name: 'Leland Kiehn',
          role: 'Founder of Kiehn and Sons',
        },
        content:
          'The best part about TaxPal is every time I pay my employees, my bank balance doesn’t go down like it used to. Looking forward to spending this extra cash when I figure out why my card is being declined.',
      },
      {
        author: {
          image: avatarImage2,
          name: 'Erin Powlowski',
          role: 'COO at Armstrong Inc',
        },
        content:
          'There are so many things I had to do with my old software that I just don’t do at all with TaxPal. Suspicious but I can’t say I don’t love it.',
      },
    ],
    name: 'column-two',
  },
  {
    columns: [
      {
        author: {
          image: avatarImage3,
          name: 'Peter Renolds',
          role: 'Founder of West Inc',
        },
        content:
          'I used to have to remit tax to the EU and with TaxPal I somehow don’t have to do that anymore. Nervous to travel there now though.',
      },
      {
        author: {
          image: avatarImage4,
          name: 'Amy Hahn',
          role: 'Director at Velocity Industries',
        },
        content:
          'This is the fourth email I’ve sent to your support team. I am literally being held in jail for tax fraud. Please answer your damn emails, this is important.',
      },
    ],
    name: 'column-three',
  },
];

function QuoteIcon(props: QuoteProps) {
  return (
    <svg aria-hidden="true" height={78} width={105} {...props}>
      <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
    </svg>
  );
}

export function Testimonials() {
  return (
    <section
      className="bg-gradient-to-r from-indigo-700 to-indigo-400 py-20 sm:py-32"
      id="testimonials">
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Loved by software engineers worldwide.
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            We crowdsource ideas and feedback from across the world,
            guaranteeing you for success in your job application.
          </p>
        </div>
        <ul
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
          role="list">
          {testimonials.map(({ name, columns }) => (
            <li key={name}>
              <ul className="flex flex-col gap-y-6 sm:gap-y-8" role="list">
                {columns.map((testimonial) => (
                  <li key={testimonial.author.name}>
                    <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                      <QuoteIcon className="absolute top-6 left-6 fill-slate-100" />
                      <blockquote className="relative">
                        <p className="text-lg tracking-tight text-slate-900">
                          {testimonial.content}
                        </p>
                      </blockquote>
                      <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                        <div>
                          <div className="font-display text-base text-slate-900">
                            {testimonial.author.name}
                          </div>
                          <div className="mt-1 text-sm text-slate-500">
                            {testimonial.author.role}
                          </div>
                        </div>
                        <div className="overflow-hidden rounded-full bg-slate-50">
                          <Image
                            alt=""
                            className="h-14 w-14 object-cover"
                            height={56}
                            src={testimonial.author.image}
                            width={56}
                          />
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
