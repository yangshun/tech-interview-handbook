import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mapInternshipCycle = async () => {
  console.log('Mapping internship cycle values');

  const offersInterns = await prisma.offersIntern.findMany({
    where: {
      internshipCycle: 'Summer',
    },
  });

  console.log(
    'Number of incorrect internship cycle values found:',
    offersInterns.length,
  );

  let i = 0;

  offersInterns.forEach(async (offersIntern) => {
    await prisma.offersIntern.update({
      where: {
        id: offersIntern.id,
      },
      data: {
        internshipCycle: 'summer',
      },
    });

    console.log(
      ++i,
      ': Mapped internship cycle for intern with id',
      offersIntern.id,
    );
  });

  console.log(i, 'internship cycles mapped');
};

Promise.all([mapInternshipCycle()])
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    console.log('Mapping stopped!');
    await prisma.$disconnect();
    process.exit(1);
  });

export {};
