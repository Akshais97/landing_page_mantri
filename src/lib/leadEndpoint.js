export function resolveLeadEndpoint(baseUrl = "/") {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return `${normalizedBase}api/lead`;
}
