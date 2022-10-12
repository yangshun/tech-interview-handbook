import React, { useState } from 'react';

import { trpc } from '~/utils/trpc';

function Test() {
  //   F const data = trpc.useQuery([
  //     'offers.profile.',
  //     {
  //       limit: 3,
  //       location: 'Singapore, Singapore',
  //       offset: 0,
  //       yoeCategory: 0,
  //     },
  //   ]);

  const [createdData, setCreatedData] = useState('');
  const [error, setError] = useState("");

  const createMutation = trpc.useMutation(['offers.profile.create'], {
    onError(err: any) {
      alert(err);
    },
    onSuccess(data) {
      setCreatedData(JSON.stringify(data));
    },
  });

  const handleClick = () => {
    createMutation.mutate({
      background: {
        educations: [
          {
            endDate: new Date('2018-09-30T07:58:54.000Z'),
            field: 'Computer Science',
            school: 'National University of Singapore',
            startDate: new Date('2014-09-30T07:58:54.000Z'),
            type: 'Bachelors',
          },
        ],
        experiences: [
          {
            companyId: 'cl95u79f000007im531ysjg79',
            durationInMonths: 24,
            jobType: 'FULLTIME',
            level: 'Junior',
            // "monthlySalary": undefined,
            specialization: 'Front End',
            title: 'Software Engineer',
            totalCompensation: {
              currency: 'SGD',
              value: 104100,
            },
          },
        ],
        specificYoes: [
          {
            domain: 'Front End',
            yoe: 2,
          },
          {
            domain: 'Full Stack',
            yoe: 2,
          },
        ],
        totalYoe: 4,
      },
      offers: [
        {
          // Comments: '',
          companyId: 'cl95u79f000007im531ysjg79',
          job: {
            base: {
              currency: 'SGD',
              value: 84000,
            },
            bonus: {
              currency: 'SGD',
              value: 20000,
            },
            level: 'Junior',
            specialization: 'Front End',
            stocks: {
              currency: 'SGD',
              value: 100,
            },
            title: 'Software Engineer',
            totalCompensation: {
              currency: 'SGD',
              value: 104100,
            },
          },
          jobType: 'FULLTIME',
          location: 'Singapore, Singapore',
          monthYearReceived: new Date('2022-09-30T07:58:54.000Z'),
          negotiationStrategy: 'Leveraged having multiple offers',
        },
        {
          comments: undefined,
          companyId: 'cl95u79f000007im531ysjg79',
          job: {
            base: {
              currency: 'SGD',
              value: 84000,
            },
            bonus: {
              currency: 'SGD',
              value: 20000,
            },
            level: 'Junior',
            specialization: 'Front End',
            stocks: {
              currency: 'SGD',
              value: 100,
            },
            title: 'Software Engineer',
            totalCompensation: {
              currency: 'SGD',
              value: 104100,
            },
          },
          jobType: 'FULLTIME',
          location: 'Singapore, Singapore',
          monthYearReceived: new Date('2022-09-30T07:58:54.000Z'),
          // NegotiationStrategy: 'Leveraged having multiple offers',
        },
      ],
    });
  };

  const profileId = 'cl95u9ju500eo7ipd54kurv8d'; // Remember to change this filed after testing deleting
  const data = trpc.useQuery([
    `offers.profile.listOne`,
    {
      profileId,
      token: 'dccc05133962013ba8b4ee396e51baee1b53a66051732b48fd015129ae1d593e',
    },
  ], {
    onError(err) {
      setError(err.shape?.message || "")
    }
  });

  const deleteMutation = trpc.useMutation(['offers.profile.delete']);

  const handleDelete = (id: string) => {
    deleteMutation.mutate({
      profileId: id,
      token: 'dccc05133962013ba8b4ee396e51baee1b53a66051732b48fd015129ae1d593e',
    });
  };

  return (
    <>
      <div>{createdData}</div>
      <button type="button" onClick={handleClick}>
        Click Me!
      </button>
      <button
        className="text-danger-600"
        type="button"
        onClick={() => {
          handleDelete(profileId);
        }}>
        DELETE THIS PROFILE
      </button>
      <div>{JSON.stringify(data.data)}</div>
      <div>{JSON.stringify(error)}</div>
    </>
  );
}

export default Test;
