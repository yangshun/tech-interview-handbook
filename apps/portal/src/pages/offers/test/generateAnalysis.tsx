import React from 'react';

import { trpc } from '~/utils/trpc';

function GenerateAnalysis() {
  const analysisMutation = trpc.useMutation(['offers.analysis.generate']);

  return (
    <div>
      {JSON.stringify(
        analysisMutation.mutate({ profileId: 'cl9luzsqh0005utr2d7jpjabt' }),
      )}
    </div>
  );
}

export default GenerateAnalysis;
