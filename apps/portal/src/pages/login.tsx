import { useRouter } from 'next/router';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import { getProviders, signIn } from 'next-auth/react';
import { Button } from '@tih/ui';

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
            className="mx-auto h-24 w-auto"
            src="/logo.svg"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
            Tech Interview Handbook Portal
          </h2>
          <p className="mt-2 text-center text-slate-600">
            Get your resumes peer-reviewed, discuss solutions to tech interview
            questions, get offer data points.
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
                    label={`Sign in with ${provider.name}`}
                    type="button"
                    variant="primary"
                    onClick={() =>
                      signIn(
                        provider.id,
                        router.query.redirect != null
                          ? {
                              callbackUrl: String(router.query.redirect),
                            }
                          : undefined,
                      )
                    }
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
