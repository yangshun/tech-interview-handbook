import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextArea } from '~/ui';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';
import FullAnswerCard from '~/components/questions/card/FullAnswerCard';
import AnswerCommentListItem from '~/components/questions/comments/AnswerCommentListItem';
import FullScreenSpinner from '~/components/questions/FullScreenSpinner';
import BackButtonLayout from '~/components/questions/layout/BackButtonLayout';
import PaginationLoadMoreButton from '~/components/questions/PaginationLoadMoreButton';
import SortOptionsSelect from '~/components/questions/SortOptionsSelect';

import { APP_TITLE } from '~/utils/questions/constants';
import { useFormRegister } from '~/utils/questions/useFormRegister';
import { useProtectedCallback } from '~/utils/questions/useProtectedCallback';
import { trpc } from '~/utils/trpc';

import { SortOrder, SortType } from '~/types/questions.d';

export type AnswerCommentData = {
  commentContent: string;
};

export default function QuestionPage() {
  const router = useRouter();
  const { event } = useGoogleAnalytics();

  const [commentSortOrder, setCommentSortOrder] = useState<SortOrder>(
    SortOrder.DESC,
  );
  const [commentSortType, setCommentSortType] = useState<SortType>(
    SortType.NEW,
  );

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

  const answerCommentInfiniteQuery = trpc.useInfiniteQuery(
    [
      'questions.answers.comments.getAnswerComments',
      {
        answerId: answerId as string,
        limit: 5,
        sortOrder: commentSortOrder,
        sortType: commentSortType,
      },
    ],
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      keepPreviousData: true,
    },
  );

  const { data: answerCommentsData } = answerCommentInfiniteQuery;

  const { mutate: addComment } = trpc.useMutation(
    'questions.answers.comments.user.create',
    {
      onSuccess: () => {
        utils.invalidateQueries([
          'questions.answers.comments.getAnswerComments',
          {
            answerId: answerId as string,
            sortOrder: SortOrder.DESC,
            sortType: SortType.NEW,
          },
        ]);

        const previousData = utils.getQueryData([
          'questions.answers.getAnswerById',
          { answerId: answerId as string },
        ]);

        if (previousData === undefined) {
          return;
        }

        utils.setQueryData(
          ['questions.answers.getAnswerById', { answerId: answerId as string }],
          {
            ...previousData,
            numComments: previousData.numComments + 1,
          },
        );

        event({
          action: 'questions.comment',
          category: 'engagement',
          label: 'comment on answer',
        });
      },
    },
  );

  const handleSubmitComment = useProtectedCallback(
    (data: AnswerCommentData) => {
      resetComment();
      addComment({
        answerId: answerId as string,
        content: data.commentContent,
      });
    },
  );

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
      <BackButtonLayout
        href={`/questions/${router.query.questionId}/${router.query.questionSlug}`}>
        <div className="flex max-w-7xl flex-1 flex-col gap-4">
          <FullAnswerCard
            answerId={answer.id}
            authorImageUrl={answer.userImage}
            authorName={answer.user}
            content={answer.content}
            createdAt={answer.createdAt}
            upvoteCount={answer.numVotes}
          />
          <div>
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
              <div className="my-3 flex justify-end">
                <Button
                  disabled={!isCommentDirty || !isCommentValid}
                  label="Post"
                  type="submit"
                  variant="primary"
                />
              </div>
            </form>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-lg">Comments</p>
                <div className="flex items-end gap-2">
                  <SortOptionsSelect
                    sortOrderValue={commentSortOrder}
                    sortTypeValue={commentSortType}
                    onSortOrderChange={setCommentSortOrder}
                    onSortTypeChange={setCommentSortType}
                  />
                </div>
              </div>
              {/* TODO: Allow to load more pages */}
              {(answerCommentsData?.pages ?? []).flatMap(({ data: comments }) =>
                comments.map((comment) => (
                  <AnswerCommentListItem
                    key={comment.id}
                    answerCommentId={comment.id}
                    authorImageUrl={comment.userImage}
                    authorName={comment.user}
                    content={comment.content}
                    createdAt={comment.createdAt}
                    upvoteCount={comment.numVotes}
                  />
                )),
              )}
              <PaginationLoadMoreButton query={answerCommentInfiniteQuery} />
            </div>
          </div>
        </div>
      </BackButtonLayout>
    </>
  );
}
