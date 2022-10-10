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

  return (
    <>
      <ul>
        {data.data?.data.map((x) => {
          return <li key={x.id}>{JSON.stringify(x)}</li>;
        })}
      </ul>
      <br />
      <p>{JSON.stringify(data.data?.paging)}</p>
    </>
  );
}

export default Test;
