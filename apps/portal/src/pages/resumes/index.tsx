import BrowsePageBody from '~/components/resumes/browse/BrowsePageBody';
import ResumeReviewsTitle from '~/components/resumes/ResumeReviewsTitle';

export default function ResumeHomePage() {
  return (
    <main className="h-full flex-1 overflow-y-auto">
      <div className="ml-4 py-4">
        <ResumeReviewsTitle />
      </div>
      <div className="mt-4 flex items-start">
        <BrowsePageBody />
      </div>
    </main>
  );
}
