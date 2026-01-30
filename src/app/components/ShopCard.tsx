import { Link } from 'react-router-dom';
import { Users, Calendar } from 'lucide-react';
import type { Shop } from '../data/mockData';

interface ShopCardProps {
  shop: Shop;
}

export function ShopCard({ shop }: ShopCardProps) {
  const memberSince = new Date(shop.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <Link
      to={`/shop/${shop.id}`}
      className="flex flex-col p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      <h3 className="mb-2">{shop.name}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{shop.description}</p>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Users size={16} />
          <span>{shop.followers}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>{memberSince}</span>
        </div>
      </div>
    </Link>
  );
}
