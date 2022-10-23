import reader from 'xlsx';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { baseCurrencyString } from '../src/utils/offers/currency';
import { convert } from '../src/utils/offers/currency/currencyExchange';
import { generateAnalysis } from '../src/utils/offers/analysisGeneration';

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

for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res: ExcelData) => {
    data.push(res);
  });
}

function xlSerialToJsDate(xlSerial) {
  return new Date(Date.UTC(0, 0, xlSerial - 1));
}

function generateSpecialization() {
  const specializations = ['Frontend', 'Backend', 'Fullstack'];

  return specializations[Math.floor(Math.random() * 300) % 3];
}

const createdProfileIds: Array<string> = [];

const seedSalaries = async () => {
  console.log('Seeding from salaries sheet...');

  const companyIdMappings = {};
  (await prisma.company.findMany()).forEach((company) => {
    companyIdMappings[company.name] = company.id;
  });

  //seed here
  return await Promise.all(
    data.map(async (data: excelData) => {
      // only add swe roles
      if (data.Role.toUpperCase() === 'SOFTWARE ENGINEER') {
        if (data.Income && typeof data.Income === 'number') {
          // check if we have company id
          // console.log(data.Income)
          // console.log()
          if (companyIdMappings[data.Company]) {
            const token = crypto
              .createHash('sha256')
              .update(xlSerialToJsDate(data.Timestamp).toString())
              .digest('hex');
            if (data.Type.toUpperCase() === 'INTERNSHIP') {
              // create profile
              const dataAdded = await prisma.offersProfile.create({
                data: {
                  profileName: crypto.randomUUID().substring(0, 10),
                  createdAt: xlSerialToJsDate(data.Timestamp),
                  editToken: token,
                  background: {
                    create: {
                      totalYoe: 0,
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
                      location: 'Singapore, Singapore', // TODO: DEFAULT AS SG
                      monthYearReceived: xlSerialToJsDate(data.Timestamp),
                      negotiationStrategy: '',
                      offersIntern: {
                        create: {
                          internshipCycle: 'Summer',
                          monthlySalary: {
                            create: {
                              baseCurrency: baseCurrencyString,
                              baseValue: await convert(
                                data.Income,
                                'SGD', // assume sgd
                                baseCurrencyString,
                              ),
                              currency: 'SGD', // assume sgd
                              value: data.Income,
                            },
                          },
                          specialization: generateSpecialization(), // TODO: check about this
                          startYear: xlSerialToJsDate(
                            data.Timestamp,
                          ).getFullYear(),
                          title: data.Role, // TODO: check about this
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
                  profileName: crypto.randomUUID().substring(0, 10),
                  createdAt: xlSerialToJsDate(data.Timestamp),
                  editToken: token,
                  background: {
                    create: {
                      totalYoe: 0,
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
                      location: 'Singapore, Singapore', // TODO: DEFAULT AS SG
                      monthYearReceived: xlSerialToJsDate(data.Timestamp),
                      negotiationStrategy: '',
                      offersFullTime: {
                        create: {
                          baseSalary: {
                            create: {
                              baseCurrency: baseCurrencyString,
                              baseValue: await convert(
                                data.Income,
                                'SGD', // assume sgd
                                baseCurrencyString,
                              ),
                              currency: 'SGD', // assume sgd
                              value: data.Income,
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
                          level: data.Type,
                          specialization: generateSpecialization(), // TODO: check about this
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
                          title: data.Role, // TODO: check about this
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
          console.log('Invalid Income not a number: ' + data.Income);
        }
      }
    }),
  );
};

const generateAllAnalysis = async () => {
  return await Promise.all(
    createdProfileIds.map(async (profileId) => {
      const analysis = await generateAnalysis({
        ctx: { prisma, session: null },
        input: { profileId },
      });
      console.log('Analysis generated for profile with id:', profileId);
    }),
  );
};

Promise.all([seedSalaries()])
  .then(() => generateAllAnalysis())
  .then((_data) => {
    console.log('Seeding from salaries sheet complete');
  })
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

console.log(xlSerialToJsDate(data[0].Timestamp));

export {};
