import { Button, Collapsible, TextArea } from '@tih/ui';

import AnswerCard from '~/components/questions/card/AnswerCard';
import QuestionOverviewCard from '~/components/questions/card/QuestionOverviewCard';

import { SAMPLE_QUESTION } from '~/utils/questions/constants';

export default function QuestionPage() {
  const question = SAMPLE_QUESTION;
  return (
    <div className="flex w-full flex-col items-center overflow-y-auto p-4">
      <div className="flex max-w-7xl flex-col gap-2">
        <h1 className="text-2xl">Question overview</h1>
        <QuestionOverviewCard {...question} />
        <Collapsible label="256 comments">
          <div>Comment placeholder</div>
        </Collapsible>
        <TextArea label="Contribute an answer" rows={5} />
        <div className="flex justify-end">
          <Button label="Contribute" variant="primary" />
        </div>
        <p>{question.answerCount} answers</p>
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
  );
}
