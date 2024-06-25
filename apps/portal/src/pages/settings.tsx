import Head from 'next/head';
import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button, HorizontalDivider, TextInput, useToast } from '~/ui';

import Container from '~/components/shared/Container';

import { trpc } from '~/utils/trpc';

function SettingsForm({
  session,
}: Readonly<{
  session: Session;
}>) {
  const { showToast } = useToast();
  const updateProfileMutation = trpc.useMutation(
    ['user.settings.profile.update'],
    {
      onError: () => {
        showToast({
          subtitle: 'Please check that you are logged in.',
          title: 'Failed to update profile',
          variant: 'failure',
        });
      },
      onSuccess: () => {
        showToast({
          title: 'Updated profile!',
          variant: 'success',
        });
      },
    },
  );

  const [name, setName] = useState(session?.user?.name);
  const [email, setEmail] = useState(session?.user?.email);

  return (
    <div className="lg:py-18 bg-white py-12">
      <Container variant="xs">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold">Settings</h1>
          <HorizontalDivider />
          <p className="text-sm text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>
          <form
            className="space-y-8"
            onSubmit={(event) => {
              event.preventDefault();
              updateProfileMutation.mutate({
                email: email ? email : undefined,
                name: name ? name : undefined,
              });
            }}>
            <div className="grid grid-cols-1 gap-y-8 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <TextInput
                  description="This name will be used across the entire platform"
                  label="Name"
                  placeholder="John Doe"
                  value={name ?? undefined}
                  onChange={(val) => setName(val)}
                />
              </div>
              <div className="sm:col-span-3">
                <TextInput
                  label="Email"
                  placeholder="john.doe@example.com"
                  type="email"
                  value={email ?? undefined}
                  onChange={(val) => setEmail(val)}
                />
              </div>
              {/* <div className="sm:col-span-6">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="photo">
                  Profile Image
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  {session?.user?.image ? (
                    <img
                      alt={session?.user?.email ?? session?.user?.name ?? ''}
                      className="h-16 w-16 rounded-full"
                      src={session?.user.image}
                    />
                  ) : (
                    <span className="h-16 w-16 overflow-hidden rounded-full bg-gray-100">
                      <svg
                        className="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  )}
                  <Button label="Change" size="sm" variant="tertiary" />
                </div>
              </div> */}
            </div>
            <HorizontalDivider />
            <div className="flex justify-end">
              <Button
                disabled={updateProfileMutation.isLoading}
                isLoading={updateProfileMutation.isLoading}
                label="Save"
                type="submit"
                variant="primary"
              />
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const isSessionLoading = status === 'loading';

  if (isSessionLoading) {
    return null;
  }

  if (session == null) {
    return <p>You are not signed in</p>;
  }

  return (
    <>
      <Head>
        <title>Settings | Tech Interview Handbook</title>
      </Head>
      <SettingsForm session={session} />
    </>
  );
}
