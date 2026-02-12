const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL;

export async function getProductsByCategory(
  categoryId: string,
  page: number = 1,
  limit: number = 20
) {
  const response = await fetch(
    `${API_BASE_URL}/products/${categoryId}?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  console.log("Products API response:", data);
  return data.data.products; 
}

// Get product details by ID
export async function getProductDetails(productId: string) {
  const response = await fetch(
    `${API_BASE_URL}/products/details/${productId}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch product details");
  }

  return result.data.product; // 🔥 THIS IS THE IMPORTANT PART
}

