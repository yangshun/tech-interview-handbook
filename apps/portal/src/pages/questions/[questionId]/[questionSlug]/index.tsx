import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
import { Button, Collapsible, Select, TextArea } from '@tih/ui';

import AnswerCard from '~/components/questions/card/AnswerCard';
import FullQuestionCard from '~/components/questions/card/FullQuestionCard';
import CommentListItem from '~/components/questions/CommentListItem';

import {
  SAMPLE_ANSWER,
  SAMPLE_QUESTION,
  SAMPLE_QUESTION_COMMENT,
} from '~/utils/questions/constants';
import { useFormRegister } from '~/utils/questions/useFormRegister';

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
    formState: { isDirty: isCommentDirty, isValid: isCommentValid },
  } = useForm<QuestionCommentData>({ mode: 'onChange' });
  const commentRegister = useFormRegister(comRegister);

  const question = SAMPLE_QUESTION;
  const comment = SAMPLE_QUESTION_COMMENT;
  const handleBackNavigation = () => {
    router.back();
  };

  const handleSubmitAnswer = (data: AnswerQuestionData) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const handleSubmitComment = (data: QuestionCommentData) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

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
          <FullQuestionCard {...question} showVoteButtons={true} />
          <div className="mx-2">
            <Collapsible label={`${question.commentCount} comment(s)`}>
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
                      }}></Select>
                  </div>

                  <Button
                    disabled={!isCommentDirty || !isCommentValid}
                    label="Post"
                    type="submit"
                    variant="primary"
                  />
                </div>
              </form>

              {Array.from({ length: question.commentCount }).map((_, index) => (
                <CommentListItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  {...comment}
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
                <p>{question.answerCount} answers</p>
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
                    }}></Select>
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

          {Array.from({ length: question.answerCount }).map((_, index) => (
            <AnswerCard
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              {...SAMPLE_ANSWER}
              href={`${router.asPath}/answer/1/1`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
