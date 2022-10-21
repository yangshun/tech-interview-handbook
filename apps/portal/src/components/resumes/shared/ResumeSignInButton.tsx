import clsx from 'clsx';
import { signIn } from 'next-auth/react';

type Props = Readonly<{
  className?: string;
  text: string;
}>;

export default function ResumeSignInButton({ text, className }: Props) {
  return (
    <div className={clsx('flex justify-center pt-4', className)}>
      <p>
        <a
          className="text-primary-800 hover:text-primary-500"
          href="/api/auth/signin"
          onClick={(event) => {
            event.preventDefault();
            signIn();
          }}>
          Sign in
        </a>{' '}
        {text}
      </p>
    </div>
  );
}
