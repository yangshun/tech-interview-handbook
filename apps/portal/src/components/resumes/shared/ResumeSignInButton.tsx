import clsx from 'clsx';
import { signIn } from 'next-auth/react';

type Props = Readonly<{
  className?: string;
  text: string;
}>;

export default function ResumeSignInButton({ text, className }: Props) {
  return (
    <div className={clsx('flex justify-center', className)}>
      <p>
        <a
          className="text-indigo-500 hover:text-indigo-600"
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
