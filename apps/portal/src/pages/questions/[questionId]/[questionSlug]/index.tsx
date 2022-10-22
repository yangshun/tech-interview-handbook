import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
import { Button, Collapsible, Select, TextArea } from '@tih/ui';

import AnswerCommentListItem from '~/components/questions/AnswerCommentListItem';
import FullQuestionCard from '~/components/questions/card/question/FullQuestionCard';
import QuestionAnswerCard from '~/components/questions/card/QuestionAnswerCard';
import FullScreenSpinner from '~/components/questions/FullScreenSpinner';

import { APP_TITLE } from '~/utils/questions/constants';
import createSlug from '~/utils/questions/createSlug';
import { useFormRegister } from '~/utils/questions/useFormRegister';
import { trpc } from '~/utils/trpc';

export type AnswerQuestionData = {
  answerContent: string;
};

export type QuestionCommentData = {
  commentContent: string;
};

export default function QuestionPage() {
  const router = useRouter();
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

  const utils = trpc.useContext();

  const { data: comments } = trpc.useQuery([
    'questions.questions.comments.getQuestionComments',
    { questionId: questionId as string },
  ]);

  const { mutate: addComment } = trpc.useMutation(
    'questions.questions.comments.create',
    {
      onSuccess: () => {
        utils.invalidateQueries(
          'questions.questions.comments.getQuestionComments',
        );
      },
    },
  );

  const { data: answers } = trpc.useQuery([
    'questions.answers.getAnswers',
    { questionId: questionId as string },
  ]);

  const { mutate: addAnswer } = trpc.useMutation('questions.answers.create', {
    onSuccess: () => {
      utils.invalidateQueries('questions.answers.getAnswers');
    },
  });

  const { mutate: addEncounter } = trpc.useMutation(
    'questions.questions.encounters.create',
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
        <div className="flex w-full  justify-center overflow-y-auto py-4 px-5">
          <div className="flex max-w-7xl flex-1 flex-col gap-2">
            <FullQuestionCard
              {...question}
              companies={aggregatedEncounters?.companyCounts ?? {}}
              locations={aggregatedEncounters?.locationCounts ?? {}}
              questionId={question.id}
              receivedCount={undefined}
              roles={aggregatedEncounters?.roleCounts ?? {}}
              timestamp={question.seenAt.toLocaleDateString(undefined, {
                month: 'short',
                year: 'numeric',
              })}
              upvoteCount={question.numVotes}
              onReceivedSubmit={(data) => {
                addEncounter({
                  companyId: data.company,
                  location: data.location,
                  questionId: questionId as string,
                  role: data.role,
                  seenAt: data.seenAt,
                });
              }}
            />
            <div className="mx-2">
              <Collapsible label={`${(comments ?? []).length} comment(s)`}>
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
              </Collapsible>
            </div>
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
                <div className="flex items-baseline justify-start gap-2">
                  <p>{(answers ?? []).length} answers</p>
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
                </div>
                <Button
                  disabled={!isDirty || !isValid}
                  label="Contribute"
                  type="submit"
                  variant="primary"
                />
              </div>
            </form>
            {(answers ?? []).map((answer) => (
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
