import ResumeBadgeCoolIcon from '../badgeIcons/popularResumes/ResumeBadgeCoolIcon';
import ResumeBadgeRocketIcon from '../badgeIcons/popularResumes/ResumeBadgeRocketIcon';
import ResumeBadgeTreasureIcon from '../badgeIcons/popularResumes/ResumeBadgeTreasureIcon';
import ResumeBadgeDetectiveIcon from '../badgeIcons/reviewer/ResumeBadgeDetectiveIcon';
import ResumeBadgeEagleIcon from '../badgeIcons/reviewer/ResumeBadgeEagleIcon';
import ResumeBadgeSuperheroIcon from '../badgeIcons/reviewer/ResumeBadgeSuperheroIcon';
import ResumeBadgeBookIcon from '../badgeIcons/topComment/ResumeBadgeBookIcon';
import ResumeBadgeOwlIcon from '../badgeIcons/topComment/ResumeBadgeOwlIcon';
import ResumeBadgeSageIcon from '../badgeIcons/topComment/ResumeBadgeSageIcon';

export type BadgeIcon = (
  props: React.ComponentProps<typeof ResumeBadgeDetectiveIcon>,
) => JSX.Element;

export type BadgeInfo = {
  description: string;
  icon: BadgeIcon;
  id: string;
  isValid: (payload: BadgePayload) => boolean;
  title: string;
};

export type BadgePayload = {
  maxResumeUpvoteCount: number;
  reviewedResumesCount: number;
  topUpvotedCommentCount: number;
};

const TIER_THREE = 20;
const TIER_TWO = 10;
const TIER_ONE = 5;

export const RESUME_USER_BADGES: Array<BadgeInfo> = [
  {
    description: `Reviewed ${TIER_THREE} resumes`,
    icon: ResumeBadgeSuperheroIcon,
    id: 'Superhero',
    isValid: (payload: BadgePayload) =>
      payload.reviewedResumesCount >= TIER_THREE,
    title: 'True saviour of the people',
  },
  {
    description: `Reviewed ${TIER_TWO} resumes`,
    icon: ResumeBadgeDetectiveIcon,
    id: 'Detective',
    isValid: (payload: BadgePayload) =>
      payload.reviewedResumesCount >= TIER_TWO &&
      payload.reviewedResumesCount < TIER_THREE,
    title: 'Keen eye for details like a private eye',
  },
  {
    description: `Reviewed ${TIER_ONE} resumes`,
    icon: ResumeBadgeEagleIcon,
    id: 'Eagle',
    isValid: (payload: BadgePayload) =>
      payload.reviewedResumesCount >= TIER_ONE &&
      payload.reviewedResumesCount < TIER_TWO,
    title: 'As sharp as an eagle',
  },
  {
    description: `${TIER_THREE} upvotes on a resume`,
    icon: ResumeBadgeRocketIcon,
    id: 'Rocket',
    isValid: (payload: BadgePayload) =>
      payload.maxResumeUpvoteCount >= TIER_THREE,
    title: 'To the moon!',
  },
  {
    description: `${TIER_TWO} upvotes on a resume`,
    icon: ResumeBadgeTreasureIcon,
    id: 'Treasure',
    isValid: (payload: BadgePayload) =>
      payload.maxResumeUpvoteCount >= TIER_TWO &&
      payload.maxResumeUpvoteCount < TIER_THREE,
    title: "Can't get enough of this!",
  },
  {
    description: `${TIER_ONE} upvotes on a resume`,
    icon: ResumeBadgeCoolIcon,
    id: 'Cool',
    isValid: (payload: BadgePayload) =>
      payload.maxResumeUpvoteCount >= TIER_ONE &&
      payload.maxResumeUpvoteCount < TIER_TWO,
    title: 'Like the cool kids',
  },
  {
    description: `${TIER_THREE} top upvoted comment`,
    icon: ResumeBadgeSageIcon,
    id: 'Sage',
    isValid: (payload: BadgePayload) =>
      payload.topUpvotedCommentCount >= TIER_THREE,
    title: 'I am wisdom',
  },
  {
    description: `${TIER_TWO} top upvoted comment`,
    icon: ResumeBadgeBookIcon,
    id: 'Book',
    isValid: (payload: BadgePayload) =>
      payload.topUpvotedCommentCount >= TIER_TWO &&
      payload.topUpvotedCommentCount < TIER_THREE,
    title: 'The walking encyclopaedia',
  },
  {
    description: `${TIER_ONE} top upvoted comment`,
    icon: ResumeBadgeOwlIcon,
    id: 'Owl',
    isValid: (payload: BadgePayload) =>
      payload.topUpvotedCommentCount >= TIER_ONE &&
      payload.topUpvotedCommentCount < TIER_TWO,
    title: 'Wise as an owl',
  },
];
