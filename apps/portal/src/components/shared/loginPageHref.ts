export default function loginPageHref(redirectUrl?: string) {
  return {
    pathname: '/login',
    query: {
      callbackUrl:
        typeof window !== 'undefined'
          ? redirectUrl ?? window.location.href
          : null,
    },
  };
}
