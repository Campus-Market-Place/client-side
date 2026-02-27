const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL;
const TOKEN = (import.meta as any).env.VITE_USER_TOKEN;

export async function saveProduct(productId: string, shopId: string) {
  const response = await fetch(`${API_BASE_URL}/save_product/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ productId, shopId }),
  });

  // Read JSON **once**
  const data = await response.json();
  console.log("Save API response:", data);

  // Throw error only if response not ok
  if (!response.ok) {
    throw new Error(data.message || "Failed to save product");
  }

  return data;
}

export async function getSavedProducts() {
  const response = await fetch(`${API_BASE_URL}/save_product/`, {
    headers: {
      "Authorization": `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch saved products");
  }

  return response.json(); // array of saved products
}

export async function unsaveProduct(productId: string, shopId: string) {
  const response = await fetch(`${API_BASE_URL}/save_product/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ productId, shopId }), // include shopId too
  });

  if (!response.ok) {
    throw new Error("Failed to unsave product");
  }

  return response.json();
}
