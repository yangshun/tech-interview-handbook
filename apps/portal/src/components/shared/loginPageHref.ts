export default function loginPageHref() {
  return {
    pathname: '/login',
    query: {
      redirect: typeof window !== 'undefined' ? window.location.href : null,
    },
  };
}
