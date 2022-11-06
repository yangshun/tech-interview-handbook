import { JobTitleLabels } from '~/components/shared/JobTitles';

const sortedJobTitleOptions = Object.entries(JobTitleLabels)
  .map(([slug, { label, ranking }]) => ({
    id: slug,
    label,
    ranking,
    value: slug,
  }))
  .sort((a, b) => b.ranking - a.ranking);

export default function useJobTitleOptions(query: string) {
  const jobTitles = sortedJobTitleOptions.filter(({ label }) =>
    label.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
  );

  return jobTitles;
}
