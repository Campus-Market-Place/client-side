import { apiFetch } from "./clientApi";

export interface ReportRequestBody {
  reason: string;
}

export async function reportShop(shopId: string, body: ReportRequestBody) {
  return apiFetch(`/report/${shopId}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}