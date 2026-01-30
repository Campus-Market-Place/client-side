// src/app/services/categoriesApi.ts
import { categories } from "../data/mockData";

// simulate network delay
function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// "GET /api/categories"
export async function getCategories() {
  await wait(300); // simulate 300ms network delay
  return categories; // categories imported from mockData
}