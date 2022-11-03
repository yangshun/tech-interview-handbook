export default function loginPageHref(redirectUrl?: string) {
  return {
    pathname: '/login',
    query: {
      redirect:
        typeof window !== 'undefined'
          ? redirectUrl ?? window.location.href
          : null,
    },
  };
}
