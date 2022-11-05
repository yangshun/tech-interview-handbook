import reader from 'xlsx';

const file = reader.readFile('prisma/salaries.xlsx');

export const COMPANIES: Array<CompanyData> = []

type CompanyData = {
  Finalized: string;
  description: string;
  logoUrl: string;
  name: string;
  slug: string;
  website: string;
};

const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[1]]);
temp.forEach((res: CompanyData) => {
  COMPANIES.push(res);
});