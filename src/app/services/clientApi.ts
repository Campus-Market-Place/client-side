export function getToken() {
  return localStorage.getItem("token");
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {

  const token = getToken();

  if (!token) {
    throw new Error("No auth token found.");
  }

  return fetch(`https://backend-ikou.onrender.com/api${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
}