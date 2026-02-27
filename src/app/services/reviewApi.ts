import { apiFetch } from "./clientApi";
import { ReviewRequestBody } from "../../types/api";

export async function submitReview(shopId: string, productId: string, body: ReviewRequestBody) {
  return apiFetch(`/review/${shopId}/${productId}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function getReviewsByProduct(productId: string) {
  const result = await apiFetch(`/review/${productId}`);
  return result.data.reviews;
}