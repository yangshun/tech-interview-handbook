import { useRouter } from 'next/router';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import { getProviders, signIn } from 'next-auth/react';
import { Button } from '~/ui';

import GitHubIcon from '~/components/shared/icons/GitHubIcon';

export const getServerSideProps: GetServerSideProps<{
  providers: Awaited<ReturnType<typeof getProviders>>;
}> = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default function LoginPage({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return (
    <div className="flex w-full justify-center">
      <div className="flex min-h-full flex-col justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            alt="Tech Interview Handbook"
            className="mx-auto h-24 w-auto sm:h-36"
            src="/logo.svg"
          />
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Sign in to Tech Interview Handbook Portal
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600 sm:text-base">
            Get your resumes peer-reviewed, discuss solutions to tech interview
            questions, explore offer data points.
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="space-y-4">
            {providers != null &&
              Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <Button
                    addonPosition="start"
                    display="block"
                    icon={GitHubIcon}
                    label={
                      router.query.mode === 'signup'
                        ? `Sign up with ${provider.name}`
                        : `Sign in with ${provider.name}`
                    }
                    type="button"
                    variant="primary"
                    onClick={() =>
                      signIn(
                        provider.id,
                        router.query.callbackUrl != null
                          ? {
                              callbackUrl: String(router.query.callbackUrl),
                            }
                          : undefined,
                      )
                    }
                  />
                </div>
              ))}
          </div>
          {router.query.mode === 'signup' && (
            <p className="mt-2 text-center text-xs text-slate-500 sm:text-sm">
              Sign up for an account via GitHub, it's free!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
