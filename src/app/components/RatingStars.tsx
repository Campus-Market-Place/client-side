import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showNumber?: boolean;
}

export function RatingStars({ rating, maxRating = 5, size = 16, showNumber = false }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          size={size}
          className={index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ))}
      {showNumber && <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>}
    </div>
  );
}
