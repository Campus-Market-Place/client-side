import React, { useState, useEffect } from "react";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
//import { Product } from "../types"; // your type definitions
import { ProductCard } from "../components/ProductCard";
import { EmptyState } from "../components/EmptyState";
import { getProductsByCategory } from "../services/productsApi";
import { Product, ProductCardProduct } from "../../types/api";

interface CategoryProductsPageProps {
  categoryId: string;
  onBack: () => void;
  onProductSelect: (productId: string) => void;
}

export function CategoryProductsPage({
  categoryId,
  onBack,
  onProductSelect,
}: CategoryProductsPageProps) {
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [productsList, setProductsList] = useState<ProductCardProduct[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  // Fetch products for this category
 
  useEffect(() => {
    getProductsByCategory(categoryId)
      .then((data: any[]) => {
        const mapped: ProductCardProduct[] = data.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.images?.[0]?.imagePath || "",
          shopId: p.shop?.id || p.shopId || "",
          shopName: p.shop?.shopName || "Unknown",
          description: p.description || "",
          rating: p.ratingAverage || 0,       // for display in ProductCard
          reviewCount: p.reviewCount || 0,
          ratingAverage: p.ratingAverage || 0, // ⚠ include this to satisfy type
        }));
        setProductsList(mapped);
  
        if (data[0]?.category?.name) setCategoryName(data[0].category.name);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [categoryId]);
  // Sorting
  const sortedProducts = [...productsList].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0; // newest or default
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg">{categoryName || "Category"}</h1>
              <p className="text-sm text-gray-500">{sortedProducts.length} products</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm flex-1"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        {sortedProducts.length === 0 ? (
          <EmptyState
            icon="📭"
            title="No products yet"
            description="Check back later for new listings from sellers"
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onProductSelect(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}