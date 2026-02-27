// src/utils/auth.ts

export function saveTokenFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      // Optionally, remove the token from the URL to clean it up
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }
  
  export function getToken(): string | null {
    return localStorage.getItem("token");
  }