import ContributeQuestionCard from '~/components/questions/ContributeQuestionCard';
import QuestionOverviewCard from '~/components/questions/QuestionOverviewCard';
import QuestionSearchBar from '~/components/questions/QuestionSearchBar';

export default function QuestionsHomePage() {
  return (
    <main className="flex flex-1 justify-center overflow-y-auto p-4">
      <div className="flex max-w-4xl flex-1 gap-x-4">
        <div className="flex flex-1 flex-col items-stretch justify-start gap-4">
          <ContributeQuestionCard
            onSubmit={(data) => {
              // eslint-disable-next-line no-console
              console.log(data);
            }}
          />
          <QuestionSearchBar
            sortOptions={[
              {
                label: 'Most recent',
                value: 'most-recent',
              },
              {
                label: 'Most upvotes',
                value: 'most-upvotes',
              },
            ]}
            sortValue="most-recent"
          />
          <QuestionOverviewCard
            answerCount={0}
            content="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and an integer target, return indices of the two numbers such that they add up. Given an array of integers nums and"
            location="Menlo Park, CA"
            role="Senior Engineering Manager"
            similarCount={0}
            timestamp=""
            upvoteCount={0}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1>To do: Filter column</h1>
        </div>
      </div>
    </main>
  );
}
