const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL;
const TOKEN = (import.meta as any).env.VITE_USER_TOKEN;

export interface ToggleFollowResponse {
  success: boolean;
  isFollowed: boolean;
  followersCount?: number;
  message?: string;
}

export async function toggleFollowShopApi(
  shopId: string
): Promise<ToggleFollowResponse> {
  const response = await fetch(`${API_BASE_URL}/follow/${shopId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to follow/unfollow shop");
  }

  return result;
}

// Get followers count
export async function getShopFollowers(shopId: string) {
  const response = await fetch(`${API_BASE_URL}/follow/${shopId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch followers");
  }

  return result;
}