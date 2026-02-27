import { useEffect, useState } from "react";
import { ArrowLeft, Bookmark, ExternalLink, Star } from "lucide-react";
import { StarRating } from "../components/StarRating";
import { ReviewCard } from "../components/ReviewCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAppContext } from "../contexts/AppContext";
import { getProductDetails } from "../services/productsApi";


import React from "react";
import { saveProduct, unsaveProduct } from "../services/savedApi";
import { getReviewsByProduct } from "../services/reviewApi";


interface ProductDetailPageProps {
  productId: string;
  onBack: () => void;
  onViewShop: (shopId: string) => void;
  //onWriteReview: (productId: string, shopId: string) => void;
  onWriteReview: (productId: string, shopId: string, productName?: string) => void;
  
}

export function ProductDetailPage({
  productId,
  onBack,
  onViewShop,
  onWriteReview,
}: ProductDetailPageProps) {
  const { isSaved, toggleSavedProduct, isFollowing, } =
    useAppContext();

  const [product, setProduct] = useState<any | null>(null);
  const [shop, setShop] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //const [followingShops, setFollowingShops] = useState<string[]>([]);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [saving, setSaving] = useState(false); 
  const [reviews, setReviews] = useState<any[]>([]);

  

  //const currentlyFollowing = shop ? followingShops.includes(shop.id) : false;
  const currentlyFollowing = shop?.isFollowed ?? false;


  useEffect(() => {
    setLoading(true);
  
    Promise.all([
      getProductDetails(productId),
      getReviewsByProduct(productId)
    ])
      .then(([fetchedProduct, fetchedReviews]) => {
  
        console.log("Fetched product:", fetchedProduct);
        console.log("Fetched reviews:", fetchedReviews);
  
        setProduct(fetchedProduct);
        setShop(fetchedProduct.shop);
        setReviews(fetchedReviews); // ✅ important
  
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  
  }, [productId]);
  
  
  if (loading) return <div>Loading product...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product || !shop) return <div>Product not found</div>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleContactSeller = () => {
    if (shop?.seller?.user?.telegramId) {
      window.open(`https://t.me/${shop.seller.user.telegramId}`, "_blank");
    }
  };

  const handleSaveProduct = async () => {
    if (saving) return; // prevent double clicks
    setSaving(true);
  
    try {
      console.log("Toggling save for product:", { productId, shopId: shop.id });
  
      if (isSaved(productId)) {
        // If already saved → call unsave
        console.log("Un-saving product:", { productId, shopId: shop.id });
        await unsaveProduct(productId, shop.id); // <-- call DELETE API
      } else {
        // If not saved → call save
        console.log("Saving product:", { productId, shopId: shop.id });
        await saveProduct(productId, shop.id); // <-- call POST API
      }
  
      // Always toggle local state for UI
      toggleSavedProduct(productId, shop.id);
  
    } catch (err: any) {
      console.error("Failed to toggle save:", err);
      alert(err.message || "Could not toggle save. Try again.");
    } finally {
      setSaving(false);
    }
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
            disabled={saving} // optional: prevent click while loading
          >
            <Bookmark
                className={`w-5 h-5 ${
                  isSaved(productId) ? "fill-blue-600 text-blue-600" : ""
                }`}
              />
          </button>
        </div>
      </div>

      {/* Product Images */}
      <div className="bg-white">
      <Slider {...sliderSettings}>
  {product.images?.map((img: any, index: number) => (
    <div key={index} className="aspect-square bg-gray-100">
      <ImageWithFallback
        src={
          img.imagePath
            ? img.imagePath.startsWith("http")
              ? img.imagePath               // already full URL, use as-is
              : `https://backend-ikou.onrender.com${img.imagePath}` // relative path, prepend backend
            : "/placeholder-image.png"      // fallback
        }
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
          <StarRating rating={product.ratingAverage} />
          <span className="text-sm text-gray-600">
            {product.ratingAverage} ({product.ratingCount} reviews)
          </span>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Shop Section */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1">
            <h3 className="mb-1">{shop.shopName}</h3>
          </div>
        

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
          <h3>Reviews ({product.length})</h3>
          <button
             onClick={() => onWriteReview(productId, shop.id, product.name)}
            className="text-sm text-blue-600 hover:underline"
          >
            Write Review
          </button>
        </div>

        {product.reviews?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Star className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No reviews yet</p>
            <p className="text-xs mt-1">Be the first to review!</p>
          </div>
        ) : (
          <div className="space-y-3">
           {reviews.map((review, index) => (
  <ReviewCard key={review.id || index} review={review} />
))}
          </div>
        )}
      </div>

      {/* Bottom Button */}
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
