import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { products } from "../data/mockData";
import { StarRating } from "../components/StarRating";

interface WriteReviewPageProps {
  productId: string;
  onBack: () => void;
}

export function WriteReviewPage({ productId, onBack }: WriteReviewPageProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const product = products.find((p) => p.id === productId);

  if (!product) return null;

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Review submitted! Thank you for your feedback.");
    setIsSubmitting(false);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg">Write a Review</h1>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white p-4 border-b border-gray-200">
        <p className="text-sm text-gray-500 mb-1">Reviewing</p>
        <h3>{product.name}</h3>
      </div>

      {/* Review Form */}
      <div className="bg-white mt-2 p-4">
        <div className="mb-6">
          <label className="block mb-3 text-sm">Your Rating *</label>
          <div className="flex justify-center">
            <StarRating
              rating={rating}
              interactive
              onRatingChange={setRating}
              size="lg"
            />
          </div>
          {rating > 0 && (
            <p className="text-center mt-2 text-sm text-gray-600">
              {rating === 5 && "Excellent!"}
              {rating === 4 && "Good"}
              {rating === 3 && "Average"}
              {rating === 2 && "Below Average"}
              {rating === 1 && "Poor"}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm">
            Your Review
            <span className="text-gray-500 ml-1">(optional)</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 300))}
            placeholder="Share your experience with this product..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={300}
          />
          <p className="text-xs text-gray-500 mt-1 text-right">
            {comment.length}/300
          </p>
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
