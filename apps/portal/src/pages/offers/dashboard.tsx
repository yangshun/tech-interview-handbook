import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button, Spinner } from '@tih/ui';

import DashboardProfileCard from '~/components/offers/dashboard/DashboardProfileCard';

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
      <div className="flex h-screen w-screen">
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
      <div className="flex h-screen w-screen">
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
    <>
      {userProfilesQuery.isLoading && (
        <div className="flex h-screen w-screen">
          <div className="m-auto mx-auto w-full justify-center">
            <Spinner className="m-10" display="block" size="lg" />
          </div>
        </div>
      )}
      {!userProfilesQuery.isLoading && (
        <div className="overflow-y-auto py-8">
          <h1 className="mx-auto mb-4 w-3/4 text-start text-4xl font-bold text-slate-900">
            Your dashboard
          </h1>
          <p className="mx-auto w-3/4 text-start text-xl text-slate-900">
            Save your offer profiles to dashboard to easily access and edit them
            later.
          </p>
          <div className="justfy-center mt-8 flex w-screen">
            <ul className="mx-auto w-3/4 space-y-3" role="list">
              {userProfiles?.map((profile) => (
                <li
                  key={profile.id}
                  className="overflow-hidden bg-white px-4 py-4 shadow sm:rounded-md sm:px-6">
                  <DashboardProfileCard key={profile.id} profile={profile} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
