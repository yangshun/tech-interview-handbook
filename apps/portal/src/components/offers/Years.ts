const NUM_YEARS = 5;
export const FutureYearsOptions = Array.from({ length: NUM_YEARS }, (_, i) => {
  const year = new Date().getFullYear() + i;
  return {
    label: String(year),
    value: year,
  };
});
