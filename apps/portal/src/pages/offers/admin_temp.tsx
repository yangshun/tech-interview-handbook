import crypto from 'crypto';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { Banner } from '@tih/ui';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';
import OffersTable from '~/components/offers/admin_temp/OffersTable';
import CompaniesTypeahead from '~/components/shared/CompaniesTypeahead';
import Container from '~/components/shared/Container';
import CountriesTypeahead from '~/components/shared/CountriesTypeahead';
import type { JobTitleType } from '~/components/shared/JobTitles';
import { getLabelForJobTitleType } from '~/components/shared/JobTitles';
import JobTitlesTypeahead from '~/components/shared/JobTitlesTypeahead';

import { useSearchParamSingle } from '~/utils/offers/useSearchParam';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      country: req.cookies.country ?? null,
    },
  };
};

export default function OffersHomePage({
  country,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [countryFilter, setCountryFilter] = useState('');
  const { event: gaEvent } = useGoogleAnalytics();
  const [selectedCompanyName, setSelectedCompanyName] =
    useSearchParamSingle('companyName');
  const [selectedCompanyId, setSelectedCompanyId] =
    useSearchParamSingle('companyId');

  const [selectedJobTitleId, setSelectedJobTitleId] =
    useSearchParamSingle<JobTitleType | null>('jobTitleId');

  const { data: session, status } = useSession();

  const authoizedPeople = [
    '8b4550989cb7fe9ea7649b5538178b8d19aba0f3e5944dbff0b8d0e2ffe3911f',
    '0544d5d2be7815b5347dd2233c4d08a52120e52ac529f21b1a5c2005db3c42ab',
    '9934698c65bc72876018350a02910acdb27b7974dc757a320057588b67c5422b',
    '5cd57c9d1cc00d1010c3548ea3941941c04d18f7cf50766cdec30b12630e69ac',
  ];

  const isAuthorized = authoizedPeople.includes(
    crypto
      .createHash('sha256')
      .update(session?.user?.email ?? '')
      .digest('hex'),
  );

  if (!isAuthorized && status !== 'loading') {
    router.push('/offers');
  }
  return (
    isAuthorized && (
      <>
        <Head>
          <title>Admin Home - Tech Offers Repo</title>
        </Head>
        <main className="flex-1 overflow-y-auto">
          <Banner size="sm">
            ⭐ Check if your offer is competitive by submitting it{' '}
            <Link className="underline" href="/offers/submit">
              here
            </Link>
            . ⭐
          </Banner>
          <div className="text-primary-600 flex items-center justify-end space-x-1 bg-slate-100 px-4 pt-4 sm:text-lg">
            <span>
              <MapPinIcon className="flex h-7 w-7" />
            </span>
            <CountriesTypeahead
              isLabelHidden={true}
              placeholder="All Countries"
              onSelect={(option) => {
                if (option) {
                  setCountryFilter(option.value);
                  gaEvent({
                    action: `offers.table_filter_country_${option.value}`,
                    category: 'engagement',
                    label: 'Filter by country',
                  });
                } else {
                  setCountryFilter('');
                }
              }}
            />
          </div>
          <div className="bg-slate-100 py-16 px-4">
            <div>
              <div>
                <h1 className="text-primary-600 text-center text-4xl font-bold sm:text-5xl">
                  Tech Offers Repo (Admin)
                </h1>
              </div>
              <div className="mt-4 text-center text-lg text-slate-600 sm:text-2xl">
                Find out how good your offer is. Discover how others got their
                offers.
              </div>
            </div>
            <div className="mt-6 flex flex-col items-center justify-center space-y-2 text-sm text-slate-700 sm:mt-10 sm:flex-row sm:space-y-0 sm:space-x-4 sm:text-lg">
              <span>Viewing offers for</span>
              <div className="flex items-center space-x-4">
                <JobTitlesTypeahead
                  isLabelHidden={true}
                  placeholder="All Job Titles"
                  textSize="inherit"
                  value={
                    selectedJobTitleId
                      ? {
                          id: selectedJobTitleId,
                          label: getLabelForJobTitleType(
                            selectedJobTitleId as JobTitleType,
                          ),
                          value: selectedJobTitleId,
                        }
                      : null
                  }
                  onSelect={(option) => {
                    if (option) {
                      setSelectedJobTitleId(option.id as JobTitleType);
                      gaEvent({
                        action: `offers.table_filter_job_title_${option.value}`,
                        category: 'engagement',
                        label: 'Filter by job title',
                      });
                    } else {
                      setSelectedJobTitleId(null);
                    }
                  }}
                />
                <span>in</span>
                <CompaniesTypeahead
                  isLabelHidden={true}
                  placeholder="All Companies"
                  textSize="inherit"
                  value={
                    selectedCompanyName
                      ? {
                          id: selectedCompanyId,
                          label: selectedCompanyName,
                          value: selectedCompanyId,
                        }
                      : null
                  }
                  onSelect={(option) => {
                    if (option) {
                      setSelectedCompanyId(option.id);
                      setSelectedCompanyName(option.label);
                      gaEvent({
                        action: `offers.table_filter_company_${option.value}`,
                        category: 'engagement',
                        label: 'Filter by company',
                      });
                    } else {
                      setSelectedCompanyId('');
                      setSelectedCompanyName('');
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <Container className="pb-20 pt-10">
            <OffersTable
              companyFilter={selectedCompanyId}
              companyName={selectedCompanyName}
              country={country}
              countryFilter={countryFilter}
              jobTitleFilter={selectedJobTitleId ?? ''}
            />
          </Container>
        </main>
      </>
    )
  );
}
