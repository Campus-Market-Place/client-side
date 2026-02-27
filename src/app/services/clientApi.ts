const API_BASE_URL = "https://backend-ikou.onrender.com/api"; // no .env needed

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token"); // dynamic token

  if (!token) throw new Error("No auth token found");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
}