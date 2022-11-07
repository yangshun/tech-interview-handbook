import clsx from 'clsx';
import Link from 'next/link';

import loginPageHref from '~/components/shared/loginPageHref';

type Props = Readonly<{
  className?: string;
  text: string;
}>;

export default function ResumeSignInButton({ text, className }: Props) {
  return (
    <div className={clsx('flex justify-center', className)}>
      <p>
        <Link
          className="text-primary-500 hover:text-primary-600"
          href={loginPageHref()}>
          Sign in
        </Link>{' '}
        {text}
      </p>
    </div>
  );
}
