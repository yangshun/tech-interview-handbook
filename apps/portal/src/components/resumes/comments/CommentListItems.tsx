import { useSession } from 'next-auth/react';
import { Spinner } from '@tih/ui';

import Comment from './comment/Comment';

import type { ResumeComment } from '~/types/resume-comments';

type Props = Readonly<{
  comments: Array<ResumeComment>;
  isLoading: boolean;
}>;

export default function CommentListItems({ comments, isLoading }: Props) {
  const { data: session } = useSession();

  if (isLoading) {
    return (
      <div className="col-span-10 pt-4">
        <Spinner display="block" size="lg" />
      </div>
    );
  }

  return (
    <div className="m-2 flow-root h-[calc(100vh-20rem)] w-full flex-col space-y-3 overflow-y-auto">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          userId={session?.user?.id}
        />
      ))}
    </div>
  );
}
