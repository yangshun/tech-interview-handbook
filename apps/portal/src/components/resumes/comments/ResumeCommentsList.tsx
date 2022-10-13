import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Spinner, Tabs } from '@tih/ui';
import { Button } from '@tih/ui';

import { trpc } from '~/utils/trpc';

import ResumeCommentListItem from './comment/ResumeCommentListItem';
import { RESUME_COMMENTS_SECTIONS } from './resumeCommentConstants';
import ResumeSignInButton from '../shared/ResumeSignInButton';

type ResumeCommentsListProps = Readonly<{
  resumeId: string;
  setShowCommentsForm: (show: boolean) => void;
}>;

export default function ResumeCommentsList({
  resumeId,
  setShowCommentsForm,
}: ResumeCommentsListProps) {
  const { data: sessionData } = useSession();
  const [tab, setTab] = useState(RESUME_COMMENTS_SECTIONS[0].value);

  const commentsQuery = trpc.useQuery(['resumes.reviews.list', { resumeId }]);
  const renderButton = () => {
    if (sessionData === null) {
      return <ResumeSignInButton text="to join discussion" />;
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
        tabs={RESUME_COMMENTS_SECTIONS}
        value={tab}
        onChange={(value) => setTab(value)}
      />

      {commentsQuery.isFetching ? (
        <div className="col-span-10 pt-4">
          <Spinner display="block" size="lg" />
        </div>
      ) : (
        <div className="m-2 flow-root h-[calc(100vh-20rem)] w-full flex-col space-y-3 overflow-y-auto">
          {(commentsQuery.data?.filter((c) => c.section === tab) ?? []).map(
            (comment) => (
              <ResumeCommentListItem
                key={comment.id}
                comment={comment}
                userId={sessionData?.user?.id}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}
