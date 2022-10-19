import { signIn } from 'next-auth/react';

type Props = Readonly<{
  text: string;
}>;

export default function ResumeSignInButton({ text }: Props) {
  return (
    <div className="flex justify-center pt-4">
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
