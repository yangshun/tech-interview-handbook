import React from 'react';

import { trpc } from '~/utils/trpc';

function GetAnalysis() {
  const analysis = trpc.useQuery([
    'offers.analysis.get',
    { profileId: 'cl9luzsqh0005utr2d7jpjabt' },
  ]);

  return <div>{JSON.stringify(analysis.data)}</div>;
}

export default GetAnalysis;
