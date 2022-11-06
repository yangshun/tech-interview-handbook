import { trpc } from '../trpc';

export default function useCompanyOptions(query: string) {
  const companies = trpc.useQuery([
    'companies.list',
    {
      name: query,
    },
  ]);

  const { data, ...restQuery } = companies;

  return {
    data:
      data?.map(({ id, name }) => ({
        id,
        label: name,
        value: id,
      })) ?? [],
    ...restQuery,
  };
}
