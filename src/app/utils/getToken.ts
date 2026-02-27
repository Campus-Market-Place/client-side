// src/utils/getToken.ts
export function getTokenFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token); // store for later API calls
      return token;
    }
    return localStorage.getItem("token") || null;
  }