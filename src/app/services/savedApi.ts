import { apiFetch } from "./clientApi";

export async function saveProduct(productId: string, shopId: string) {
  return apiFetch("/save_product/", {
    method: "POST",
    body: JSON.stringify({ productId, shopId }),
  });
}

export async function unsaveProduct(productId: string, shopId: string) {
  return apiFetch("/save_product/", {
    method: "DELETE",
    body: JSON.stringify({ productId, shopId }),
  });
}

export async function getSavedProducts() {
  const result = await apiFetch("/save_product/");
  return result;
}