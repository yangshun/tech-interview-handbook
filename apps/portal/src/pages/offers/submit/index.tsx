import Head from 'next/head';

import OffersSubmissionForm from '~/components/offers/offersSubmission/OffersSubmissionForm';

export default function OffersSubmissionPage() {
  return (
    <>
      <Head>
        <title>Analyze your offers</title>
      </Head>
      <OffersSubmissionForm />
    </>
  );
}
