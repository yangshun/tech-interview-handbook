import reader from 'xlsx';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { baseCurrencyString } from '../src/utils/offers/currency';
import { convert } from '../src/utils/offers/currency/currencyExchange';

import {
  generateRandomName,
  generateRandomStringForToken,
} from '../src/utils/offers/randomGenerator';

const prisma = new PrismaClient();

// Reading our test file
const file = reader.readFile('prisma/salaries.xlsx');

let data: Array<ExcelData> = [];

type ExcelData = {
  Timestamp: Date;
  Type: string;
  Company: string;
  Role: string;
  Income?: number | string;
  Stocks?: number | string;
  SignOn?: number | string;
  TC?: number | string;
  Bonus?: number | string;
  Comments?: string;
};

const sheets = file.SheetNames;

for (let i = 0; i < 1; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res: ExcelData) => {
    data.push(res);
  });
}

function xlSerialToJsDate(xlSerial) {
  return new Date(Date.UTC(0, 0, xlSerial - 1));
}

const getJobTitle = (role: string) => {
  const processedRole = role.toUpperCase().trim();

  if (processedRole.includes('ML ENGINEER')) {
    return 'machine-learning-engineer';
  } else if (processedRole.includes('BACKEND')) {
    return 'back-end-engineer';
  } else if (processedRole.includes('DATA')) {
    return 'data-engineer';
  } else if (processedRole.includes('DEVOPS')) {
    return 'devops-engineer';
  } else if (processedRole.includes('ENTERPRISE')) {
    return 'enterprise-engineer';
  } else if (processedRole.includes('RESEARCH')) {
    return 'research-engineer';
  } else if (
    processedRole.includes('CYBER') ||
    processedRole.includes('SECURITY')
  ) {
    return 'security-engineer';
  } else if (processedRole.includes('QA')) {
    return 'test-engineer';
  } else if (processedRole.includes('SYSTEM')) {
    return 'systems-engineer';
  } else {
    return 'software-engineer'; // Assume default SWE
  }
};

const getYoe = (type: string) => {
  const processedType = type.toUpperCase().trim();

  if (
    processedType.includes('FRESH GRAD') ||
    processedType.includes('JUNIOR')
  ) {
    return Math.floor(Math.random() * 3);
  } else if (processedType.includes('MID')) {
    return Math.floor(Math.random() * 3) + 3;
  } else if (processedType.includes('SENIOR')) {
    return Math.floor(Math.random() * 5) + 6;
  } else {
    return 0; // INTERNSHIP OR ERROR -> 0 YOE
  }
};

const getLevel = (type: string) => {
  const processedType = type.toUpperCase().trim();

  if (
    processedType.includes('FRESH GRAD') ||
    processedType.includes('JUNIOR')
  ) {
    return 'Junior';
  } else if (processedType.includes('MID')) {
    return 'Mid';
  } else if (processedType.includes('SENIOR')) {
    return 'Senior';
  } else {
    return 'N/A';
  }
};

const createdProfileIds: Array<string> = [];

