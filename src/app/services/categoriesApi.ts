  // src/app/services/categoriesApi.ts
import { categories } from "../data/mockData";

// simulate network delay
const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

// Get all categories
export const getCategories = async () => {
  await wait(200);
  return categories;
};

// Get category by ID
export const getCategoryById = async (id: string) => {
  await wait(200);
  return categories.find(c => c.id === id);
};





//export async function getCategories() {
  //  const response = await fetch(`${API_BASE_URL}/categories`);
   // return response.json();
  //}
