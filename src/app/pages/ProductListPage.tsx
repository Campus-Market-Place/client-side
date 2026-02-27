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

import { Category } from "../data/mockData";
import { ProductCardProduct } from "../../types/api";
import React from "react";

export function ProductListPage() {

  const { categoryId } = useParams<{ categoryId: string }>();

  const [category, setCategory] = useState<Category | null>(null);

  const [allProducts, setAllProducts] = useState<ProductCardProduct[]>([]);
  //const [allProducts, setAllProducts] = useState<ProductCardProduct[]>([]);

  const [sortBy, setSortBy] = useState<
    "newest" | "price-low" | "price-high"
  >("newest");


  // fetch products
  const fetchProducts = async () => {

    if (!categoryId) return;

    try {

      const res = await getProductsByCategory(categoryId);
      console.log("FULL API RESPONSE:", res);
console.log("PRODUCTS:", res.data.products);

      // IMPORTANT: your API returns data.products
      const products = res.data.products;

      const mapped: ProductCardProduct[] = products.map((p: any) => {
        console.log("Mapping product:", p); // debug each product
        return {
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.images?.[0]?.imagePath || "",
          shopName: "Shop", // backend did not send shopName
          rating: Number(p.ratingAverage ?? 0),       // mapped correctly
          ratingCount: Number(p.ratingCount ?? 0),   // mapped correctly
          shopId: p.shopId,
          description: "",
        };
      });

      setAllProducts(mapped);

    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };


  // fetch category + products
  useEffect(() => {

    if (!categoryId) return;

    getCategoryById(categoryId).then(setCategory);

    fetchProducts();

  }, [categoryId]);


  // sort
  const sortedProducts = [...allProducts].sort((a, b) => {

    if (sortBy === "price-low")
      return a.price - b.price;

    if (sortBy === "price-high")
      return b.price - a.price;

    return 0;
  });


  if (!category)
    return <div className="p-4">Loading...</div>;


  return (
    <div className="min-h-screen bg-gray-50">

      <Header title={`${category.icon} ${category.name}`} />


      <div className="sticky top-[73px] z-10 px-4 py-3 bg-white border-b">

        <div className="flex justify-between">

          <span>
            {sortedProducts.length} products
          </span>


          <DropdownMenu>

            <DropdownMenuTrigger asChild>

              <Button variant="outline" size="sm">

                <SlidersHorizontal size={16} />

                Sort

              </Button>

            </DropdownMenuTrigger>


            <DropdownMenuContent align="end">

              <DropdownMenuItem
                onClick={() => setSortBy("newest")}
              >
                Newest First
              </DropdownMenuItem>


              <DropdownMenuItem
                onClick={() => setSortBy("price-low")}
              >
                Price Low → High
              </DropdownMenuItem>


              <DropdownMenuItem
                onClick={() => setSortBy("price-high")}
              >
                Price High → Low
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>

        </div>

      </div>


      <main className="p-4">

        {sortedProducts.length > 0 ? (

          <div className="grid grid-cols-2 gap-3">

            {sortedProducts.map(product => (

              <ProductCard
                key={product.id}
                product={product}
                onClick={() =>
                  console.log(product.id)
                }
              />

            ))}

          </div>

        ) : (

          <div className="text-center py-10">
            No products
          </div>

        )}

      </main>

    </div>
  );
}