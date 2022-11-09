const NUM_YEARS = 5;
const OFFSET = 2;
export const YearsOptions = (yearSelected?: number) =>
  Array.from({ length: NUM_YEARS }, (_, i) => {
    const year = yearSelected
      ? yearSelected - OFFSET + i
      : new Date().getFullYear() - OFFSET + i;
    return {
      label: String(year),
      value: year,
    };
  });
