export function getProfileLink(profileId: string, token?: string) {
  return `${window.location.origin}${getProfilePath(profileId, token)}`;
}

export function copyProfileLink(profileId: string, token?: string) {
  navigator.clipboard.writeText(getProfileLink(profileId, token));
}

export function getProfilePath(profileId: string, token?: string) {
  if (token) {
    return `/offers/profile/${profileId}?token=${token}`;
  }
  return `/offers/profile/${profileId}`;
}

export function getProfileEditPath(profileId: string, token: string) {
  return `/offers/profile/edit/${profileId}?token=${token}`;
}
