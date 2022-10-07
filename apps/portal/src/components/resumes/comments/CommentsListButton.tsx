import { signIn, useSession } from 'next-auth/react';
import { Button } from '@tih/ui';

type CommentsListButtonProps = {
  setShowCommentsForm: (show: boolean) => void;
};

export default function CommentsListButton({
  setShowCommentsForm,
}: CommentsListButtonProps) {
  const { data: session, status } = useSession();
  const isSessionLoading = status === 'loading';

  // Don't render anything
  if (isSessionLoading) {
    return null;
  }

  // Not signed in
  if (session == null) {
    return (
      <div className="flex justify-center">
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
          to join discussion
        </p>
      </div>
    );
  }

  // Signed in. Return Add review button
  return (
    <Button
      display="block"
      label="Add your review"
      variant="tertiary"
      onClick={() => setShowCommentsForm(true)}
    />
  );
}
