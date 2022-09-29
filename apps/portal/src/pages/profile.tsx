import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const isSessionLoading = status === 'loading';

  if (isSessionLoading) {
    return null;
  }

  return (
    <main className="flex-1 overflow-y-auto p-6 space-y-6">
      <h1 className="font-bold text-4xl">Profile</h1>
      {session?.user?.image && (
        <img
          alt={session?.user?.email ?? session?.user?.name ?? ''}
          className="h-24 w-24 rounded-full"
          src={session?.user.image}
        />
      )}
      {session?.user?.email && <p>{session?.user?.email}</p>}
      {session?.user?.name && <p>{session?.user?.name}</p>}
    </main>
  );
}
