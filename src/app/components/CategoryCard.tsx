import React from "react";
import { Category } from "../data/mockData";

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:scale-105 flex flex-col items-center gap-3 w-full"
    >
      <div className="text-4xl">{category.icon}</div>
      <p className="text-center">{category.name}</p>
    </button>
  );
}
