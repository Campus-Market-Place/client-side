import { apiFetch } from "./clientApi";

export interface ToggleFollowResponse {
  success: boolean;
  isFollowed: boolean;
  followersCount?: number;
  message?: string;
}

export async function toggleFollowShopApi(shopId: string) {
  const result = await apiFetch(`/follow/${shopId}`, { method: "POST" });
  return result as ToggleFollowResponse;
}

export async function getShopFollowers(shopId: string) {
  const result = await apiFetch(`/follow/${shopId}`);
  return result;
}