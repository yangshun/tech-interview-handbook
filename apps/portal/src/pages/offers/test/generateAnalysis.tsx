import React from 'react';

import { trpc } from '~/utils/trpc';

function GenerateAnalysis() {
  const analysisMutation = trpc.useMutation(['offers.analysis.generate']);

  return (
    <div>
      {JSON.stringify(
        analysisMutation.mutate({ profileId: 'cl9lwe9m902k5utskjs52wc0j' }),
      )}
    </div>
  );
}

export default GenerateAnalysis;
