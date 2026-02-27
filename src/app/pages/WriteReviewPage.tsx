import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { StarRating } from "../components/StarRating";
import { submitReview } from "../services/reviewApi";
import { ReviewRequestBody } from "../../types/api";

interface WriteReviewPageProps {
  productId: string;
  shopId: string; // required to call API
  productName?: string; // ✅ now optional
  onBack: () => void;
}

export function WriteReviewPage({ productId, shopId, productName, onBack }: WriteReviewPageProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return alert("Please select a rating");

    setIsSubmitting(true);
    const body: ReviewRequestBody = { rating, comment };

    try {
      await submitReview(shopId, productId, body);
      alert("Review submitted! Thank you for your feedback.");
      onBack();
    } catch (err: any) {
      alert(`Failed to submit review: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg">Write a Review</h1>
      </div>

      {/* Product Info */}
      <div className="bg-white p-4 border-b border-gray-200">
        <p className="text-sm text-gray-500 mb-1">Reviewing</p>
        <h3>{productName}</h3>
      </div>

      {/* Review Form */}
      <div className="bg-white mt-2 p-4">
        <div className="mb-6">
          <label className="block mb-3 text-sm">Your Rating *</label>
          <div className="flex justify-center">
            <StarRating rating={rating} interactive onRatingChange={setRating} size={23} />
          </div>
          {rating > 0 && (
            <p className="text-center mt-2 text-sm text-gray-600">
              {["Poor", "Below Average", "Average", "Good", "Excellent"][rating - 1]}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm">
            Your Review <span className="text-gray-500 ml-1">(optional)</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 300))}
            placeholder="Share your experience with this product..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={300}
          />
          <p className="text-xs text-gray-500 mt-1 text-right">{comment.length}/300</p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || rating === 0}
          className="w-full bg-blue-600 text-white rounded-lg py-3 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>

        <p className="text-xs text-gray-500 text-center mt-3">
          Your review will be visible to all users
        </p>
      </div>
    </div>
  );
}
