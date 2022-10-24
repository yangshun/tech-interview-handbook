import React, { useState } from 'react';

import { trpc } from '~/utils/trpc';

function Test() {
  const [createdData, setCreatedData] = useState('');
  const [error, setError] = useState('');

  const createMutation = trpc.useMutation(['offers.profile.create'], {
    onError(err) {
      alert(err);
    },
    onSuccess(data) {
      setCreatedData(JSON.stringify(data));
    },
  });

  const addToUserProfileMutation = trpc.useMutation(
    ['offers.profile.addToUserProfile'],
    {
      onError(err) {
        alert(err);
      },
      onSuccess(data) {
        setCreatedData(JSON.stringify(data));
      },
    },
  );

  const deleteCommentMutation = trpc.useMutation(['offers.comments.delete'], {
    onError(err) {
      alert(err);
    },
    onSuccess(data) {
      setCreatedData(JSON.stringify(data));
    },
  });

  const handleDeleteComment = () => {
    deleteCommentMutation.mutate({
      id: 'cl97fprun001j7iyg6ev9x983',
      profileId: 'cl96stky5002ew32gx2kale2x',
      token: '24bafa6fef803f447d7f2e229b14cb8ee43f0c22dffbe41ee1c1e5e6e870f117',
      userId: 'cl97dl51k001e7iygd5v5gt58',
    });
  };

  const updateCommentMutation = trpc.useMutation(['offers.comments.update'], {
    onError(err) {
      alert(err);
    },
    onSuccess(data) {
      setCreatedData(JSON.stringify(data));
    },
  });

  const handleUpdateComment = () => {
    updateCommentMutation.mutate({
      id: 'cl97fxb0y001l7iyg14sdobt2',
      message: 'hello hello',
      profileId: 'cl96stky5002ew32gx2kale2x',
      token: 'afca11e436d21bde24543718fa957c6c625335439dc504f24ee35eae7b5ef1ba',
    });
  };

  const createCommentMutation = trpc.useMutation(['offers.comments.create'], {
    onError(err) {
      alert(err);
    },
    onSuccess(data) {
      setCreatedData(JSON.stringify(data));
    },
  });

  const handleCreate = () => {
    createCommentMutation.mutate({
      message: 'wassup bro',
      profileId: 'cl9efyn9p004ww3u42mjgl1vn',
      replyingToId: 'cl9el4xj10001w3w21o3p2iny',
      userId: 'cl9ehvpng0000w3ec2mpx0bdd',
    });
  };

  const handleLink = () => {
    addToUserProfileMutation.mutate({
      profileId: 'cl9efyn9p004ww3u42mjgl1vn',
      token: '24bafa6fef803f447d7f2e229b14cb8ee43f0c22dffbe41ee1c1e5e6e870f117',
      userId: 'cl9ehvpng0000w3ec2mpx0bdd',
    });
  };

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
            companyId: 'cl9j4yawz0003utlp1uaa1t8o',
            durationInMonths: 24,
            jobType: 'FULLTIME',
            level: 'Junior',
            title: 'software-engineer',
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
          comments: 'I am a Raffles Institution almumni',
          // Comments: '',
          companyId: 'cl9j4yawz0003utlp1uaa1t8o',
          jobType: 'FULLTIME',
          location: 'Singapore, Singapore',
          monthYearReceived: new Date('2022-09-30T07:58:54.000Z'),
          negotiationStrategy: 'Leveraged having multiple offers',
          offersFullTime: {
            baseSalary: {
              currency: 'SGD',
              value: 2222,
            },
            bonus: {
              currency: 'SGD',
              value: 2222,
            },
            level: 'Junior',
            stocks: {
              currency: 'SGD',
              value: 0,
            },
            title: 'software-engineer',
            totalCompensation: {
              currency: 'SGD',
              value: 4444,
            },
          },
        },
        {
          comments: '',
          companyId: 'cl9j4yawz0003utlp1uaa1t8o',
          jobType: 'FULLTIME',
          location: 'Singapore, Singapore',
          monthYearReceived: new Date('2022-09-30T07:58:54.000Z'),
          negotiationStrategy: 'Leveraged having multiple offers',
          offersFullTime: {
            baseSalary: {
              currency: 'SGD',
              value: 84000,
            },
            bonus: {
              currency: 'SGD',
              value: 20000,
            },
            level: 'Junior',
            stocks: {
              currency: 'SGD',
              value: 100,
            },
            title: 'software-engineer',
            totalCompensation: {
              currency: 'SGD',
              value: 104100,
            },
          },
        },
      ],
    });
  };

  const profileId = 'cl9j50xzk008vutfqg6mta2ey'; // Remember to change this filed after testing deleting
  const data = trpc.useQuery(
    [
      `offers.profile.listOne`,
      {
        profileId,
        token:
          '24bafa6fef803f447d7f2e229b14cb8ee43f0c22dffbe41ee1c1e5e6e870f117',
      },
    ],
    {
      onError(err) {
        setError(err.shape?.message || '');
      },
    },
  );

  const replies = trpc.useQuery(
    ['offers.comments.getComments', { profileId }],
    {
      onError(err) {
        setError(err.shape?.message || '');
      },
    },
  );

  const deleteMutation = trpc.useMutation(['offers.profile.delete']);

  const handleDelete = (id: string) => {
    deleteMutation.mutate({
      profileId: id,
      token: '24bafa6fef803f447d7f2e229b14cb8ee43f0c22dffbe41ee1c1e5e6e870f117',
    });
  };

  const updateMutation = trpc.useMutation(['offers.profile.update'], {
    onError(err) {
      alert(err);
    },
    onSuccess(response) {
      setCreatedData(JSON.stringify(response));
    },
  });

  const handleUpdate = () => {
    updateMutation.mutate({
      background: {
        educations: [
          {
            backgroundId: 'cl9i68fv60001tthj23g9tuv4',
            endDate: new Date('2018-09-30T07:58:54.000Z'),
            field: 'Computer Science',
            id: 'cl9i87y7z004otthjmpsd48wo',
            school: 'National University of Singapore',
            startDate: new Date('2014-09-30T07:58:54.000Z'),
            type: 'Bachelors',
          },
        ],
        experiences: [
          {
            backgroundId: 'cl9i68fv60001tthj23g9tuv4',
            company: {
              createdAt: new Date('2022-10-12T16:19:05.196Z'),
              description:
                'Meta Platforms, Inc., doing business as Meta and formerly named Facebook, Inc., and TheFacebook, Inc., is an American multinational technology conglomerate based in Menlo Park, California. The company owns Facebook, Instagram, and WhatsApp, among other products and services.',
              id: 'cl9j4yawz0003utlp1uaa1t8o',
              logoUrl: 'https://logo.clearbit.com/meta.com',
              name: 'Meta',
              slug: 'meta',
              updatedAt: new Date('2022-10-12T16:19:05.196Z'),
            },
            companyId: 'cl9j4yawz0003utlp1uaa1t8o',
            durationInMonths: 24,
            // Id: 'cl9j4yawz0003utlp1uaa1t8o',
            jobType: 'FULLTIME',
            level: 'Junior',
            monthlySalary: null,
            monthlySalaryId: null,
            title: 'software-engineer',
            totalCompensation: {
              currency: 'SGD',
              id: 'cl9i68fvc0005tthj7r1rhvb1',
              value: 100,
            },
            totalCompensationId: 'cl9i68fvc0005tthj7r1rhvb1',
          },
        ],
        id: 'cl9i68fv60001tthj23g9tuv4',
        offersProfileId: 'cl9i68fv60000tthj8t3zkox0',
        specificYoes: [
          {
            backgroundId: 'cl9i68fv60001tthj23g9tuv4',
            domain: 'Backend',
            id: 'cl9i68fvc0008tthjlxslzfo4',
            yoe: 5,
          },
          {
            backgroundId: 'cl9i68fv60001tthj23g9tuv4',
            domain: 'Backend',
            id: 'cl9i68fvc0009tthjwol3285l',
            yoe: 4,
          },
        ],
        totalYoe: 1,
      },
      createdAt: '2022-10-13T08:28:13.518Z',
      // Discussion: [],
      id: 'cl9i68fv60000tthj8t3zkox0',
      isEditable: true,
      offers: [
        {
          comments: 'this IS SO IEUHDAEUIGDI',
          company: {
            createdAt: new Date('2022-10-12T16:19:05.196Z'),
            description:
              'Meta Platforms, Inc., doing business as Meta and formerly named Facebook, Inc., and TheFacebook, Inc., is an American multinational technology conglomerate based in Menlo Park, California. The company owns Facebook, Instagram, and WhatsApp, among other products and services.',
            id: 'cl9j4yawz0003utlp1uaa1t8o',
            logoUrl: 'https://logo.clearbit.com/meta.com',
            name: 'Meta',
            slug: 'meta',
            updatedAt: new Date('2022-10-12T16:19:05.196Z'),
          },
          companyId: 'cl9j4yawz0003utlp1uaa1t8o',
          id: 'cl9i68fve000ntthj5h9yvqnh',
          jobType: 'FULLTIME',
          location: 'Singapore, Singapore',
          monthYearReceived: new Date('2022-09-30T07:58:54.000Z'),
          negotiationStrategy: 'Charmed the guy with my face',
          offersFullTime: {
            baseSalary: {
              currency: 'SGD',
              id: 'cl9i68fve000ptthjn55hpoe4',
              value: 1999999999,
            },
            baseSalaryId: 'cl9i68fve000ptthjn55hpoe4',
            bonus: {
              currency: 'SGD',
              id: 'cl9i68fve000rtthjqo2ktljt',
              value: 1410065407,
            },
            bonusId: 'cl9i68fve000rtthjqo2ktljt',
            id: 'cl9i68fve000otthjqk0g01k0',
            level: 'EXPERT',
            stocks: {
              currency: 'SGD',
              id: 'cl9i68fvf000ttthjt2ode0cc',
              value: -558038585,
            },
            stocksId: 'cl9i68fvf000ttthjt2ode0cc',
            title: 'software-engineer',
            totalCompensation: {
              currency: 'SGD',
              id: 'cl9i68fvf000vtthjg90s48nj',
              value: 55555555,
            },
            totalCompensationId: 'cl9i68fvf000vtthjg90s48nj',
          },
          offersFullTimeId: 'cl9i68fve000otthjqk0g01k0',
          offersIntern: null,
          offersInternId: null,
          profileId: 'cl9i68fv60000tthj8t3zkox0',
        },
      ],

      token: '24bafa6fef803f447d7f2e229b14cb8ee43f0c22dffbe41ee1c1e5e6e870f117',
      userId: null,
    });
  };

  return (
    <>
      <div>{createdData}</div>
      <div>{JSON.stringify(replies.data?.data)}</div>
      <button type="button" onClick={handleClick}>
        Click Me!
      </button>
      <button type="button" onClick={handleUpdate}>
        UPDATE!
      </button>
      <button type="button" onClick={handleLink}>
        LINKKKK!
      </button>
      <button type="button" onClick={handleCreate}>
        CREATE COMMENT!
      </button>
      <button type="button" onClick={handleDeleteComment}>
        DELETE COMMENT!
      </button>
      <button type="button" onClick={handleUpdateComment}>
        UPDATE COMMENT!
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
