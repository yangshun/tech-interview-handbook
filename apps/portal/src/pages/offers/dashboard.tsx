import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button, Spinner } from '@tih/ui';

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
      <div className="flex w-full">
        <div className="m-auto mx-auto w-full justify-center text-xl">
          <div className="mb-8 flex w-full flex-row justify-center">
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
    );
  }

  return (
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
            Your dashboard
          </h1>
          <p className="mt-4 text-xl leading-8 text-slate-500">
            Save your offer profiles to your dashboard to easily access and edit
            them later.
          </p>
          <div className="mt-8 flex justify-center">
            <ul className="w-full space-y-4" role="list">
              {userProfiles?.map((profile) => (
                <li key={profile.id}>
                  <DashboardProfileCard key={profile.id} profile={profile} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Container>
  );
}
