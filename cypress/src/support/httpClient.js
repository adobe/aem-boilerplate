/**
 * Minimal native fetch wrapper that preserves the response shape
 * expected by accsClient.js and tokenManager.js: { data, status, headers }
 * It replaces the axios library with the native fetch API.
 */

async function httpClient({
  method = "GET",
  url,
  headers = {},
  data,
  validateStatus,
}) {
  const init = { method, headers };

  if (data !== undefined && data !== null) {
    init.body =
      data instanceof URLSearchParams ? data.toString() : JSON.stringify(data);
  }

  const response = await fetch(url, init);

  const shouldReject = validateStatus
    ? !validateStatus(response.status)
    : !response.ok;

  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (shouldReject) {
    const error = new Error(`Request failed with status ${response.status}`);
    error.response = {
      status: response.status,
      data: body,
      headers: response.headers,
    };
    throw error;
  }

  return {
    data: body,
    status: response.status,
    headers: Object.fromEntries(response.headers.entries()),
  };
}

module.exports = httpClient;
