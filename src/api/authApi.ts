export async function fetchFromAuthAPI(endpoint: string, sessionId: string) {
  const url = `http://localhost:8000${endpoint}`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${sessionId}`,
    },
  });
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return await response.json();
}
