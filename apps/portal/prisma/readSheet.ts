import reader from "xlsx";
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { baseCurrencyString } from '../src/utils/offers/currency';
import { convert } from '../src/utils/offers/currency/currencyExchange';

const prisma = new PrismaClient();
// Reading our test file
const file = reader.readFile('/Users/stuartlong/Desktop/tech-interview-handbook/apps/portal/prisma/salaries.xlsx')

let data: Array<excelData> = []

type excelData = {
   Timestamp: Date;
   Type: string;
   Company: string;
   Role: string,
   Income?: number | string;
   Stocks?: number | string;
   SignOn?: number | string;
   TC?: number | string;
   Bonus?: number | string;
   Comments?: string
}

const sheets = file.SheetNames

for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res: excelData) => {
      data.push(res)
   })
}

function xlSerialToJsDate(xlSerial){
  return new Date(Date.UTC(0, 0, xlSerial - 1));
}

function generateSpecialization() {
   const specializations = ["Frontend", "Backend", "Fullstack"];

   return specializations[Math.floor((Math.random() * 300)) % 3];
}

async function seedSalaries() {
   console.log('Seeding from salaries sheet...');

   const companyIdMappings = {};
   (await prisma.company.findMany()).forEach((company) => {
      companyIdMappings[company.name] = company.id
   });
   console.log(companyIdMappings);

   const createdProfileIds : Array<string> = [];
   //seed here
   (await Promise.all([
      data.map(async (data: excelData) => {
         // only add swe roles
         if (data.Role.toUpperCase() === 'SOFTWARE ENGINEER') {
            if (data.Income && typeof (data.Income) === "number") {
               // check if we have company id
               // console.log(data.Income)
               // console.log()
               if (companyIdMappings[data.Company]) {
                  const token = crypto.createHash('sha256').update(xlSerialToJsDate(data.Timestamp).toString()).digest('hex')
                  if (data.Type.toUpperCase() === 'INTERNSHIP') {
                     // create profile
                     const dataAdded = await prisma.offersProfile.create({
                        data: {
                           profileName: crypto.randomUUID().substring(0, 10),
                           createdAt: xlSerialToJsDate(data.Timestamp),
                           editToken: token,
                           background: {
                              create: {
                                 totalYoe: 0
                              }
                           },
                           offers: {
                              create: {
                                 comments: data.Comments ?? "",
                                 company: {
                                    connect: {
                                       id: companyIdMappings[data.Company]
                                    }
                                 },
                                 jobType: "INTERN",
                                 location: "Singapore, Singapore", // TODO: DEFAULT AS SG
                                 monthYearReceived: xlSerialToJsDate(data.Timestamp),
                                 negotiationStrategy: "",
                                 offersIntern: {
                                    create: {
                                       internshipCycle: "Summer",
                                       monthlySalary: {
                                          create: {
                                             baseCurrency: baseCurrencyString,
                                             baseValue: await convert(
                                                data.Income,
                                                'SGD', // assume sgd
                                                baseCurrencyString,
                                             ),
                                             currency: 'SGD', // assume sgd
                                             value: data.Income
                                          }
                                       },
                                       specialization: generateSpecialization(), // TODO: check about this
                                       startYear: xlSerialToJsDate(data.Timestamp).getFullYear(),
                                       title: data.Role // TODO: check about this
                                    }
                                 }
                              }
                           }
                        }
                     })

                     console.log(dataAdded)
                     createdProfileIds.push(dataAdded.id)
                  } else {
                     // assume rest full time
                     const dataAdded = await prisma.offersProfile.create({
                        data: {
                           profileName: crypto.randomUUID().substring(0, 10),
                           createdAt: xlSerialToJsDate(data.Timestamp),
                           editToken: token,
                           background: {
                              create: {
                                 totalYoe: 0
                              }
                           },
                           offers: {
                              create: {
                                 comments: data.Comments ?? "",
                                 company: {
                                    connect: {
                                       id: companyIdMappings[data.Company]
                                    }
                                 },
                                 jobType: "FULLTIME",
                                 location: "Singapore, Singapore", // TODO: DEFAULT AS SG
                                 monthYearReceived: xlSerialToJsDate(data.Timestamp),
                                 negotiationStrategy: "",
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
                                             value: data.Income
                                          }
                                       },
                                       bonus: {
                                          create: {
                                             baseCurrency: baseCurrencyString,
                                             baseValue: await convert(
                                                data.Bonus ? (typeof data.Bonus === 'number' ? data.Bonus : 0) : 0,
                                                'SGD',
                                                baseCurrencyString,
                                             ),
                                             currency: 'SGD',
                                             value: data.Bonus ? (typeof data.Bonus === 'number' ? data.Bonus : 0) : 0,
                                          }
                                       },
                                       level: data.Type,
                                       specialization: generateSpecialization(), // TODO: check about this
                                       stocks: {
                                          create: {
                                             baseCurrency: baseCurrencyString,
                                             baseValue: await convert(
                                                data.Stocks ? (typeof data.Stocks === "number" ? data.Stocks : 0) : 0,
                                                'SGD',
                                                baseCurrencyString,
                                             ),
                                             currency: 'SGD',
                                             value: data.Stocks ? (typeof data.Stocks === "number" ? data.Stocks : 0) : 0,
                                          }
                                       },
                                       title: data.Role, // TODO: check about this
                                       totalCompensation: {
                                          create: {
                                             baseCurrency: baseCurrencyString,
                                             baseValue: await convert(
                                                data.TC ? (typeof data.TC === "number" ? data.TC : 0) : 0,
                                                'SGD',
                                                baseCurrencyString,
                                             ),
                                             currency: 'SGD',
                                             value: data.TC ? (typeof data.TC === "number" ? data.TC : 0) : 0,
                                          }
                                       },
                                    }
                                 }
                              }
                           }
                        }
                     })
                     console.log(dataAdded)
                     createdProfileIds.push(dataAdded.id)
                  }
               } else {
                  console.log("Invalid Company: " + data.Company)
               }
            } else {
               console.log("Invalid Income not a number: " + data.Income)
            }
         }
      })
   ]).then((_data) => {
      console.log('Seeding from salaries sheet complete')
   }));
}

seedSalaries()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// Printing data
// console.log(data.splice(0,100))
// // console.table(data.splice(0,100))

console.log(xlSerialToJsDate(data[0].Timestamp))

export {}