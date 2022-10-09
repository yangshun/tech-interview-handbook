import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
import { Button, Collapsible, Select, TextArea } from '@tih/ui';

import AnswerCard from '~/components/questions/card/AnswerCard';
import QuestionOverviewCard from '~/components/questions/card/QuestionOverviewCard';

import { SAMPLE_QUESTION } from '~/utils/questions/constants';
import { useFormRegister } from '~/utils/questions/useFormRegister';

export type AnswerQuestionData = {
  answerContent: string;
};

export default function QuestionPage() {
  const router = useRouter();
  const {
    register: formRegister,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<AnswerQuestionData>({ mode: 'onChange' });
  const register = useFormRegister(formRegister);
  const question = SAMPLE_QUESTION;

  const handleBackNavigation = () => {
    router.back();
  };

  const handleSubmitAnswer = (data: AnswerQuestionData) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <div className="flex">
      <div className="flex items-baseline gap-2 py-4 pl-4">
        <Button
          addonPosition="start"
          display="inline"
          icon={ArrowSmallLeftIcon}
          label="Back"
          variant="secondary"
          onClick={handleBackNavigation}></Button>
      </div>
      <div className="flex flex-col items-center overflow-y-auto py-4 px-5">
        <div className="flex max-w-7xl flex-col gap-2">
          <QuestionOverviewCard {...question} />
          <Collapsible label="256 comments">
            <div>Comment placeholder</div>
          </Collapsible>
          <form onSubmit={handleSubmit(handleSubmitAnswer)}>
            <TextArea
              {...register('answerContent', { minLength: 1, required: true })}
              label="Contribute your answer"
              required={true}
              resize="vertical"
              rows={5}
            />
            <div className="mt-2 flex justify-end">
              <Button
                disabled={!isDirty || !isValid}
                label="Contribute"
                type="submit"
                variant="primary"
              />
            </div>
          </form>
          <div className="my-2 flex items-baseline justify-between">
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

          {Array.from({ length: question.answerCount }).map((_, index) => (
            <AnswerCard
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              author="James Smith"
              content="Hello"
              upvoteCount={10}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
