import { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/20/solid';

import { HorizontalDivider, Tabs } from '~/../../../packages/ui/dist';

const tabs = [
  {
    label: 'Overall',
    value: 'overall',
  },
  {
    label: 'Shopee',
    value: 'company-id',
  },
];

function OfferPercentileAnalysis() {
  const result = {
    company: 'Shopee',
    numberOfOffers: 105,
    percentile: 56,
  };

  return (
    <p>
      Your highest offer is from {result.company}, which is {result.percentile}{' '}
      percentile out of {result.numberOfOffers} offers received in Singapore for
      the same job type, same level, and same YOE in the last year.
    </p>
  );
}

function OfferProfileCard() {
  return (
    <div className="my-5 block rounded-lg border p-4">
      <div className="grid grid-flow-col grid-cols-12 gap-x-10">
        <div className="col-span-1">
          <UserCircleIcon width={50} />
        </div>
        <div className="col-span-10">
          <p className="text-sm	font-semibold">profile-name</p>
          <p className="text-xs	">Previous company: Meta, Singapore</p>
          <p className="text-xs	">YOE: 4 years</p>
        </div>
      </div>

      <HorizontalDivider />
      <div className="grid grid-flow-col grid-cols-2 gap-x-10">
        <div className="col-span-1 row-span-3">
          <p className="text-sm	font-semibold">Software engineer</p>
          <p className="text-xs	">Company: Google, Singapore</p>
          <p className="text-xs	">Level: G4</p>
        </div>
        <div className="col-span-1 row-span-3">
          <p className="text-end text-sm">Sept 2022</p>
          <p className="text-end text-xl">$125,000 / year</p>
        </div>
      </div>
    </div>
  );
}

function TopOfferProfileList() {
  return (
    <>
      <OfferProfileCard />
      <OfferProfileCard />
    </>
  );
}

function OfferAnalysisContent() {
  return (
    <>
      <OfferPercentileAnalysis />
      <TopOfferProfileList />
    </>
  );
}

export default function OfferAnalysis() {
  const [tab, setTab] = useState('Overall');

  return (
    <div>
      <h5 className="mb-2 text-center text-4xl font-bold text-gray-900">
        Result
      </h5>
      <div>
        <Tabs
          label="Result Navigation"
          tabs={tabs}
          value={tab}
          onChange={setTab}
        />
        <HorizontalDivider className="mb-5" />
        <OfferAnalysisContent />
      </div>
    </div>
  );
}
