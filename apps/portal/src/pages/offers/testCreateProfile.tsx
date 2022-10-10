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

    const [createdData, setCreatedData] = useState("")

    const createMutation = trpc.useMutation(['offers.profile.create'], {
        onError(error: any) {
            alert(error)
        },
        onSuccess(data) {
            setCreatedData(JSON.stringify(data))
        },
    });

    const handleClick = () => {
        createMutation.mutate({
"background": {
    "educations": [
      {
        "endDate": new Date("2018-09-30T07:58:54.000Z"),
        "field": "Computer Science",
        "school": "National University of Singapore",
        "startDate": new Date("2014-09-30T07:58:54.000Z"),
        "type": "Bachelors"
      }
    ],
    "experiences": [
      {
        "companyId": "cl92ly8xm0000w3mwh5ymyqmx",
        "durationInMonths": 24,
        "jobType": "FULLTIME",
        "level": "Junior",
        // "monthlySalary": undefined,
        "specialization": "Front End",
        "title": "Software Engineer",
        "totalCompensation": {
          "currency": "SGD",
          "value": 104100
        }
      }
    ],
    "specificYoes": [
      {
        "domain": "Front End",
        "yoe": 2
      },
      {
        "domain": "Full Stack",
        "yoe": 2
      }
    ],
    "totalYoe": 4
  },
  "offers": [
    {
      "comments": "",
      "companyId": "cl92ly8xm0000w3mwh5ymyqmx",
      "job": {
        "base": {
          "currency": "SGD",
          "value": 84000
        },
        "bonus": {
          "currency": "SGD",
          "value": 20000
        },
        "level": "Junior",
        "specialization": "Front End",
        "stocks": {
          "currency": "SGD",
          "value": 100
        },
        "title": "Software Engineer",
        "totalCompensation": {
          "currency": "SGD",
          "value": 104100
        }
      },
      "jobType": "FULLTIME",
      "location": "Singapore, Singapore",
      "monthYearReceived": new Date("2022-09-30T07:58:54.000Z"),
      "negotiationStrategy": "Leveraged having multiple offers"
    },
    {
      "comments": "",
      "companyId": "cl92ly8xm0000w3mwh5ymyqmx",
      "job": {
        "base": {
          "currency": "SGD",
          "value": 84000
        },
        "bonus": {
          "currency": "SGD",
          "value": 20000
        },
        "level": "Junior",
        "specialization": "Front End",
        "stocks": {
          "currency": "SGD",
          "value": 100
        },
        "title": "Software Engineer",
        "totalCompensation": {
          "currency": "SGD",
          "value": 104100
        }
      },
      "jobType": "FULLTIME",
      "location": "Singapore, Singapore",
      "monthYearReceived": new Date("2022-09-30T07:58:54.000Z"),
      "negotiationStrategy": "Leveraged having multiple offers"
    }
  ]
        });
    };

  return (
    // <ul>
    //   {createdData.map((x) => {
    //     return <li key={x.id}>{JSON.stringify(x)}</li>;
    //   })}
    // </ul>
      <>
      <div>
          {createdData}
      </div>
          <button type="button" onClick={handleClick}>Click me</button>
          </>
  );
}

export default Test;
