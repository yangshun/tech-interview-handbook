import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
import { Button, Select, TextArea } from '@tih/ui';

import AnswerCommentListItem from '~/components/questions/AnswerCommentListItem';
import FullAnswerCard from '~/components/questions/card/FullAnswerCard';
import FullScreenSpinner from '~/components/questions/FullScreenSpinner';

import { APP_TITLE } from '~/utils/questions/constants';
import { useFormRegister } from '~/utils/questions/useFormRegister';
import { trpc } from '~/utils/trpc';

export type AnswerCommentData = {
  commentContent: string;
};

export default function QuestionPage() {
  const router = useRouter();

  const {
    register: comRegister,
    reset: resetComment,
    handleSubmit: handleCommentSubmit,
    formState: { isDirty: isCommentDirty, isValid: isCommentValid },
  } = useForm<AnswerCommentData>({ mode: 'onChange' });
  const commentRegister = useFormRegister(comRegister);

  const { answerId } = router.query;

  const utils = trpc.useContext();

  const { data: answer } = trpc.useQuery([
    'questions.answers.getAnswerById',
    { answerId: answerId as string },
  ]);

  const { data: comments } = trpc.useQuery([
    'questions.answers.comments.getAnswerComments',
    { answerId: answerId as string },
  ]);

  const { mutate: addComment } = trpc.useMutation(
    'questions.answers.comments.user.create',
    {
      onSuccess: () => {
        utils.invalidateQueries([
          'questions.answers.comments.getAnswerComments',
          { answerId: answerId as string },
        ]);
      },
    },
  );

  const handleSubmitComment = (data: AnswerCommentData) => {
    resetComment();
    addComment({
      answerId: answerId as string,
      content: data.commentContent,
    });
  };

  if (!answer) {
    return <FullScreenSpinner />;
  }

  return (
    <>
      <Head>
        <title>
          {answer.content} - {APP_TITLE}
        </title>
      </Head>
      <div className="flex w-full flex-1 items-stretch pb-4">
        <div className="flex items-baseline gap-2 py-4 pl-4">
          <Button
            addonPosition="start"
            display="inline"
            href={`/questions/${router.query.questionId}/${router.query.questionSlug}`}
            icon={ArrowSmallLeftIcon}
            label="Back"
            variant="secondary"
          />
        </div>
        <div className="flex w-full  justify-center overflow-y-auto py-4 px-5">
          <div className="flex max-w-7xl flex-1 flex-col gap-2">
            <FullAnswerCard
              answerId={answer.id}
              authorImageUrl={answer.userImage}
              authorName={answer.user}
              content={answer.content}
              createdAt={answer.createdAt}
              upvoteCount={answer.numVotes}
            />
            <div className="mx-2">
              <form
                className="mb-2"
                onSubmit={handleCommentSubmit(handleSubmitComment)}>
                <TextArea
                  {...commentRegister('commentContent', {
                    minLength: 1,
                    required: true,
                  })}
                  label="Post a comment"
                  required={true}
                  resize="vertical"
                  rows={2}
                />
                <div className="my-3 flex justify-between">
                  <div className="flex items-baseline gap-2">
                    <span aria-hidden={true} className="text-sm">
                      Sort by:
                    </span>
                    <Select
                      display="inline"
                      isLabelHidden={true}
                      label="Sort by"
                      options={[
                        {
                          label: 'Most recent',
                          value: 'most-recent',
                        },
                        {
                          label: 'Most upvotes',
                          value: 'most-upvotes',
                        },
                      ]}
                      value="most-recent"
                      onChange={(value) => {
                        // eslint-disable-next-line no-console
                        console.log(value);
                      }}
                    />
                  </div>

                  <Button
                    disabled={!isCommentDirty || !isCommentValid}
                    label="Post"
                    type="submit"
                    variant="primary"
                  />
                </div>
              </form>

              {(comments ?? []).map((comment) => (
                <AnswerCommentListItem
                  key={comment.id}
                  answerCommentId={comment.id}
                  authorImageUrl={comment.userImage}
                  authorName={comment.user}
                  content={comment.content}
                  createdAt={comment.createdAt}
                  upvoteCount={comment.numVotes}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
