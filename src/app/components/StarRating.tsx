import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}

export function StarRating({
  rating,
  totalStars = 5,
  interactive = false,
  onRatingChange,
  size = "md",
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: totalStars }).map((_, index) => {
        const isFilled = index < Math.floor(rating);
        const isHalf = index < rating && index >= Math.floor(rating);

        if (interactive) {
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="cursor-pointer hover:scale-110 transition-transform"
              type="button"
            >
              <Star
                className={`${sizeClasses[size]} ${
                  isFilled
                    ? "fill-yellow-400 text-yellow-400"
                    : isHalf
                      ? "fill-yellow-200 text-yellow-400"
                      : "fill-none text-gray-300"
                }`}
              />
            </button>
          );
        }

        return (
          <span key={index} className="inline-block">
            <Star
              className={`${sizeClasses[size]} ${
                isFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : isHalf
                    ? "fill-yellow-200 text-yellow-400"
                    : "fill-none text-gray-300"
              }`}
            />
          </span>
        );
      })}
    </div>
  );
}