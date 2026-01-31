import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
//import { getProductsByCategory, getCategoryById } from '../data/mockData';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import React from 'react';
import { getCategoryById } from '../services/categoriesApi';
import { Category, Product } from '../data/mockData';




export function ProductListPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');
  
  const [category, setCategory] = useState<Category | null>(null);  // State to hold category details
  const [allProducts, setAllProducts] = useState<Product[]>([]);  //state to hold products in the category

  

  const sortedProducts = [...allProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // newest - would use date if we had it
  });

  if (!category) {
    return <div className="p-4">Category not found</div>;
  }

  

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={`${category.icon} ${category.name}`} />

      <div className="sticky top-[73px] z-10 px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{sortedProducts.length} products</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal size={16} />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy('newest')}>
                Newest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('price-low')}>
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('price-high')}>
                Price: High to Low
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <main className="p-4">
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onClick={() => console.log(`Product clicked: ${product.id}`)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No products yet</p>
            <p className="text-sm mt-2">Check back soon!</p>
          </div>
        )}
      </main>
    </div>
  );
}
