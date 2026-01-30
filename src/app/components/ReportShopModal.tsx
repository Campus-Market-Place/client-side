import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";

interface ReportShopModalProps {
  shopName: string;
  onClose: () => void;
  onSubmit: (reason: string, details: string) => void;
}

const REPORT_REASONS = [
  "Fake or misleading products",
  "Scam or fraud",
  "Inappropriate content",
  "Not responding to messages",
  "Counterfeit items",
  "Harassment or abuse",
  "Other",
];

export function ReportShopModal({
  shopName,
  onClose,
  onSubmit,
}: ReportShopModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedReason) {
      alert("Please select a reason for reporting");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(selectedReason, details);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h2 className="text-lg">Report Shop</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-sm text-gray-600 mb-4">
            You are reporting <span className="font-medium">{shopName}</span>
          </p>

          {/* Reason Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Reason for report *
            </label>
            <div className="space-y-2">
              {REPORT_REASONS.map((reason) => (
                <label
                  key={reason}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">{reason}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Additional details (optional)
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide any additional information that might help us investigate..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              rows={4}
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-800">
              Reports are reviewed by our moderation team. False reports may result in
              action against your account.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedReason || isSubmitting}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
