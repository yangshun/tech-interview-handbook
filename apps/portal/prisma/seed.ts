const { PrismaClient } = require('@prisma/client');

const cities = require('./data/cities.json');
const countries = require('./data/countries.json');
const states = require('./data/states.json');

const prisma = new PrismaClient();

const COMPANIES = [
  {
    name: 'Meta',
    slug: 'meta',
    description: `Meta Platforms, Inc., doing business as Meta and formerly named Facebook, Inc., and TheFacebook, Inc., is an American multinational technology conglomerate based in Menlo Park, California. The company owns Facebook, Instagram, and WhatsApp, among other products and services.`,
    logoUrl: 'https://logo.clearbit.com/meta.com',
  },
  {
    name: 'Google',
    slug: 'google',
    description: `Google LLC is an American multinational technology company that focuses on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics.`,
    logoUrl: 'https://logo.clearbit.com/google.com',
  },
  {
    name: 'Apple',
    slug: 'apple',
    description: `Apple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services headquartered in Cupertino, California, United States.`,
    logoUrl: 'https://logo.clearbit.com/apple.com',
  },
  {
    name: 'Amazon',
    slug: 'amazon',
    description: `Amazon.com, Inc. is an American multinational technology company that focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.`,
    logoUrl: 'https://logo.clearbit.com/amazon.com',
  },
  {
    name: 'Microsoft',
    slug: 'microsoft',
    description: `Microsoft Corporation is an American multinational technology corporation which produces computer software, consumer electronics, personal computers, and related services headquartered at the Microsoft Redmond campus located in Redmond, Washington, United States.`,
    logoUrl: 'https://logo.clearbit.com/microsoft.com',
  },
  {
    name: 'Netflix',
    slug: 'netflix',
    description: null,
    logoUrl: 'https://logo.clearbit.com/netflix.com',
  },
];

async function main() {
  console.log('Seeding started...');

  console.info('Seeding companies');
  await prisma.company.createMany({
    data: COMPANIES.map((company) => ({
      name: company.name,
      slug: company.slug,
      description: company.description,
      logoUrl: company.logoUrl,
    })),
    skipDuplicates: true,
  });

  console.info('Seeding countries');
  await prisma.country.createMany({
    data: countries.data.map((country) => ({
      id: country.country_id,
      code: country.sortname,
      name: country.country_name,
    })),
    skipDuplicates: true,
  });

  console.info('Seeding states');
  await prisma.state.createMany({
    data: states.data.map((state) => ({
      id: state.state_id,
      countryId: state.country_id,
      name: state.state_name,
    })),
    skipDuplicates: true,
  });

  console.info('Seeding cities');
  await prisma.city.createMany({
    data: cities.data.map((city) => ({
      id: city.city_id,
      stateId: city.state_id,
      name: city.city_name,
    })),
    skipDuplicates: true,
  });

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
