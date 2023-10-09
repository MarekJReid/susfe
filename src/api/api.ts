export async function fetchFromAPI(endpoint: string) {
  const url = `http://localhost:3333${endpoint}`;
  const SAMPLE_JWT_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY7ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${SAMPLE_JWT_TOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return await response.json();
}
