import React from 'react';

import { trpc } from '~/utils/trpc';

function Test() {
  const data = trpc.useQuery([
    'offers.list',
    {
      limit: 100,
      location: 'Singapore, Singapore',
      offset: 0,
      sortBy: '-monthYearReceived',
      yoeCategory: 0,
    },
  ]);

  const deleteMutation = trpc.useMutation(['offers.profile.delete']);

  const handleDelete = (id: string) => {
    deleteMutation.mutate({ profileId: id, token: ' dadaadad' });
  };

  return (
    <ul>
      <li>
        <b>{JSON.stringify(data.data?.paging)}</b>
      </li>
      <li>
        <ul>
          {data.data?.data.map((offer) => {
            return (
              <li key={offer.id}>
                <button
                  className="text-danger-600"
                  type="button"
                  onClick={() => {
                    handleDelete(offer.profileId);
                  }}>
                  DELETE THIS PROFILE AND ALL ITS OFFERS
                </button>
                <div>{JSON.stringify(offer)}</div>
                <br />
              </li>
            );
          })}
        </ul>
      </li>
    </ul>
  );
}

export default Test;
