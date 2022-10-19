import React from 'react';

import { trpc } from '~/utils/trpc';

function GenerateAnalysis() {
  const analysis = trpc.useQuery([
    'offers.analysis.generate',
    { profileId: 'cl98ywtbv0000tx1s4p18eol1' },
  ]);

  return <div>{JSON.stringify(analysis.data)}</div>;
}

export default GenerateAnalysis;
