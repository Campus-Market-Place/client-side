// File: src/app/services/Utils.ts
// --- a/file:///d%3A/personal-projects/project-1/src/app/services/Utils.ts

import { Product } from "../data/mockData";

// +++ b/file:///d%3A/personal-projects/project-1/src/app/services/Utils.ts
export function mapBackendProductToFrontend(backendProducts: any[]): Product[] {
  return backendProducts.map((p: any): Product => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.images?.[0]?.imagePath || "",
      rating: p.ratingAverage || 0,
      shopId: "",
      shopName: "",
      categoryId: "",
      description: "",
      reviewCount: 0
  }));
}  