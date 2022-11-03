import reader from 'xlsx';

const file = reader.readFile('prisma/salaries.xlsx');

export const COMPANIES = []

const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[1]]);
temp.forEach((res) => {
  COMPANIES.push(res);
});