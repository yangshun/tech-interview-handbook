import { useState } from 'react';
import { Tabs } from '@tih/ui';

import { trpc } from '~/utils/trpc';

import CommentsListButton from './CommentsListButton';
import { COMMENTS_SECTIONS } from './constants';

import type { ResumeComment } from '~/types/resume-comments';

type CommentsListProps = Readonly<{
  resumeId: string;
  setShowCommentsForm: (show: boolean) => void;
}>;

export default function CommentsList({
  resumeId,
  setShowCommentsForm,
}: CommentsListProps) {
  const [tab, setTab] = useState(COMMENTS_SECTIONS[0].value);
  const [comments, setComments] = useState<Array<ResumeComment>>([]);

  const onFetchComments = (data: Array<ResumeComment>) => {
    const filteredComments = data.filter((comment) => {
      return comment.section === tab;
    });

    setComments(filteredComments);
  };

  trpc.useQuery(['resumes.reviews.list', { resumeId }], {
    onSuccess: onFetchComments,
  });

  return (
    <div className="space-y-3">
      <CommentsListButton setShowCommentsForm={setShowCommentsForm} />
      <Tabs
        label="comments"
        tabs={COMMENTS_SECTIONS}
        value={tab}
        onChange={(value) => setTab(value)}
      />
      {/* TODO: Add comments lists */}
    </div>
  );
}
