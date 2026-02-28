// src/utils/auth.ts

export function saveToken(token: string) {
  if (!token) return;
  localStorage.setItem("token", token);
}

export function saveTokenFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    saveToken(token);
    window.history.replaceState({}, document.title, window.location.pathname);
    return;
  }

  console.warn("No token in URL");
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}