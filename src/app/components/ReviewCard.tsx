import React from "react";
import { StarRating } from "./StarRating";

interface Review {
  rating: number;
  comment: string;
  createdAt: string;
  user: { username: string };
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm mb-1">{review.user?.username || "Anonymous"}</p>
          <StarRating rating={review.rating} size="sm" />
        </div>
        <p className="text-xs text-gray-500">
          {review.createdAt
            ? new Date(review.createdAt).toLocaleDateString()
            : "Unknown date"}
        </p>
      </div>
      <p className="text-sm text-gray-700">{review.comment}</p>
    </div>
  );
}