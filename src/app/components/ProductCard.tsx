import { Product } from "../data/mockData";
import { StarRating } from "./StarRating";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onSave?: () => void; 
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow w-full text-left cursor-pointer"
    >
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="line-clamp-1 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.shopName}</p>
        <div className="flex items-center gap-1 mb-2">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>
        <p className="text-blue-600">${product.price}</p>
      </div>
    </div>
  );
}