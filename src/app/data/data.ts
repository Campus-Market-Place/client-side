export interface Shop {
    id: string;
    shopName: string;
    bio: string;
    rating: number;
    isOpen: boolean;
    status: string;
    followersCount: number;
    profileImageUrl: string;
  
    products: Product[];
  
    seller: {
      user: {
        username: string;
        telegramId: string;
      };
      instagram?: string;
      telegram?: string;
      tiktok?: string;
      mainPhone?: string;
      secondaryPhone?: string;
    };
  }

  export interface Product {
    id: string;
    name: string;
    price: number;
    categoryId: string;
    ratingAverage: number;
  
    images: {
      imagePath: string;
    }[];
  }
  