import { Bookmark } from "lucide-react";
import { CategoryCard } from "../components/CategoryCard";
import { SearchBar } from "../components/SearchBar";
import { useAppContext } from "../contexts/AppContext";
import React, { useEffect, useState } from "react";
import { getCategories } from "../services/categoriesApi";
import { Category } from "../../types/api";

interface HomePageProps {
  onCategorySelect: (categoryId: string) => void;
  onSearch: (query: string) => void;
  onViewSaved: () => void;
}

export function HomePage({ onCategorySelect, onSearch, onViewSaved }: HomePageProps) {
  const { savedProducts } = useAppContext();

  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    if (query.trim()) onSearch(query);
  };

  // Auto-fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCategories();
        setCategoriesList(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch categories. Please reload the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();

    // Optional: auto-refresh every 60 seconds
    const interval = setInterval(fetchCategories, 60000); // 1 minute
    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h1>Campus Marketplace</h1>

            {/* Bookmark badge */}
            <button
              onClick={onViewSaved}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Saved products"
            >
              <Bookmark className="w-5 h-5" />
              {savedProducts.size > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {savedProducts.size}
                </span>
              )}
            </button>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="p-4">
        <h2 className="mb-4">Browse by Category</h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-10">{error}</div>
        ) : categoriesList.length === 0 ? (
          <div className="text-center py-10">No categories found.</div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {categoriesList.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => onCategorySelect(category.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="px-4 pb-6 text-center text-sm text-gray-500">
        <p>🎓 Buy and sell with fellow students</p>
        <p className="mt-2">Contact sellers directly via Telegram</p>
      </div>
    </div>
  );
}