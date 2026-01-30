import { ReactNode } from "react";

interface EmptyStateProps {
  icon: string | ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-6xl mb-4">
        {typeof icon === "string" ? icon : icon}
      </div>
      <h3 className="mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-xs">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}