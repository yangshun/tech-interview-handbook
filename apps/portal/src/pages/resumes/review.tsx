import {
  AcademicCapIcon,
  BriefcaseIcon,
  CalendarIcon,
  InformationCircleIcon,
  MapPinIcon,
  StarIcon,
} from '@heroicons/react/20/solid';

import CommentsSection from '~/components/resumes/comments/CommentsSection';
import ResumePdf from '~/components/resumes/ResumePdf';

export default function ResumeReviewPage() {
  return (
    <main className="flex-1 p-4">
      <div className="flex flex-row md:space-x-8">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Please help moi, applying for medtech startups in Singapore
        </h1>
        <button
          className="isolate inline-flex max-h-10 items-center space-x-4 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          type="button">
          <span className="relative inline-flex">
            <StarIcon
              aria-hidden="true"
              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
            />
            Star
          </span>
          <span className="relative -ml-px inline-flex">12k</span>
        </button>
      </div>
      <div className="flex flex-col pt-1 sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-8">
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <BriefcaseIcon
            aria-hidden="true"
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
          />
          Software Engineer (Backend)
        </div>
        <div className="flex items-center pt-2 text-sm text-gray-500">
          <MapPinIcon
            aria-hidden="true"
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
          />
          Singapore
        </div>
        <div className="flex items-center pt-2 text-sm text-gray-500">
          <AcademicCapIcon
            aria-hidden="true"
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
          />
          Fresh Grad
        </div>
        <div className="flex items-center pt-2 text-sm text-gray-500">
          <CalendarIcon
            aria-hidden="true"
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
          />
          Uploaded 2 days ago by Git Ji Ra
        </div>
      </div>
      <div className="flex items-center pt-2 text-sm text-gray-500">
        <InformationCircleIcon
          aria-hidden="true"
          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
        />
        Looking to break into SWE roles after doing engineering for the past 2
        years
      </div>
      <div className="flex h-full w-full flex-row py-4">
        <div className="w-1/2">
          <ResumePdf />
        </div>
        <div className="mx-8 w-1/2">
          <CommentsSection />
        </div>
      </div>
    </main>
  );
}
