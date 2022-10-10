import React from 'react';

import { trpc } from '~/utils/trpc';

function Test() {
  const data = trpc.useQuery([
    'offers.list',
    {
      limit: 5,
      location: 'Singapore, Singapore',
      offset: 0,
      sortBy: '-totalYoe',
      yoeCategory: 1,
    },
  ]);

  return <>{JSON.stringify(data.data)}</>;
}

export default Test;
