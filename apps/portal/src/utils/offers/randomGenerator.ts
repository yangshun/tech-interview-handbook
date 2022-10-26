import type { Config } from 'unique-names-generator';
import { countries, names } from 'unique-names-generator';
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from 'unique-names-generator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const customConfig: Config = {
  dictionaries: [adjectives, colors, animals],
  length: 3,
  separator: '-',
};

export async function generateRandomName(): Promise<string> {
  let uniqueName: string = uniqueNamesGenerator(customConfig);

  let sameNameProfiles = await prisma.offersProfile.findMany({
    where: {
      profileName: uniqueName,
    },
  });

  while (sameNameProfiles.length !== 0) {
    uniqueName = uniqueNamesGenerator(customConfig);
    sameNameProfiles = await prisma.offersProfile.findMany({
      where: {
        profileName: uniqueName,
      },
    });
  }

  return uniqueName;
}

const tokenConfig: Config = {
  dictionaries: [adjectives, colors, animals, countries, names].sort(
    (_a, _b) => 0.5 - Math.random(),
  ),
  length: 5,
  separator: '-',
};

export function generateRandomStringForToken(): string {
  return uniqueNamesGenerator(tokenConfig);
}
