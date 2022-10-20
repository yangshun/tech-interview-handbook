import BronzeReviewerBadgeIcon from '../badgeIcons/reviewer/BronzeReviewerBadgeIcon';
import GoldReviewerBadgeIcon from '../badgeIcons/reviewer/GoldReviewerBadgeIcon';
import SilverReviewerBadgeIcon from '../badgeIcons/reviewer/SilverReviewerBadgeIcon';

export type BadgeIcon = (
  props: React.ComponentProps<
    | typeof BronzeReviewerBadgeIcon
    | typeof GoldReviewerBadgeIcon
    | typeof SilverReviewerBadgeIcon
  >,
) => JSX.Element;

export type BadgeInfo = {
  description: string;
  icon: BadgeIcon;
  id: string;
  isValid: (payload: BadgePayload) => boolean;
  toolTip: string;
};

// TODO: Add other badges in
export type BadgePayload = {
  reviewedResumesCount: number;
};

const GOLD_TIER = 20;
const SILVER_TIER = 10;
const BRONZE_TIER = 5;

export const RESUME_USER_BADGES: Array<BadgeInfo> = [
  {
    description: `User has reviewed over ${GOLD_TIER} resumes`,
    icon: GoldReviewerBadgeIcon,
    id: 'Superhero',
    isValid: (payload: BadgePayload) =>
      payload.reviewedResumesCount >= GOLD_TIER,
    toolTip: 'True saviour of the people',
  },
  {
    description: `User has reviewed over ${SILVER_TIER} resumes`,
    icon: SilverReviewerBadgeIcon,
    id: 'Detective',
    isValid: (payload: BadgePayload) =>
      payload.reviewedResumesCount >= SILVER_TIER &&
      payload.reviewedResumesCount < GOLD_TIER,
    toolTip: 'Keen eye for details like a private eye',
  },
  {
    description: `User has reviewed over ${BRONZE_TIER} resumes`,
    icon: BronzeReviewerBadgeIcon,
    id: 'Eagle',
    isValid: (payload: BadgePayload) =>
      payload.reviewedResumesCount >= BRONZE_TIER &&
      payload.reviewedResumesCount < SILVER_TIER,
    toolTip: 'As sharp as an eagle',
  },
];
