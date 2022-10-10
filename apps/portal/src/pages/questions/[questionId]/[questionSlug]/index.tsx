import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
import { Button, Collapsible, Select, TextArea } from '@tih/ui';

import AnswerCard from '~/components/questions/card/AnswerCard';
import FullQuestionCard from '~/components/questions/card/FullQuestionCard';
import CommentListItem from '~/components/questions/CommentListItem';
import FullScreenSpinner from '~/components/questions/FullScreenSpinner';

import {
  SAMPLE_ANSWER,
  SAMPLE_QUESTION_COMMENT,
} from '~/utils/questions/constants';
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

  const handleBackNavigation = () => {
    router.back();
  };

  const handleSubmitAnswer = (data: AnswerQuestionData) => {
    addAnswer({
      content: data.answerContent,
      questionId: questionId as string,
    });
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
    <div className="flex w-full flex-1 items-stretch pb-4">
      <div className="flex items-baseline gap-2 py-4 pl-4">
        <Button
          addonPosition="start"
          display="inline"
          icon={ArrowSmallLeftIcon}
          label="Back"
          variant="secondary"
          onClick={handleBackNavigation}></Button>
      </div>
      <div className="flex w-full  justify-center overflow-y-auto py-4 px-5">
        <div className="flex max-w-7xl flex-1 flex-col gap-2">
          <FullQuestionCard
            {...question}
            receivedCount={0} // TODO: Change to actual value
            showVoteButtons={true}
            timestamp={question.seenAt.toLocaleDateString()}
            upvoteCount={question.numVotes}
          />
          <div className="mx-2">
            <Collapsible label={`${question.numComments} comment(s)`}>
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
                <CommentListItem
                  key={comment.id}
                  authorImageUrl={SAMPLE_QUESTION_COMMENT.authorImageUrl}
                  authorName={comment.user}
                  content={comment.content}
                  createdAt={comment.createdAt}
                  upvoteCount={0}
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
                <p>{question.numAnswers} answers</p>
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
            <AnswerCard
              key={answer.id}
              authorImageUrl={SAMPLE_ANSWER.authorImageUrl}
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
  );
}
