import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Tabs } from '@tih/ui';
import { Button } from '@tih/ui';

import { trpc } from '~/utils/trpc';

import CommentListItems from './CommentListItems';
import { COMMENTS_SECTIONS } from './constants';
import SignInButton from '../SignInButton';

type CommentsListProps = Readonly<{
  resumeId: string;
  setShowCommentsForm: (show: boolean) => void;
}>;

export default function CommentsList({
  resumeId,
  setShowCommentsForm,
}: CommentsListProps) {
  const { data: sessionData } = useSession();
  const [tab, setTab] = useState(COMMENTS_SECTIONS[0].value);

  const commentsQuery = trpc.useQuery(['resumes.reviews.list', { resumeId }]);
  const renderButton = () => {
    if (sessionData === null) {
      return <SignInButton text="to join discussion" />;
    }
    return (
      <Button
        display="block"
        label="Add your review"
        variant="tertiary"
        onClick={() => setShowCommentsForm(true)}
      />
    );
  };

  return (
    <div className="space-y-3">
      {renderButton()}
      <Tabs
        label="comments"
        tabs={COMMENTS_SECTIONS}
        value={tab}
        onChange={(value) => setTab(value)}
      />
      <CommentListItems
        comments={commentsQuery.data?.filter((c) => c.section === tab) ?? []}
        isLoading={commentsQuery.isFetching}
      />
    </div>
  );
}
