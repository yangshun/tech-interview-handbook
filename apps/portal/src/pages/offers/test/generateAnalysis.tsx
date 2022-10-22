import React from 'react';

import { trpc } from '~/utils/trpc';

function GenerateAnalysis() {
  const analysisMutation = trpc.useMutation(['offers.analysis.generate']);

  return (
    <div>
      {JSON.stringify(
        analysisMutation.mutate({ profileId: 'cl9j50xzk008vutfqg6mta2ey' }),
      )}
    </div>
  );
}

export default GenerateAnalysis;
