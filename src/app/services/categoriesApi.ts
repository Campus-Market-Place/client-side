import { apiFetch } from "./clientApi";

export async function getCategories() {
  const result = await apiFetch("/categories");
  return result.data.categories;
}

export async function getCategoryById(id: string) {
  const result = await apiFetch(`/categories/${id}`);
  return result.data.categories;
}