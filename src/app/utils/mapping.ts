// File: src/app/services/Utils.ts
// --- a/file:///d%3A/personal-projects/project-1/src/app/services/Utils.ts

import { ProductCardProduct } from "../../types/api";


// +++ b/file:///d%3A/personal-projects/project-1/src/app/services/Utils.ts
// File: src/app/services/Utils.ts


/**
 * Map backend API Product array to frontend ProductCardProduct array
 */
export function mapBackendProductToCardProducts(backendProducts: any[]): ProductCardProduct[] {
  return backendProducts.map((p: any): ProductCardProduct => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.images?.[0]?.imagePath || "",      // first image or empty
    shopId: p.shop?.id || "",                    // use shop id from API
    shopName: p.shop?.shopName || "Unknown",    // fallback if missing
    description: p.description || "",           // optional description
    rating: p.ratingAverage || 0,               // map ratingAverage → rating
    ratingAverage: p.ratingAverage || 0,        // keep for StarRating component
    reviewCount: p.ratingCount || 0,            // number of reviews
  }));
}