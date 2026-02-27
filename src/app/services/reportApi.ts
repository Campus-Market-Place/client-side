export interface ReportRequestBody {
    reason: string;
  }
  
  const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL;
  const TOKEN = (import.meta as any).env.VITE_USER_TOKEN;
  
  export async function reportShop(shopId: string, body: ReportRequestBody) {
    try {
      const response = await fetch(`${API_BASE_URL}/report/${shopId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`, // if your API requires auth
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to report shop");
      }
  
      return await response.json();
    } catch (error: any) {
      console.error("Error reporting shop:", error);
      throw new Error(error.message || "Failed to report shop");
    }
  }
  