export function getProfileLink(profileId: string, token?: string) {
  return `${window.location.origin}${getProfilePath(profileId, token)}`;
}

export function copyProfileLink(profileId: string, token?: string) {
  // TODO: Add notification
  navigator.clipboard.writeText(getProfileLink(profileId, token));
}

export function getProfilePath(profileId: string, token?: string) {
  if (token) {
    return `/offers/profile/${profileId}?token=${token}`;
  }
  return `/offers/profile/${profileId}`;
}
