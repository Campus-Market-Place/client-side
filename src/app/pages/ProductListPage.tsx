import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import { getCategoryById } from "../services/categoriesApi";
import { getProductsByCategory } from "../services/productsApi";
import { Category, ProductCardProduct } from "../../types/api";
import React from "react";

export function ProductListPage() {
  const { categoryId } = useParams<{ categoryId: string }>();

  const [category, setCategory] = useState<Category | null>(null);
  const [allProducts, setAllProducts] = useState<ProductCardProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">(
    "newest"
  );

  // Fetch products
  const fetchProducts = async () => {
    if (!categoryId) return;

    try {
      setLoading(true);
      setError(null);

      const res = await getProductsByCategory(categoryId);
      console.log("FULL API RESPONSE:", res);
      console.log("PRODUCTS:", res.data.products);

      const products = res.data.products;

      const mapped: ProductCardProduct[] = products.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.images?.[0]?.imagePath || "",
        shopName: p.shop?.shopName || "Shop",
        rating: Number(p.ratingAverage ?? 0),
        ratingCount: Number(p.ratingCount ?? 0),
        shopId: p.shopId,
        description: p.description || "",
      }));

      setAllProducts(mapped);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setError("Failed to fetch products. Please reload the page.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch category + products
  useEffect(() => {
    if (!categoryId) return;

    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const cat = await getCategoryById(categoryId);
        setCategory(cat);

        await fetchProducts();
      } catch (err) {
        console.error(err);
        setError("Failed to fetch category or products.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();

    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchCategoryAndProducts, 60000);
    return () => clearInterval(interval);
  }, [categoryId]);

  // Sorted products
  const sortedProducts = [...allProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  // Loading spinner
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 py-10">
        <p>{error}</p>
      </div>
    );

  if (!category)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={`${category.icon} ${category.name}`} />

      <div className="sticky top-[73px] z-10 px-4 py-3 bg-white border-b">
        <div className="flex justify-between">
          <span>{sortedProducts.length} products</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal size={16} />
                Sort
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("newest")}>
                Newest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("price-low")}>
                Price Low → High
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("price-high")}>
                Price High → Low
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <main className="p-4">
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => console.log(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">No products</div>
        )}
      </main>
    </div>
  );
}