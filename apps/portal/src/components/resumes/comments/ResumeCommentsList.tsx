import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Spinner, Tabs } from '@tih/ui';
import { Button } from '@tih/ui';

import { trpc } from '~/utils/trpc';

import { RESUME_COMMENTS_SECTIONS } from './resumeCommentConstants';
import ResumeCommentListItem from './ResumeCommentListItem';
import ResumeSignInButton from '../shared/ResumeSignInButton';

import type { ResumeComment } from '~/types/resume-comments';

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
  const [tabs, setTabs] = useState(RESUME_COMMENTS_SECTIONS);

  const commentsQuery = trpc.useQuery(['resumes.comments.list', { resumeId }], {
    onSuccess: (data: Array<ResumeComment>) => {
      const updatedTabs = RESUME_COMMENTS_SECTIONS.map(({ label, value }) => {
        const count = data.filter(({ section }) => section === value).length;
        const updatedLabel = count > 0 ? `${label} (${count})` : label;
        return {
          label: updatedLabel,
          value,
        };
      });

      setTabs(updatedTabs);
    },
  });

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
        tabs={tabs}
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
