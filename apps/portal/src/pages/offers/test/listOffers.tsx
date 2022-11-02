import React from 'react';
import { useState } from 'react';

import { trpc } from '~/utils/trpc';

function Test() {
  const [cities, setCities] = useState<
    Array<{
      id: string;
      name: string;
      state: {
        country: {
          id: string;
          name: string;
        };
        id: string;
        name: string;
      };
    }>
  >([]);
  trpc.useQuery(['locations.cities.list', { name: 'Singapore' }], {
    onError(err) {
      alert(err);
    },
    onSuccess(data) {
      setCities(data);
    },
  });

  const data = trpc.useQuery([
    'offers.list',
    {
      cityId: cities[0].id,
      currency: 'SGD',
      limit: 100,
      offset: 0,
      sortBy: '-totalCompensation',
      yoeCategory: 2,
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
