import { PrismaClient } from '@prisma/client';
import { generateAnalysis } from '../src/utils/offers/analysis/analysisGeneration';

const prisma = new PrismaClient();

const seedAnalysis = async () => {
  console.log('Busy crunching analysis.....');

  const profilesWithoutAnalysis = await prisma.offersProfile.findMany({
    where: {
      analysis: {
        is: null,
      },
    },
  });

  for (const profile of profilesWithoutAnalysis) {
    await generateAnalysis({
      ctx: { prisma, session: null },
      input: { profileId: profile.id },
    });
    console.log('Analysis generated for profile with id:', profile.id);
  }
};

Promise.all([seedAnalysis()])
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    console.log('Analysis stopping!');
    await prisma.$disconnect();
    process.exit(1);
  });

export {};
