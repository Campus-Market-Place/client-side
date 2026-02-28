const API_BASE_URL = "https://backend-ikou.onrender.com/api";

export async function telegramLogin() {

  const tg = (window as any).Telegram?.WebApp;

  if (!tg || !tg.initDataUnsafe?.user) {
    throw new Error("Telegram user not found");
  }

  const telegramId = tg.initDataUnsafe.user.id.toString();
  const username = tg.initDataUnsafe.user.username || "unknown";

  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      telegramId,
      username,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Login failed");
  }

  localStorage.setItem("token", data.token);

  return data;
}