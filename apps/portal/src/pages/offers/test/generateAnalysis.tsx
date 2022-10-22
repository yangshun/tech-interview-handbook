import React from 'react';

import { trpc } from '~/utils/trpc';

function GenerateAnalysis() {
  const analysisMutation = trpc.useMutation(['offers.analysis.generate']);

  return (
    <div>
      {JSON.stringify(
        analysisMutation.mutate({ profileId: 'cl9jj2ks1001li9fn9np47wjr' }),
      )}
    </div>
  );
}

export default GenerateAnalysis;
