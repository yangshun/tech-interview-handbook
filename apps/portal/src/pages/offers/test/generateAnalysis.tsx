import React from 'react';

import { trpc } from '~/utils/trpc';

function GenerateAnalysis() {
  const analysisMutation = trpc.useMutation(['offers.analysis.generate']);

  return (
    <div>
      {JSON.stringify(
        analysisMutation.mutate({ profileId: 'cl98ywtbv0000tx1s4p18eol1' }),
      )}
    </div>
  );
}

export default GenerateAnalysis;
