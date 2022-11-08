import type { Resume } from '~/types/resume';

export function resumeGetFilterCounts(data: Array<Resume>) {
  const roleCounts: Record<string, number> = {};
  for (let i = 0; i < data.length; i++) {
    const { role } = data[i];
    if (!(role in roleCounts)) {
      roleCounts[role] = 1;
    } else {
      roleCounts[role]++;
    }
  }

  const experienceCounts: Record<string, number> = {};
  for (let i = 0; i < data.length; i++) {
    const { experience } = data[i];
    if (!(experience in experienceCounts)) {
      experienceCounts[experience] = 1;
    } else {
      experienceCounts[experience]++;
    }
  }

  const locationCounts: Record<string, number> = {};
  for (let i = 0; i < data.length; i++) {
    const { locationId } = data[i];
    if (!(locationId in locationCounts)) {
      locationCounts[locationId] = 1;
    } else {
      locationCounts[locationId]++;
    }
  }

  return {
    experience: experienceCounts,
    location: locationCounts,
    role: roleCounts,
  };
}

export const getWhereClauseFilters = (
  experienceFilters: Array<string>,
  roleFilters: Array<string>,
  locationFilters: Array<string>,
) => {
  return {
    ...(experienceFilters.length > 0 && {
      experience: { in: experienceFilters },
    }),
    ...(roleFilters.length > 0 && {
      role: { in: roleFilters },
    }),
    ...(locationFilters.length > 0 && {
      locationId: { in: locationFilters },
    }),
  };
};
