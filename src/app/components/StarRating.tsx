import { Star } from "lucide-react";
import React from "react";

interface StarRatingProps {
  rating: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  size?: number | "sm" | "md" | "lg"; // allow string sizes
  maxRating?: number;
}

export function StarRating({
  rating,
  interactive = false,
  onRatingChange,
  size = "md",
  maxRating = 5,
}: StarRatingProps) {
  // Map string sizes to actual pixel values
  const pixelSize =
    typeof size === "number"
      ? size
      : size === "sm"
      ? 16
      : size === "md"
      ? 20
      : 24; // lg

  const handleClick = (index: number) => {
    if (!interactive || !onRatingChange) return;
    onRatingChange(index + 1);
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          size={pixelSize}
          className={index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}