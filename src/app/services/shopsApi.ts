const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL;
const TOKEN = (import.meta as any).env.VITE_USER_TOKEN;

export async function getShopById(shopId: string) {
  const response = await fetch(`${API_BASE_URL}/shop/${shopId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch shop");
  }

  const json = await response.json();

  return json.data.shop; // VERY IMPORTANT
}
