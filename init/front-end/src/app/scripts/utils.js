// TODO #export-functions: export function parseUrl
export function parseUrl(url = window.location.href) {
  return (url.split("?")[1] ?? "")
    .split("&")
    .map((q) => q.split("="))
    .reduce((params, [k, v]) => ({ ...params, [k]: v }), {});
}
