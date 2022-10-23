import { COMPANIES } from '../src/utils/companySeed';
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding started...');
  await Promise.all([
    COMPANIES.map(async (company) => {
      await prisma.company.upsert({
        where: { slug: company.slug },
        update: company,
        create: company,
      });
    }),
  ]);
  console.log('Seeding completed.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });