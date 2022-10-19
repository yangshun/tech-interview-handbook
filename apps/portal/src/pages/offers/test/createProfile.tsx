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
      token: 'afca11e436d21bde24543718fa957c6c625335439dc504f24ee35eae7b5ef1',
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
      userId: 'cl9ehvpng0000w3ec2mpx0bdd'
    });
  };

  const handleLink = () => {
    addToUserProfileMutation.mutate({
      profileId: 'cl9efyn9p004ww3u42mjgl1vn',
      token: 'afca11e436d21bde24543718fa957c6c625335439dc504f24ee35eae7b5ef1ba',
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
            companyId: 'cl9ec1mgg0000w33hg1a3612r',
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
          comments: 'I am a Raffles Institution almumni',
          // Comments: '',
          companyId: 'cl98yuqk80007txhgjtjp8fk4',
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
        },
        {
          comments: '',
          companyId: 'cl98yuqk80007txhgjtjp8fk4',
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
        },
      ],
    });
  };

  const profileId = 'cl9efyn9p004ww3u42mjgl1vn'; // Remember to change this filed after testing deleting
  const data = trpc.useQuery(
    [
      `offers.profile.listOne`,
      {
        profileId,
        token:
          'd14666ff76e267c9e99445844b41410e83874936d0c07e664db73ff0ea76919e',
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

  // Console.log(replies.data?.data)
  const deleteMutation = trpc.useMutation(['offers.profile.delete']);

  const handleDelete = (id: string) => {
    deleteMutation.mutate({
      profileId: id,
      token: 'e7effd2a40adba2deb1ddea4fb9f1e6c3c98ab0a85a88ed1567fc2a107fdb445',
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
            backgroundId: 'cl96stky6002fw32g6vj4meyr',
            endDate: new Date('2018-09-30T07:58:54.000Z'),
            field: 'Computer Science',
            id: 'cl96stky6002gw32gey2ffawd',
            school: 'National University of Singapore',
            startDate: new Date('2014-09-30T07:58:54.000Z'),
            type: 'Bachelors',
          },
        ],
        experiences: [
          {
            backgroundId: 'cl96stky6002fw32g6vj4meyr',
            company: {
              createdAt: new Date('2022-10-12T16:19:05.196Z'),
              description:
                'Meta Platforms, Inc., doing business as Meta and formerly named Facebook, Inc., and TheFacebook, Inc., is an American multinational technology conglomerate based in Menlo Park, California. The company owns Facebook, Instagram, and WhatsApp, among other products and services.',
              id: 'cl95u79f000007im531ysjg79',
              logoUrl: 'https://logo.clearbit.com/meta.com',
              name: 'Meta',
              slug: 'meta',
              updatedAt: new Date('2022-10-12T16:19:05.196Z'),
            },
            companyId: 'cl9ec1mgg0000w33hg1a3612r',
            durationInMonths: 24,
            id: 'cl96stky6002iw32gpt6t87s2',
            jobType: 'FULLTIME',
            level: 'Junior',
            monthlySalary: null,
            monthlySalaryId: null,
            specialization: 'Front End',
            title: 'Software Engineer',
            totalCompensation: {
              currency: 'SGD',
              id: 'cl96stky6002jw32g73svfacr',
              value: 104100,
            },
            totalCompensationId: 'cl96stky6002jw32g73svfacr',
          },
        ],
        id: 'cl96stky6002fw32g6vj4meyr',
        offersProfileId: 'cl96stky5002ew32gx2kale2x',
        specificYoes: [
          {
            backgroundId: 'cl96stky6002fw32g6vj4meyr',
            domain: 'Backend',
            id: 'cl96t7890004tw32g5in3px5j',
            yoe: 2,
          },
          {
            backgroundId: 'cl96stky6002fw32g6vj4meyr',
            domain: 'Backend',
            id: 'cl96tb87x004xw32gnu17jbzv',
            yoe: 2,
          },
          {
            backgroundId: 'cl96stky6002fw32g6vj4meyr',
            domain: 'Backend',
            id: 'cl976t39z00007iygt3np3cgo',
            yoe: 2,
          },
          {
            backgroundId: 'cl96stky6002fw32g6vj4meyr',
            domain: 'Front End',
            id: 'cl96stky7002mw32gn4jc7uml',
            yoe: 2,
          },
          {
            backgroundId: 'cl96stky6002fw32g6vj4meyr',
            domain: 'Full Stack',
            id: 'cl96stky7002nw32gpprghtxr',
            yoe: 2,
          },
          {
            backgroundId: 'cl96stky6002fw32g6vj4meyr',
            domain: 'Backend',
            id: 'cl976we5h000p7iygiomdo9fh',
            yoe: 2,
          },
        ],
        totalYoe: 6,
      },
      createdAt: '2022-10-13T08:28:13.518Z',
      discussion: [],
      id: 'cl96stky5002ew32gx2kale2x',
      isEditable: true,
      offers: [
        {
          comments: 'this IS SO IEUHDAEUIGDI',
          company: {
            createdAt: new Date('2022-10-12T16:19:05.196Z'),
            description:
              'Meta Platforms, Inc., doing business as Meta and formerly named Facebook, Inc., and TheFacebook, Inc., is an American multinational technology conglomerate based in Menlo Park, California. The company owns Facebook, Instagram, and WhatsApp, among other products and services.',
            id: 'cl95u79f000007im531ysjg79',
            logoUrl: 'https://logo.clearbit.com/meta.com',
            name: 'Meta',
            slug: 'meta',
            updatedAt: new Date('2022-10-12T16:19:05.196Z'),
          },
          companyId: 'cl9ec1mgg0000w33hg1a3612r',
          id: 'cl976t4de00047iygl0zbce11',
          jobType: 'FULLTIME',
          location: 'Singapore, Singapore',
          monthYearReceived: new Date('2022-09-30T07:58:54.000Z'),
          negotiationStrategy: 'Charmed the guy with my face',
          offersFullTime: {
            baseSalary: {
              currency: 'SGD',
              id: 'cl976t4de00067iyg3pjir7k9',
              value: 1999999999,
            },
            baseSalaryId: 'cl976t4de00067iyg3pjir7k9',
            bonus: {
              currency: 'SGD',
              id: 'cl976t4de00087iygcnlmh8aw',
              value: 1410065407,
            },
            bonusId: 'cl976t4de00087iygcnlmh8aw',
            id: 'cl976t4de00057iygq3ktce3v',
            level: 'EXPERT',
            specialization: 'FRONTEND',
            stocks: {
              currency: 'SGD',
              id: 'cl976t4df000a7iygkrsgr1xh',
              value: -558038585,
            },
            stocksId: 'cl976t4df000a7iygkrsgr1xh',
            title: 'Software Engineer',
            totalCompensation: {
              currency: 'SGD',
              id: 'cl976t4df000c7iyg73ryf5uw',
              value: 55555555,
            },
            totalCompensationId: 'cl976t4df000c7iyg73ryf5uw',
          },
          offersFullTimeId: 'cl976t4de00057iygq3ktce3v',
          offersIntern: null,
          offersInternId: null,
          profileId: 'cl96stky5002ew32gx2kale2x',
        },
        {
          comments: '',
          company: {
            createdAt: new Date('2022-10-12T16:19:05.196Z'),
            description:
              'Meta Platforms, Inc., doing business as Meta and formerly named Facebook, Inc., and TheFacebook, Inc., is an American multinational technology conglomerate based in Menlo Park, California. The company owns Facebook, Instagram, and WhatsApp, among other products and services.',
            id: 'cl95u79f000007im531ysjg79',
            logoUrl: 'https://logo.clearbit.com/meta.com',
            name: 'Meta',
            slug: 'meta',
            updatedAt: new Date('2022-10-12T16:19:05.196Z'),
          },
          companyId: 'cl9ec1mgg0000w33hg1a3612r',
          id: 'cl96stky80031w32gau9mu1gs',
          jobType: 'FULLTIME',
          location: 'Singapore, Singapore',
          monthYearReceived: new Date('2022-09-30T07:58:54.000Z'),
          negotiationStrategy: 'Leveraged having million offers',
          offersFullTime: {
            baseSalary: {
              currency: 'SGD',
              id: 'cl96stky80033w32gxw5goc4z',
              value: 84000,
            },
            baseSalaryId: 'cl96stky80033w32gxw5goc4z',
            bonus: {
              currency: 'SGD',
              id: 'cl96stky80035w32gajjwdo1p',
              value: 123456789,
            },
            bonusId: 'cl96stky80035w32gajjwdo1p',
            id: 'cl96stky80032w32gep9ovgj3',
            level: 'Junior',
            specialization: 'Front End',
            stocks: {
              currency: 'SGD',
              id: 'cl96stky90037w32gu04t6ybh',
              value: 100,
            },
            stocksId: 'cl96stky90037w32gu04t6ybh',
            title: 'Software Engineer',
            totalCompensation: {
              currency: 'SGD',
              id: 'cl96stky90039w32glbpktd0o',
              value: 104100,
            },
            totalCompensationId: 'cl96stky90039w32glbpktd0o',
          },
          offersFullTimeId: 'cl96stky80032w32gep9ovgj3',
          offersIntern: null,
          offersInternId: null,
          profileId: 'cl96stky5002ew32gx2kale2x',
        },
        {
          comments: '',
          company: {
            createdAt: new Date('2022-10-12T16:19:05.196Z'),
            description:
              'Meta Platforms, Inc., doing business as Meta and formerly named Facebook, Inc., and TheFacebook, Inc., is an American multinational technology conglomerate based in Menlo Park, California. The company owns Facebook, Instagram, and WhatsApp, among other products and services.',
            id: 'cl95u79f000007im531ysjg79',
            logoUrl: 'https://logo.clearbit.com/meta.com',
            name: 'Meta',
            slug: 'meta',
            updatedAt: new Date('2022-10-12T16:19:05.196Z'),
          },
          companyId: 'cl9ec1mgg0000w33hg1a3612r',
          id: 'cl96stky9003bw32gc3l955vr',
          jobType: 'FULLTIME',
          location: 'Singapore, Singapore',
          monthYearReceived: new Date('2022-09-30T07:58:54.000Z'),
          negotiationStrategy: 'LOst out having multiple offers',
          offersFullTime: {
            baseSalary: {
              currency: 'SGD',
              id: 'cl96stky9003dw32gcvqbijlo',
              value: 1,
            },
            baseSalaryId: 'cl96stky9003dw32gcvqbijlo',
            bonus: {
              currency: 'SGD',
              id: 'cl96stky9003fw32goc3zqxwr',
              value: 0,
            },
            bonusId: 'cl96stky9003fw32goc3zqxwr',
            id: 'cl96stky9003cw32g5v10izfu',
            level: 'Senior',
            specialization: 'Front End',
            stocks: {
              currency: 'SGD',
              id: 'cl96stky9003hw32g1lbbkqqr',
              value: 999999,
            },
            stocksId: 'cl96stky9003hw32g1lbbkqqr',
            title: 'Software Engineer DOG',
            totalCompensation: {
              currency: 'SGD',
              id: 'cl96stky9003jw32gzumcoi7v',
              value: 999999,
            },
            totalCompensationId: 'cl96stky9003jw32gzumcoi7v',
          },
          offersFullTimeId: 'cl96stky9003cw32g5v10izfu',
          offersIntern: null,
          offersInternId: null,
          profileId: 'cl96stky5002ew32gx2kale2x',
        },
        {
          comments: 'this IS SO COOL',
          company: {
            createdAt: new Date('2022-10-12T16:19:05.196Z'),
            description:
              'Meta Platforms, Inc., doing business as Meta and formerly named Facebook, Inc., and TheFacebook, Inc., is an American multinational technology conglomerate based in Menlo Park, California. The company owns Facebook, Instagram, and WhatsApp, among other products and services.',
            id: 'cl95u79f000007im531ysjg79',
            logoUrl: 'https://logo.clearbit.com/meta.com',
            name: 'Meta',
            slug: 'meta',
            updatedAt: new Date('2022-10-12T16:19:05.196Z'),
          },
          companyId: 'cl9ec1mgg0000w33hg1a3612r',
          id: 'cl976wf28000t7iyga4noyz7s',
          jobType: 'FULLTIME',
          location: 'Singapore, Singapore',
          monthYearReceived: new Date('2022-09-30T07:58:54.000Z'),
          negotiationStrategy: 'Charmed the guy with my face',
          offersFullTime: {
            baseSalary: {
              currency: 'SGD',
              id: 'cl976wf28000v7iygmk1b7qaq',
              value: 1999999999,
            },
            baseSalaryId: 'cl976wf28000v7iygmk1b7qaq',
            bonus: {
              currency: 'SGD',
              id: 'cl976wf28000x7iyg63w7kcli',
              value: 1410065407,
            },
            bonusId: 'cl976wf28000x7iyg63w7kcli',
            id: 'cl976wf28000u7iyg6euei8e9',
            level: 'EXPERT',
            specialization: 'FRONTEND',
            stocks: {
              currency: 'SGD',
              id: 'cl976wf28000z7iyg9ivun6ap',
              value: 111222333,
            },
            stocksId: 'cl976wf28000z7iyg9ivun6ap',
            title: 'Software Engineer',
            totalCompensation: {
              currency: 'SGD',
              id: 'cl976wf2800117iygmzsc0xit',
              value: 55555555,
            },
            totalCompensationId: 'cl976wf2800117iygmzsc0xit',
          },
          offersFullTimeId: 'cl976wf28000u7iyg6euei8e9',
          offersIntern: null,
          offersInternId: null,
          profileId: 'cl96stky5002ew32gx2kale2x',
        },
        {
          comments: 'this rocks',
          company: {
            createdAt: new Date('2022-10-12T16:19:05.196Z'),
            description:
              'Meta Platforms, Inc., doing business as Meta and formerly named Facebook, Inc., and TheFacebook, Inc., is an American multinational technology conglomerate based in Menlo Park, California. The company owns Facebook, Instagram, and WhatsApp, among other products and services.',
            id: 'cl95u79f000007im531ysjg79',
            logoUrl: 'https://logo.clearbit.com/meta.com',
            name: 'Meta',
            slug: 'meta',
            updatedAt: new Date('2022-10-12T16:19:05.196Z'),
          },
          companyId: 'cl9ec1mgg0000w33hg1a3612r',
          id: 'cl96tbb3o0051w32gjrpaiiit',
          jobType: 'FULLTIME',
          location: 'Singapore, Singapore',
          monthYearReceived: new Date('2022-09-30T07:58:54.000Z'),
          negotiationStrategy: 'Charmed the guy with my face',
          offersFullTime: {
            baseSalary: {
              currency: 'SGD',
              id: 'cl96tbb3o0053w32gz11paaxu',
              value: 1999999999,
            },
            baseSalaryId: 'cl96tbb3o0053w32gz11paaxu',
            bonus: {
              currency: 'SGD',
              id: 'cl96tbb3o0055w32gpyqgz5hx',
              value: 1410065407,
            },
            bonusId: 'cl96tbb3o0055w32gpyqgz5hx',
            id: 'cl96tbb3o0052w32guguajzin',
            level: 'EXPERT',
            specialization: 'FRONTEND',
            stocks: {
              currency: 'SGD',
              id: 'cl96tbb3o0057w32gu4nyxguf',
              value: 500,
            },
            stocksId: 'cl96tbb3o0057w32gu4nyxguf',
            title: 'Software Engineer',
            totalCompensation: {
              currency: 'SGD',
              id: 'cl96tbb3o0059w32gm3iy1zk4',
              value: 55555555,
            },
            totalCompensationId: 'cl96tbb3o0059w32gm3iy1zk4',
          },
          offersFullTimeId: 'cl96tbb3o0052w32guguajzin',
          offersIntern: null,
          offersInternId: null,
          profileId: 'cl96stky5002ew32gx2kale2x',
        },
      ],
      profileName: 'ailing bryann stuart ziqing',
      token: 'afca11e436d21bde24543718fa957c6c625335439dc504f24ee35eae7b5ef1ba',
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
