import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AppContextType {
  savedProducts: Set<string>;
  followedShops: Set<string>;
  toggleSavedProduct: (productId: string) => void;
  toggleFollowShop: (shopId: string) => void;
  isSaved: (productId: string) => boolean;
  isFollowing: (shopId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [savedProducts, setSavedProducts] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("savedProducts");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [followedShops, setFollowedShops] = useState<Set<string>>(() => {
    const followed = localStorage.getItem("followedShops");
    return followed ? new Set(JSON.parse(followed)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem("savedProducts", JSON.stringify(Array.from(savedProducts)));
  }, [savedProducts]);

  useEffect(() => {
    localStorage.setItem("followedShops", JSON.stringify(Array.from(followedShops)));
  }, [followedShops]);

  const toggleSavedProduct = (productId: string) => {
    setSavedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const toggleFollowShop = (shopId: string) => {
    setFollowedShops((prev) => {
      const next = new Set(prev);
      if (next.has(shopId)) {
        next.delete(shopId);
      } else {
        next.add(shopId);
      }
      return next;
    });
  };

  const isSaved = (productId: string) => savedProducts.has(productId);
  const isFollowing = (shopId: string) => followedShops.has(shopId);

  return (
    <AppContext.Provider
      value={{
        savedProducts,
        followedShops,
        toggleSavedProduct,
        toggleFollowShop,
        isSaved,
        isFollowing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
