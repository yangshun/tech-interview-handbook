import React from 'react';

import { trpc } from '~/utils/trpc';

function GetAnalysis() {
  const analysis = trpc.useQuery([
    'offers.analysis.get',
    { profileId: 'cl9j50xzk008vutfqg6mta2ey' },
  ]);

  return <div>{JSON.stringify(analysis.data)}</div>;
}

export default GetAnalysis;
