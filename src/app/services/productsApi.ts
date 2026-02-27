import { apiFetch } from "./clientApi";

export async function getProductsByCategory(categoryId: string, page = 1, limit = 20) {
  const result = await apiFetch(`/products/${categoryId}?page=${page}&limit=${limit}`);
  return result.data.products;
}

export async function getProductDetails(productId: string) {
  const result = await apiFetch(`/products/details/${productId}`);
  return result.data.product;
}