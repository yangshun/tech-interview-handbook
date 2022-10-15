import React from 'react';

import { trpc } from '~/utils/trpc';

function GenerateAnalysis() {
  const analysis = trpc.useQuery([
    'offers.analysis.generate',
    { profileId: 'cl98yxuei002htx1s8lrmwzmy' },
  ]);

  return <div>{JSON.stringify(analysis.data)}</div>;
}

export default GenerateAnalysis;
