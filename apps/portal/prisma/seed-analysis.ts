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

  console.log(
    'Number of profiles found without analysis:',
    profilesWithoutAnalysis.length,
  );

  let i = 0;

  while (i < profilesWithoutAnalysis.length) {
    const profile = profilesWithoutAnalysis[i];

    await generateAnalysis({
      ctx: { prisma, session: null },
      input: { profileId: profile.id },
    });

    console.log(++i, ': Analysis generated for profile with id', profile.id);
  }

  console.log(i, 'analysis generated');
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
