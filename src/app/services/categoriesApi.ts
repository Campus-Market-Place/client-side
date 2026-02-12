const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL;

export async function getCategories() {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");

  const result = await response.json();
  return result.data.categories; 
}

export async function getCategoryById(id: string) {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`);
  if (!response.ok) throw new Error("Failed to fetch category");

  const result = await response.json();
  return result.data.categories; // unwrap the array correctly
}
