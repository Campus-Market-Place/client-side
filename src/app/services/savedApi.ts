// src/app/services/savedApi.ts

// simulate network delay
function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  // POST /api/saveProduct
  export async function saveProduct(productId: string) {
    await wait(200);
    console.log("API: saved product", productId);
    return { success: true };
  }
  
  // DELETE /api/unsaveProduct
  export async function unsaveProduct(productId: string) {
    await wait(200);
    console.log("API: unsaved product", productId);
    return { success: true };
  }