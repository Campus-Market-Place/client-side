import { ReviewRequestBody } from "../../types/api";


  const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL;
  const TOKEN = (import.meta as any).env.VITE_USER_TOKEN;
  
  /**
   * Submit a review for a specific product in a shop
   */
  export async function submitReview(
    shopId: string,
    productId: string,
    body: ReviewRequestBody
  ) {
    const url = `${API_BASE_URL}/review/${shopId}/${productId}`;
  
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(body),
    });
  
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Failed to submit review");
    }
  
    return res.json(); // return API response
  }
  

 /* export async function getReviewsByProduct(productId: string) {
    const url = `${API_BASE_URL}/review/${productId}?page=1&limit=10`;
  
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch reviews");
    }
  
    const data = await res.json();
  
    return data.data || data; // adjust depending on your API response
  }*/

    export async function getReviewsByProduct(productId: string) {
      const url = `${API_BASE_URL}/review/${productId}`;
    
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`, // ✅ REQUIRED
        },
      });
    
      if (!response.ok) {
        console.error("Response status:", response.status);
        throw new Error("Failed to fetch reviews");
      }
    
      const data = await response.json();
    
      console.log("Reviews API full response:", data);
    
      return data.data.reviews;
    }