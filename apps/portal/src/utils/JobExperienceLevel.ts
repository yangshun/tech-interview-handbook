enum JobExperienceLevel {
  Entry,
  Mid,
  Senior,
}

export function yearsOfExperienceToLevel(years: number): Readonly<{
  label: string;
  level: JobExperienceLevel;
}> {
  if (years <= 2) {
    return {
      label: 'Entry Level',
      level: JobExperienceLevel.Entry,
    };
  }

  if (years <= 5) {
    return {
      label: 'Mid Level',
      level: JobExperienceLevel.Mid,
    };
  }

  return {
    label: 'Senior Level',
    level: JobExperienceLevel.Senior,
  };
}
