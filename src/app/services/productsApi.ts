// src/app/services/productsApi.ts
import { products, Product } from "../data/mockData";

// simulate network delay
function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// "GET /api/products" or "GET /api/products?categoryId=<id>"
export async function getProducts(categoryId?: string): Promise<Product[]> {
  await wait(300); // simulate network delay
  if (categoryId) {
    return products.filter(product => product.categoryId === categoryId);
  }
  return products;
}