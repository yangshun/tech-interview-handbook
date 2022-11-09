import * as fs from 'fs';
const { PrismaClient } = require('@prisma/client');
const { parse } = require('csv-parse/sync');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding started...');

  const file = fs.readFileSync('prisma/companies.csv');
  const companies = parse(file, {
    columns: true,
    skip_empty_lines: true,
  });

  console.info('Seeding companies');
  await prisma.company.createMany({
    data: companies.map((company) => ({
      name: company.name,
      slug: company.slug,
      description: !!company.description ? company.description : undefined,
      website: company.website,
      logoUrl: company.logoUrl,
    })),
    skipDuplicates: true,
  });
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
