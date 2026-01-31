import { useState } from "react";
import { ArrowLeft, Bookmark, ExternalLink, Star } from "lucide-react";
import { products, reviews, shops } from "../data/mockData";
import { StarRating } from "../components/StarRating";
import { ReviewCard } from "../components/ReviewCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAppContext } from "../contexts/AppContext";
import React from "react";

interface ProductDetailPageProps {
  productId: string;
  onBack: () => void;
  onViewShop: (shopId: string) => void;
  onWriteReview: (productId: string) => void;
}

export function ProductDetailPage({
  productId,
  onBack,
  onViewShop,
  onWriteReview,
}: ProductDetailPageProps) {
  const { isSaved, toggleSavedProduct, isFollowing, toggleFollowShop } = useAppContext();

  const product = products.find((p) => p.id === productId);
  const shop = shops.find((s) => s.id === product?.shopId);
  const productReviews = reviews.filter((r) => r.productId === productId);

  if (!product || !shop) return null;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleContactSeller = () => {
    window.open(shop.telegramLink, "_blank");
  };

  const handleSaveProduct = () => {
    toggleSavedProduct(productId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleSaveProduct}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <Bookmark
              className={`w-5 h-5 ${isSaved(productId) ? "fill-blue-600 text-blue-600" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Product Images Carousel */}
      <div className="bg-white">
        <Slider {...sliderSettings}>
          {[product.image, product.image, product.image].map((img, index) => (
            <div key={index} className="aspect-square bg-gray-100">
              <ImageWithFallback
                src={img}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Product Info */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-start justify-between mb-2">
          <h1 className="flex-1">{product.name}</h1>
          <p className="text-xl text-blue-600">${product.price}</p>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
      </div>

      {/* Shop Section */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1">
            <h3 className="mb-1">{shop.name}</h3>
            <p className="text-sm text-gray-500">{shop.followers} followers</p>
          </div>
          <button
            onClick={() => toggleFollowShop(shop.id)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              isFollowing(shop.id)
                ? "bg-gray-100 text-gray-700"
                : "bg-blue-600 text-white"
            }`}
          >
            {isFollowing(shop.id) ? "Following" : "Follow"}
          </button>
        </div>
        <button
          onClick={() => onViewShop(shop.id)}
          className="w-full bg-gray-100 rounded-lg px-4 py-2 text-sm hover:bg-gray-200 transition-colors"
        >
          View Shop
        </button>
      </div>

      {/* Reviews Section */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3>Reviews ({productReviews.length})</h3>
          <button
            onClick={() => onWriteReview(productId)}
            className="text-sm text-blue-600 hover:underline"
          >
            Write Review
          </button>
        </div>

        {productReviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Star className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No reviews yet</p>
            <p className="text-xs mt-1">Be the first to review!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {productReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <button
          onClick={handleContactSeller}
          className="w-full bg-blue-600 text-white rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
          Contact Seller
        </button>
      </div>
    </div>
  );
}