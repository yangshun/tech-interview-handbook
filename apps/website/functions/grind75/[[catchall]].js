const SOURCE_HOST = 'https://grind75.pages.dev';

export async function onRequest(context) {
  const { request } = context;
  // Define the original and target paths
  const url = new URL(request.url);

  // Rewrite to the new domain, preserving the original path and query string
  const newURL = SOURCE_HOST + url.pathname + url.search;

  // Fetch the content from the new domain
  return await fetch(newURL, request);
}
