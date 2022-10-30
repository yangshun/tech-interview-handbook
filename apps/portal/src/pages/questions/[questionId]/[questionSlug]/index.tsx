import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
import { Button, Collapsible, HorizontalDivider, TextArea } from '@tih/ui';

import AnswerCommentListItem from '~/components/questions/AnswerCommentListItem';
import FullQuestionCard from '~/components/questions/card/question/FullQuestionCard';
import QuestionAnswerCard from '~/components/questions/card/QuestionAnswerCard';
import FullScreenSpinner from '~/components/questions/FullScreenSpinner';
import PaginationLoadMoreButton from '~/components/questions/PaginationLoadMoreButton';
import SortOptionsSelect from '~/components/questions/SortOptionsSelect';

import { APP_TITLE } from '~/utils/questions/constants';
import createSlug from '~/utils/questions/createSlug';
import relabelQuestionAggregates from '~/utils/questions/relabelQuestionAggregates';
import { useFormRegister } from '~/utils/questions/useFormRegister';
import { trpc } from '~/utils/trpc';

import { SortOrder, SortType } from '~/types/questions.d';

export type AnswerQuestionData = {
  answerContent: string;
};

export type QuestionCommentData = {
  commentContent: string;
};

export default function QuestionPage() {
  const router = useRouter();

  const [answerSortOrder, setAnswerSortOrder] = useState<SortOrder>(
    SortOrder.DESC,
  );
  const [answerSortType, setAnswerSortType] = useState<SortType>(SortType.NEW);

  const [commentSortOrder, setCommentSortOrder] = useState<SortOrder>(
    SortOrder.DESC,
  );
  const [commentSortType, setCommentSortType] = useState<SortType>(
    SortType.NEW,
  );

  const {
    register: ansRegister,
    handleSubmit,
    reset: resetAnswer,
    formState: { isDirty, isValid },
  } = useForm<AnswerQuestionData>({ mode: 'onChange' });
  const answerRegister = useFormRegister(ansRegister);

  const {
    register: comRegister,
    handleSubmit: handleCommentSubmit,
    reset: resetComment,
    formState: { isDirty: isCommentDirty, isValid: isCommentValid },
  } = useForm<QuestionCommentData>({ mode: 'onChange' });
  const commentRegister = useFormRegister(comRegister);

  const { questionId } = router.query;

  const { data: question } = trpc.useQuery([
    'questions.questions.getQuestionById',
    { id: questionId as string },
  ]);

  const { data: aggregatedEncounters } = trpc.useQuery([
    'questions.questions.encounters.getAggregatedEncounters',
    { questionId: questionId as string },
  ]);

  const relabeledAggregatedEncounters = useMemo(() => {
    if (!aggregatedEncounters) {
      return aggregatedEncounters;
    }

    return relabelQuestionAggregates(aggregatedEncounters);
  }, [aggregatedEncounters]);

  const utils = trpc.useContext();

  const commentInfiniteQuery = trpc.useInfiniteQuery(
    [
      'questions.questions.comments.getQuestionComments',
      {
        limit: 5,
        questionId: questionId as string,
        sortOrder: commentSortOrder,
        sortType: commentSortType,
      },
    ],
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      keepPreviousData: true,
    },
  );

  const { data: commentData } = commentInfiniteQuery;

  const { mutate: addComment } = trpc.useMutation(
    'questions.questions.comments.user.create',
    {
      onSuccess: () => {
        utils.invalidateQueries(
          'questions.questions.comments.getQuestionComments',
        );
      },
    },
  );

  const answerInfiniteQuery = trpc.useInfiniteQuery(
    [
      'questions.answers.getAnswers',
      {
        limit: 5,
        questionId: questionId as string,
        sortOrder: answerSortOrder,
        sortType: answerSortType,
      },
    ],
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      keepPreviousData: true,
    },
  );

  const { data: answerData } = answerInfiniteQuery;

  const { mutate: addAnswer } = trpc.useMutation(
    'questions.answers.user.create',
    {
      onSuccess: () => {
        utils.invalidateQueries('questions.answers.getAnswers');
      },
    },
  );

  const { mutate: addEncounter } = trpc.useMutation(
    'questions.questions.encounters.user.create',
    {
      onSuccess: () => {
        utils.invalidateQueries(
          'questions.questions.encounters.getAggregatedEncounters',
        );
        utils.invalidateQueries('questions.questions.getQuestionById');
      },
    },
  );

  const handleSubmitAnswer = (data: AnswerQuestionData) => {
    addAnswer({
      content: data.answerContent,
      questionId: questionId as string,
    });
    resetAnswer();
  };

  const handleSubmitComment = (data: QuestionCommentData) => {
    addComment({
      content: data.commentContent,
      questionId: questionId as string,
    });
    resetComment();
  };

  if (!question) {
    return <FullScreenSpinner />;
  }

  return (
    <>
      <Head>
        <title>
          {question.content} - {APP_TITLE}
        </title>
      </Head>
      <div className="flex w-full flex-1 items-stretch pb-4">
        <div className="flex items-baseline gap-2 py-4 pl-4">
          <Button
            addonPosition="start"
            display="inline"
            href="/questions/browse"
            icon={ArrowSmallLeftIcon}
            label="Back"
            variant="secondary"
          />
        </div>
        <div className="flex w-full justify-center overflow-y-auto py-4 px-5">
          <div className="flex max-w-7xl flex-1 flex-col gap-2">
            <FullQuestionCard
              {...question}
              companies={relabeledAggregatedEncounters?.companyCounts ?? {}}
              countries={relabeledAggregatedEncounters?.countryCounts ?? {}}
              questionId={question.id}
              receivedCount={undefined}
              roles={relabeledAggregatedEncounters?.roleCounts ?? {}}
              timestamp={question.seenAt.toLocaleDateString(undefined, {
                month: 'short',
                year: 'numeric',
              })}
              upvoteCount={question.numVotes}
              onReceivedSubmit={(data) => {
                addEncounter({
                  cityId: data.cityId,
                  companyId: data.company,
                  countryId: data.countryId,
                  questionId: questionId as string,
                  role: data.role,
                  seenAt: data.seenAt,
                  stateId: data.stateId,
                });
              }}
            />
            <div className="mx-2">
              <Collapsible label={`${question.numComments} comment(s)`}>
                <div className="mt-4 px-4">
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
                      <Button
                        disabled={!isCommentDirty || !isCommentValid}
                        label="Post"
                        type="submit"
                        variant="primary"
                      />
                    </div>
                  </form>
                  {/* TODO: Add button to load more */}
                  <div className="flex flex-col gap-2">
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
                    {(commentData?.pages ?? []).flatMap(
                      ({ processedQuestionCommentsData: comments }) =>
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
                    <PaginationLoadMoreButton query={commentInfiniteQuery} />
                  </div>
                </div>
              </Collapsible>
            </div>
            <HorizontalDivider />
            <form onSubmit={handleSubmit(handleSubmitAnswer)}>
              <TextArea
                {...answerRegister('answerContent', {
                  minLength: 1,
                  required: true,
                })}
                label="Contribute your answer"
                required={true}
                resize="vertical"
                rows={5}
              />
              <div className="mt-3 mb-1 flex justify-between">
                <Button
                  disabled={!isDirty || !isValid}
                  label="Contribute"
                  type="submit"
                  variant="primary"
                />
              </div>
            </form>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xl">{question.numAnswers} answers</p>
              <div className="flex items-end gap-2">
                <SortOptionsSelect
                  sortOrderValue={answerSortOrder}
                  sortTypeValue={answerSortType}
                  onSortOrderChange={setAnswerSortOrder}
                  onSortTypeChange={setAnswerSortType}
                />
              </div>
            </div>
            {/* TODO: Add button to load more */}
            {(answerData?.pages ?? []).flatMap(
              ({ processedAnswersData: answers }) =>
                answers.map((answer) => (
                  <QuestionAnswerCard
                    key={answer.id}
                    answerId={answer.id}
                    authorImageUrl={answer.userImage}
                    authorName={answer.user}
                    commentCount={answer.numComments}
                    content={answer.content}
                    createdAt={answer.createdAt}
                    href={`${router.asPath}/answer/${answer.id}/${createSlug(
                      answer.content,
                    )}`}
                    upvoteCount={answer.numVotes}
                  />
                )),
            )}
            <PaginationLoadMoreButton query={answerInfiniteQuery} />
          </div>
        </div>
      </div>
    </>
  );
}
