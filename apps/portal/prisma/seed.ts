const { PrismaClient } = require('@prisma/client');

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
];

async function main() {
  console.log('Seeding started...');
  await Promise.all(
    COMPANIES.map(async (company) => {
      await prisma.company.upsert({
        where: { slug: company.slug },
        update: company,
        create: company,
      });
    }),
  );
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
