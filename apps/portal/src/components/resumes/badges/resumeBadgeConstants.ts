import ResumeBadgeDetectiveIcon from '../badgeIcons/reviewer/ResumeBadgeDetectiveIcon';
import ResumeBadgeEagleIcon from '../badgeIcons/reviewer/ResumeBadgeEagleIcon';
import ResumeBadgeSuperheroIcon from '../badgeIcons/reviewer/ResumeBadgeSuperheroIcon';

export type BadgeIcon = (
  props: React.ComponentProps<
    | typeof ResumeBadgeDetectiveIcon
    | typeof ResumeBadgeEagleIcon
    | typeof ResumeBadgeSuperheroIcon
  >,
) => JSX.Element;

export type BadgeInfo = {
  description: string;
  icon: BadgeIcon;
  id: string;
  isValid: (payload: BadgePayload) => boolean;
  title: string;
};

// TODO: Add other badges in
export type BadgePayload = {
  reviewedResumesCount: number;
};

const TIER_THREE = 20;
const TIER_TWO = 10;
const TIER_ONE = 5;

export const RESUME_USER_BADGES: Array<BadgeInfo> = [
  {
    description: `Reviewed over ${TIER_ONE} resumes`,
    icon: ResumeBadgeSuperheroIcon,
    id: 'Superhero',
    isValid: (payload: BadgePayload) =>
      payload.reviewedResumesCount >= TIER_THREE,
    title: 'True saviour of the people',
  },
  {
    description: `Reviewed over ${TIER_TWO} resumes`,
    icon: ResumeBadgeDetectiveIcon,
    id: 'Detective',
    isValid: (payload: BadgePayload) =>
      payload.reviewedResumesCount >= TIER_TWO &&
      payload.reviewedResumesCount < TIER_THREE,
    title: 'Keen eye for details like a private eye',
  },
  {
    description: `Reviewed over ${TIER_THREE} resumes`,
    icon: ResumeBadgeEagleIcon,
    id: 'Eagle',
    isValid: (payload: BadgePayload) =>
      payload.reviewedResumesCount >= TIER_ONE &&
      payload.reviewedResumesCount < TIER_TWO,
    title: 'As sharp as an eagle',
  },
];
