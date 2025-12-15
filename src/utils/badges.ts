export interface BadgeInfo {
  name: string;
  icon: string;
  color: string;
  minSubscribers: number;
}

export const BADGES: BadgeInfo[] = [
  {
    name: 'Коричневая галочка',
    icon: 'https://cdn.poehali.dev/files/8we2lr3m.png',
    color: 'sepia(1) saturate(3) hue-rotate(15deg)',
    minSubscribers: 100
  },
  {
    name: 'Белая галочка',
    icon: 'https://cdn.poehali.dev/files/8we2lr3m.png',
    color: 'brightness(1.2)',
    minSubscribers: 1000
  },
  {
    name: 'Синяя галочка',
    icon: 'https://cdn.poehali.dev/files/8we2lr3m.png',
    color: 'hue-rotate(200deg) saturate(2)',
    minSubscribers: 1000000
  }
];

export const getBadgeForSubscribers = (subscribers: number): BadgeInfo | null => {
  const earnedBadges = BADGES.filter(badge => subscribers >= badge.minSubscribers);
  return earnedBadges.length > 0 ? earnedBadges[earnedBadges.length - 1] : null;
};

export const formatSubscribers = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};
