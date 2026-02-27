import { apiFetch } from "./clientApi";

export async function getShopById(shopId: string) {
  const result = await apiFetch(`/shop/${shopId}`);
  return result.data.shop;
}