const seedSalaries = async () => {
  console.log('Seeding from salaries sheet...');

  const companyIdMappings = {};
  (await prisma.company.findMany()).forEach((company) => {
    companyIdMappings[company.slug] = company.id;
  });

  // get countryId of Singapore
  const singapore = await prisma.city.findFirst({
    where: {
      name: 'Singapore',
    },
  });

  console.log('Singapore ID: ' + singapore?.id);
  // break;
  // seed here

  if (singapore) {
    return await Promise.all(
      data.map(async (data: ExcelData) => {
        if (data.TC && typeof data.TC === 'number') {
          // Generate random name until unique
          let uniqueName: string = await generateRandomName();

          const jobTitle = getJobTitle(data.Role);
          const yoe = getYoe(data.Type);
          const level = getLevel(data.Type);

          // check if we have company id
          if (companyIdMappings[data.Company]) {
            const token = crypto
              .createHash('sha256')
              .update(
                xlSerialToJsDate(data.Timestamp).toString() +
                  generateRandomStringForToken(),
              )
              .digest('hex');

            if (data.Type.toUpperCase() === 'INTERNSHIP') {
              // create profile
              const dataAdded = await prisma.offersProfile.create({
                data: {
                  profileName: uniqueName,
                  createdAt: xlSerialToJsDate(data.Timestamp),
                  editToken: token,
                  background: {
                    create: {
                      totalYoe: yoe,
                    },
                  },
                  offers: {
                    create: {
                      comments: data.Comments ?? '',
                      company: {
                        connect: {
                          id: companyIdMappings[data.Company],
                        },
                      },
                      jobType: 'INTERN',
                      location: {
                        connect: {
                          id: singapore.id,
                        },
                      }, // TODO: DEFAULT AS SG
                      monthYearReceived: xlSerialToJsDate(data.Timestamp),
                      negotiationStrategy: '',
                      offersIntern: {
                        create: {
                          internshipCycle: 'summer',
                          monthlySalary: {
                            create: {
                              baseCurrency: baseCurrencyString,
                              baseValue: await convert(
                                data.Income
                                  ? typeof data.Income === 'number'
                                    ? data.Income
                                    : 0
                                  : 0,
                                'SGD', // assume sgd
                                baseCurrencyString,
                              ),
                              currency: 'SGD', // assume sgd
                              value: data.Income
                                ? typeof data.Income === 'number'
                                  ? data.Income
                                  : 0
                                : 0,
                            },
                          },
                          startYear: xlSerialToJsDate(
                            data.Timestamp,
                          ).getFullYear(),
                          title: jobTitle,
                        },
                      },
                    },
                  },
                },
              });

              console.log('Profile created:', dataAdded.id);
              createdProfileIds.push(dataAdded.id);
            } else {
              // assume rest full time
              const dataAdded = await prisma.offersProfile.create({
                data: {
                  profileName: uniqueName,
                  createdAt: xlSerialToJsDate(data.Timestamp),
                  editToken: token,
                  background: {
                    create: {
                      totalYoe: yoe,
                    },
                  },
                  offers: {
                    create: {
                      comments: data.Comments ?? '',
                      company: {
                        connect: {
                          id: companyIdMappings[data.Company],
                        },
                      },
                      jobType: 'FULLTIME',
                      location: {
                        connect: {
                          id: singapore.id,
                        },
                      }, // TODO: DEFAULT AS SG
                      monthYearReceived: xlSerialToJsDate(data.Timestamp),
                      negotiationStrategy: '',
                      offersFullTime: {
                        create: {
                          baseSalary: {
                            create: {
                              baseCurrency: baseCurrencyString,
                              baseValue: await convert(
                                data.Income
                                  ? typeof data.Income === 'number'
                                    ? data.Income
                                    : 0
                                  : 0,
                                'SGD', // assume sgd
                                baseCurrencyString,
                              ),
                              currency: 'SGD', // assume sgd
                              value: data.Income
                                ? typeof data.Income === 'number'
                                  ? data.Income
                                  : 0
                                : 0,
                            },
                          },
                          bonus: {
                            create: {
                              baseCurrency: baseCurrencyString,
                              baseValue: await convert(
                                data.Bonus
                                  ? typeof data.Bonus === 'number'
                                    ? data.Bonus
                                    : 0
                                  : 0,
                                'SGD',
                                baseCurrencyString,
                              ),
                              currency: 'SGD',
                              value: data.Bonus
                                ? typeof data.Bonus === 'number'
                                  ? data.Bonus
                                  : 0
                                : 0,
                            },
                          },
                          level: level,
                          stocks: {
                            create: {
                              baseCurrency: baseCurrencyString,
                              baseValue: await convert(
                                data.Stocks
                                  ? typeof data.Stocks === 'number'
                                    ? data.Stocks
                                    : 0
                                  : 0,
                                'SGD',
                                baseCurrencyString,
                              ),
                              currency: 'SGD',
                              value: data.Stocks
                                ? typeof data.Stocks === 'number'
                                  ? data.Stocks
                                  : 0
                                : 0,
                            },
                          },
                          title: jobTitle,
                          totalCompensation: {
                            create: {
                              baseCurrency: baseCurrencyString,
                              baseValue: await convert(
                                data.TC
                                  ? typeof data.TC === 'number'
                                    ? data.TC
                                    : 0
                                  : 0,
                                'SGD',
                                baseCurrencyString,
                              ),
                              currency: 'SGD',
                              value: data.TC
                                ? typeof data.TC === 'number'
                                  ? data.TC
                                  : 0
                                : 0,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              });
              console.log('Profile created:', dataAdded.id);
              createdProfileIds.push(dataAdded.id);
            }
          } else {
            console.log('Invalid Company: ' + data.Company);
          }
        } else {
          console.log('Invalid TC not a number: ' + data.TC);
        }
      }),
    );
  }
};

Promise.all([seedSalaries()])
  .then(() => {
    console.log(createdProfileIds.length + ' profiles created');
  })
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export {};
