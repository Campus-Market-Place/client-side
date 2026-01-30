import { ArrowLeft, Bookmark } from "lucide-react";
import { products } from "../data/mockData";
import { ProductCard } from "../components/ProductCard";
import { EmptyState } from "../components/EmptyState";
import { useAppContext } from "../contexts/AppContext";

interface SavedProductsPageProps {
  onBack: () => void;
  onProductSelect: (productId: string) => void;
}

export function SavedProductsPage({
  onBack,
  onProductSelect,
}: SavedProductsPageProps) {
  const { savedProducts } = useAppContext();

  const savedProductsList = products.filter((p) => savedProducts.has(p.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg">Saved Products</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {savedProductsList.length === 0 ? (
          <EmptyState
            icon={<Bookmark className="w-12 h-12 text-gray-300" />}
            title="No saved products"
            description="Products you bookmark will appear here for easy access"
          />
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              {savedProductsList.length} {savedProductsList.length === 1 ? "item" : "items"} saved
            </p>
            <div className="grid grid-cols-2 gap-3">
              {savedProductsList.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => onProductSelect(product.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
