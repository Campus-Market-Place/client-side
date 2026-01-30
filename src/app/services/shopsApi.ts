// src/app/services/shopsApi.ts
import { shops } from "../data/mockData";

const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

// Get all shops
export const getShops = async () => {
  await wait(200); // simulate network delay
  return shops;
};

// Get single shop by ID
export const getShopById = async (id: string) => {
  await wait(200);
  return shops.find(s => s.id === id);
};

// Optional: Get shops by follower count (example of a filter)
export const getShopsByFollowers = async (minFollowers: number) => {
  await wait(200);
  return shops.filter(s => s.followers >= minFollowers);
};