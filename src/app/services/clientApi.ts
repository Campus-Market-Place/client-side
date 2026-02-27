// src/services/clientApi.ts

const API_BASE_URL =
  (import.meta as any).env.VITE_API_BASE_URL ||
  "https://backend-ikou.onrender.com/api";

// fallback dev token
const TOKEN =
  (import.meta as any).env.VITE_USER_TOKEN ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzYmQwMTJmNi03M2I0LTRkZmEtOGMzMS00MzI0OGRiNzJmNDQiLCJyb2xlIjoiU0VMTEVSIiwidXNlcm5hbWUiOiJtYW1hX21pYSIsImlhdCI6MTc3MTc3MTI4NywiZXhwIjoxNzcyMzc2MDg3fQ.CR5Xh1S81kKdtI3A4-2n4nGUMMljpKkhqtt6xYcCRNs";

/**
 * Generic API fetch wrapper
 * - endpoint: relative path (e.g., "/categories")
 * - options: fetch options (method, body, etc.)
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token") || TOKEN;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Request failed");
  }

  return response.json();
}