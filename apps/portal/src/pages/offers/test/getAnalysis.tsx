import React from 'react';

import { trpc } from '~/utils/trpc';

function GetAnalysis() {
  const analysis = trpc.useQuery([
    'offers.analysis.get',
    { profileId: 'cl9lwe9m902k5utskjs52wc0j' },
  ]);

  return <div>{JSON.stringify(analysis.data)}</div>;
}

export default GetAnalysis;
