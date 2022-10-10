import React from 'react';

import { trpc } from '~/utils/trpc';

function test() {
  const data = trpc.useQuery([
    'offers.list',
    {
      limit: 3,
      location: 'Singapore, Singapore',
      offset: 0,
      sortBy: '-monthYearReceived',
      yoeCategory: 0,
    },
  ]);

  return (
    <ul>
      {data.data?.map((x) => {
        return <li key={x.id}>{JSON.stringify(x)}</li>;
      })}
    </ul>
  );
}

export default test;
