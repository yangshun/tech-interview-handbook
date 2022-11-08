import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import OffersSubmissionForm from '~/components/offers/offersSubmission/OffersSubmissionForm';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      country: req.cookies.country ?? null,
    },
  };
};

export default function OffersSubmissionPage({
  country,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Analyze your offers</title>
      </Head>
      <OffersSubmissionForm country={country} />
    </>
  );
}
