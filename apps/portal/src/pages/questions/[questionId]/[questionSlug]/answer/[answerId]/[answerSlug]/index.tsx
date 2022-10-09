import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
import { Button, Select, TextArea } from '@tih/ui';

import FullAnswerCard from '~/components/questions/card/FullAnswerCard';
import CommentListItem from '~/components/questions/CommentListItem';

import {
  SAMPLE_ANSWER,
  SAMPLE_ANSWER_COMMENT,
  SAMPLE_QUESTION,
} from '~/utils/questions/constants';
import { useFormRegister } from '~/utils/questions/useFormRegister';

export type AnswerCommentData = {
  commentContent: string;
};

export default function QuestionPage() {
  const router = useRouter();

  const {
    register: comRegister,
    handleSubmit: handleCommentSubmit,
    formState: { isDirty: isCommentDirty, isValid: isCommentValid },
  } = useForm<AnswerCommentData>({ mode: 'onChange' });
  const commentRegister = useFormRegister(comRegister);

  const question = SAMPLE_QUESTION;
  const comment = SAMPLE_ANSWER_COMMENT;
  const handleBackNavigation = () => {
    router.back();
  };

  const handleSubmitComment = (data: AnswerCommentData) => {
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
          <FullAnswerCard {...SAMPLE_ANSWER} />
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
          </div>
        </div>
      </div>
    </div>
  );
}
