import { useState } from "react";
import { ArrowLeft, ExternalLink, Instagram, Facebook, Calendar, Users, Flag } from "lucide-react";
import { shops, products } from "../data/mockData";
import { ProductCard } from "../components/ProductCard";
import { EmptyState } from "../components/EmptyState";
import { ReportShopModal } from "../components/ReportShopModal";
import { useAppContext } from "../contexts/AppContext";

interface ShopDetailPageProps {
  shopId: string;
  onBack: () => void;
  onProductSelect: (productId: string) => void;
}

export function ShopDetailPage({
  shopId,
  onBack,
  onProductSelect,
}: ShopDetailPageProps) {
  const { isFollowing, toggleFollowShop } = useAppContext();
  const [showReportModal, setShowReportModal] = useState(false);

  const shop = shops.find((s) => s.id === shopId);
  const shopProducts = products.filter((p) => p.shopId === shopId);

  if (!shop) return null;

  const handleContactShop = () => {
    window.open(shop.telegramLink, "_blank");
  };

  const handleReportSubmit = (reason: string, details: string) => {
    // In a real app, this would send the report to your backend
    console.log("Report submitted:", { shopId, reason, details });
    alert("Thank you for your report. Our team will review it shortly.");
    setShowReportModal(false);
  };

  const yearsActive = new Date().getFullYear() - new Date(shop.createdDate).getFullYear();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg">Shop Details</h1>
            </div>
            <button
              onClick={() => setShowReportModal(true)}
              className="p-1 hover:bg-gray-100 rounded-lg"
              title="Report shop"
            >
              <Flag className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Shop Info */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h2 className="mb-2">{shop.name}</h2>
            <p className="text-sm text-gray-700 mb-3">{shop.description}</p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{shop.followers} followers</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {yearsActive > 0 ? `${yearsActive}+ years` : "New shop"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        {(shop.socialMedia.instagram || shop.socialMedia.facebook) && (
          <div className="flex gap-2 mb-4">
            {shop.socialMedia.instagram && (
              <a
                href={`https://instagram.com/${shop.socialMedia.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition-colors"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
            )}
            {shop.socialMedia.facebook && (
              <a
                href={`https://facebook.com/${shop.socialMedia.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition-colors"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => toggleFollowShop(shopId)}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              isFollowing(shopId)
                ? "bg-gray-100 text-gray-700"
                : "bg-blue-600 text-white"
            }`}
          >
            {isFollowing(shopId) ? "Following" : "Follow Shop"}
          </button>
          <button
            onClick={handleContactShop}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Shop Products */}
      <div className="p-4">
        <h3 className="mb-4">Products ({shopProducts.length})</h3>

        {shopProducts.length === 0 ? (
          <EmptyState
            icon="📭"
            title="No products yet"
            description="This shop hasn't listed any products"
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {shopProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onProductSelect(product.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <ReportShopModal
          shopName={shop.name}
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReportSubmit}
        />
      )}
    </div>
  );
}