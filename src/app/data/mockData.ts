export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  shopId: string;
  shopName: string;
  categoryId: string;
  description: string;
  rating: number;
  reviewCount: number;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  followers: number;
  telegramLink: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
  };
  createdDate: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const categories: Category[] = [
  { id: "1", name: "Jewelry", icon: "💎" },
  { id: "2", name: "Clothes", icon: "👕" },
  { id: "3", name: "Electronics", icon: "📱" },
  { id: "4", name: "Books", icon: "📚" },
  { id: "5", name: "Accessories", icon: "⌚" },
  { id: "6", name: "Shoes", icon: "👟" },
];

export const shops: Shop[] = [
  {
    id: "1",
    name: "Sparkle Gems",
    description: "Premium handcrafted jewelry for every occasion",
    followers: 1234,
    telegramLink: "https://t.me/sparklegems",
    socialMedia: {
      instagram: "sparklegems_official",
    },
    createdDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Campus Fashion",
    description: "Trendy clothes for students",
    followers: 892,
    telegramLink: "https://t.me/campusfashion",
    socialMedia: {
      instagram: "campus_fashion",
      facebook: "campusfashion",
    },
    createdDate: "2023-03-20",
  },
  {
    id: "3",
    name: "Tech Hub",
    description: "Latest electronics and gadgets",
    followers: 2156,
    telegramLink: "https://t.me/techhub",
    socialMedia: {
      instagram: "techhub_store",
    },
    createdDate: "2022-11-10",
  },
  {
    id: "4",
    name: "BookWorm",
    description: "New and used textbooks, novels, and more",
    followers: 567,
    telegramLink: "https://t.me/bookworm",
    socialMedia: {},
    createdDate: "2023-06-05",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Silver Stud Earrings",
    price: 25,
    image: "https://images.unsplash.com/photo-1656109801168-699967cf3ba9?w=400",
    shopId: "1",
    shopName: "Sparkle Gems",
    categoryId: "1",
    description: "Elegant silver stud earrings perfect for daily wear. Made with 925 sterling silver.",
    rating: 4.5,
    reviewCount: 23,
  },
  {
    id: "2",
    name: "Gold Chain Necklace",
    price: 45,
    image: "https://images.unsplash.com/photo-1656109801168-699967cf3ba9?w=400",
    shopId: "1",
    shopName: "Sparkle Gems",
    categoryId: "1",
    description: "Beautiful gold-plated chain necklace. Hypoallergenic and durable.",
    rating: 4.8,
    reviewCount: 34,
  },
  {
    id: "3",
    name: "Vintage T-Shirt",
    price: 18,
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=400",
    shopId: "2",
    shopName: "Campus Fashion",
    categoryId: "2",
    description: "Comfortable vintage-style t-shirt. 100% cotton, available in multiple colors.",
    rating: 4.3,
    reviewCount: 12,
  },
  {
    id: "4",
    name: "Denim Jacket",
    price: 55,
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=400",
    shopId: "2",
    shopName: "Campus Fashion",
    categoryId: "2",
    description: "Classic denim jacket perfect for campus style. Size S-XL available.",
    rating: 4.6,
    reviewCount: 28,
  },
  {
    id: "5",
    name: "Wireless Headphones",
    price: 89,
    image: "https://images.unsplash.com/photo-1583373351761-fa9e3a19c99d?w=400",
    shopId: "3",
    shopName: "Tech Hub",
    categoryId: "3",
    description: "Premium wireless headphones with noise cancellation. 30-hour battery life.",
    rating: 4.7,
    reviewCount: 45,
  },
  {
    id: "6",
    name: "Bluetooth Speaker",
    price: 42,
    image: "https://images.unsplash.com/photo-1583373351761-fa9e3a19c99d?w=400",
    shopId: "3",
    shopName: "Tech Hub",
    categoryId: "3",
    description: "Portable bluetooth speaker with amazing sound quality. Waterproof design.",
    rating: 4.4,
    reviewCount: 19,
  },
  {
    id: "7",
    name: "Psychology Textbook",
    price: 35,
    image: "https://images.unsplash.com/photo-1630715216350-1a8f46f021bf?w=400",
    shopId: "4",
    shopName: "BookWorm",
    categoryId: "4",
    description: "Introduction to Psychology, 12th Edition. Like new condition.",
    rating: 4.2,
    reviewCount: 8,
  },
  {
    id: "8",
    name: "Calculus Study Guide",
    price: 22,
    image: "https://images.unsplash.com/photo-1630715216350-1a8f46f021bf?w=400",
    shopId: "4",
    shopName: "BookWorm",
    categoryId: "4",
    description: "Comprehensive calculus study guide with practice problems and solutions.",
    rating: 4.5,
    reviewCount: 15,
  },
  {
    id: "9",
    name: "Smart Watch",
    price: 120,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
    shopId: "3",
    shopName: "Tech Hub",
    categoryId: "5",
    description: "Fitness tracking smart watch with heart rate monitor and GPS.",
    rating: 4.6,
    reviewCount: 31,
  },
  {
    id: "10",
    name: "Running Shoes",
    price: 75,
    image: "https://images.unsplash.com/photo-1656944227480-98180d2a5155?w=400",
    shopId: "2",
    shopName: "Campus Fashion",
    categoryId: "6",
    description: "Lightweight running shoes with excellent cushioning. Perfect for athletes.",
    rating: 4.7,
    reviewCount: 22,
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    productId: "1",
    userName: "Sarah M.",
    rating: 5,
    comment: "Beautiful earrings! Exactly as described and arrived quickly.",
    date: "2024-12-10",
  },
  {
    id: "2",
    productId: "1",
    userName: "Mike T.",
    rating: 4,
    comment: "Great quality, my girlfriend loves them!",
    date: "2024-12-08",
  },
  {
    id: "3",
    productId: "5",
    userName: "Alex K.",
    rating: 5,
    comment: "Amazing sound quality! Battery lasts forever. Highly recommend!",
    date: "2024-12-12",
  },
  {
    id: "4",
    productId: "5",
    userName: "Jordan P.",
    rating: 4,
    comment: "Good headphones, noise cancellation works well. A bit pricey but worth it.",
    date: "2024-12-09",
  },
  {
    id: "5",
    productId: "3",
    userName: "Emma L.",
    rating: 4,
    comment: "Comfortable and fits well. Color is exactly as shown in photos.",
    date: "2024-12-11",
  },
];
