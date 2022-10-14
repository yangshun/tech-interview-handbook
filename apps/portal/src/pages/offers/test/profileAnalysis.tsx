import React from 'react';

import { trpc } from '~/utils/trpc';

function profileAnalysis() {
  const analysis = trpc.useQuery([
    'offers.analysis.generate',
    { profileId: 'cl96stky5002ew32gx2kale2x' },
  ]);

  return <div>{JSON.stringify(analysis.data)}</div>;
}

export default profileAnalysis;
