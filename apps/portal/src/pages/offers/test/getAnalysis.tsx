import React from 'react';

import { trpc } from '~/utils/trpc';

function GetAnalysis() {
  const analysis = trpc.useQuery([
    'offers.analysis.get',
    { profileId: 'cl9h23fb1002ftxysli5iziu2' },
  ]);

  return <div>{JSON.stringify(analysis.data)}</div>;
}

export default GetAnalysis;
