import React from 'react';

import { trpc } from '~/utils/trpc';

function GenerateAnalysis() {
  const analysisMutation = trpc.useMutation(['offers.analysis.generate']);

  return (
    <div>
      {JSON.stringify(
        analysisMutation.mutate({ profileId: 'cl9gvjn8b004di96vd1hhh9c4' }),
      )}
    </div>
  );
}

export default GenerateAnalysis;
