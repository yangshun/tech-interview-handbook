import QuestionBankTitle from '~/components/questions/QuestionBankTitle';

export default function QuestionsHomePage() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="flex h-full items-center justify-center">
        <QuestionBankTitle />
      </div>
    </main>
  );
}
