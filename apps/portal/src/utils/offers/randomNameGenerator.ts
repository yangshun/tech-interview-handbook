import type { Config } from 'unique-names-generator';
import { adjectives, animals,colors, uniqueNamesGenerator } from 'unique-names-generator';

const customConfig: Config = {
  dictionaries: [adjectives, colors, animals],
  length: 3,
  separator: '-',
};


export default function generateRandomName(): string {
    return uniqueNamesGenerator(customConfig)
}