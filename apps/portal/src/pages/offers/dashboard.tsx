import Head from 'next/head';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button, Spinner } from '~/ui';

import DashboardProfileCard from '~/components/offers/dashboard/DashboardProfileCard';
import Container from '~/components/shared/Container';

import { trpc } from '~/utils/trpc';

import type { UserProfile } from '~/types/offers';

export default function ProfilesDashboard() {
  const { status } = useSession();
  const router = useRouter();
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);

  const userProfilesQuery = trpc.useQuery(
    ['offers.user.profile.getUserProfiles'],
    {
      onError: (error) => {
        if (error.data?.code === 'UNAUTHORIZED') {
          signIn();
        }
      },
      onSuccess: (response: Array<UserProfile>) => {
        setUserProfiles(response);
      },
    },
  );

  if (status === 'loading' || userProfilesQuery.isLoading) {
    return (
      <div className="flex w-full">
        <div className="m-auto mx-auto w-full justify-center">
          <Spinner className="m-10" display="block" size="lg" />
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    signIn();
  }

  if (userProfiles.length === 0) {
    return (
      <>
        <Head>
          <title>My Dashboard - Tech Offers Repo</title>
        </Head>
        <div className="flex w-full">
          <div className="w-full justify-center space-y-8 py-16 text-xl">
            <div className="flex w-full flex-row justify-center">
              <h2>You have not saved any offer profiles yet.</h2>
            </div>
            <div className="flex flex-row justify-center">
              <Button
                label="Submit your offers now!"
                size="lg"
                variant="primary"
                onClick={() => router.push('/offers/submit')}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>My Dashboard - Tech Offers Repo</title>
      </Head>
      <Container variant="xs">
        {userProfilesQuery.isLoading && (
          <div className="flex h-screen">
            <div className="m-auto mx-auto w-full justify-center">
              <Spinner className="m-10" display="block" size="lg" />
            </div>
          </div>
        )}
        {!userProfilesQuery.isLoading && (
          <div className="overflow-y-auto py-8">
            <h1 className="mx-auto mb-4 text-start text-4xl font-bold text-slate-900">
              Dashboard
            </h1>
            <p className="mt-4 text-xl leading-8 text-slate-500">
              Save offer profiles to your dashboard to easily access and edit
              them later.
            </p>
            <div className="mt-8">
              <ul className="w-full space-y-4" role="list">
                {userProfiles?.map((profile) => (
                  <li key={profile.id}>
                    <DashboardProfileCard key={profile.id} profile={profile} />
                  </li>
                ))}
              </ul>
              <div className="mt-2 text-end">
                <a
                  className="text-xs text-slate-500"
                  href="https://clearbit.com"
                  rel="noreferrer"
                  target="_blank">
                  Logos provided by Clearbit
                </a>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
