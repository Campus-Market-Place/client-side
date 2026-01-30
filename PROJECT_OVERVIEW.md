# Campus Marketplace - Telegram Mini App

A mobile-first marketplace platform designed for campus communities where students can browse products, view seller information, and contact sellers directly via Telegram.

## 🎯 Key Features

### User Flow
1. **Home Page** - Browse products by category with search functionality
2. **Category Listings** - View all products in a category with sorting and filters
3. **Product Details** - Full product information with image carousel, ratings, and reviews
4. **Shop Pages** - View shop details, trust indicators, and all shop products
5. **Write Reviews** - Simple star rating and text review system

### Design Philosophy
- **Mobile-First**: Optimized for mobile devices with touch-friendly interactions
- **Telegram-Native**: Clean, minimal design that feels native to Telegram
- **Lightweight**: Fast loading with minimal animations
- **Trust-Focused**: Followers, reviews, and shop age as trust signals
- **No Checkout**: Users contact sellers directly via Telegram

## 📱 Pages Overview

### 1. Home / Category Page
- Grid layout of product categories
- Search bar for quick product discovery
- Clean, simple navigation

### 2. Product Listing Page
- Products from multiple sellers
- Price range and sorting filters
- Infinite scroll support
- Product cards with image, name, price, shop name, and ratings

### 3. Product Detail Page
- Image carousel for multiple product photos
- Price and product description
- Average rating with review count
- Save product functionality (integrates with Telegram bot)
- Shop summary with follow button
- Contact seller button (redirects to Telegram)
- User reviews section

### 4. Shop Detail Page
- Shop name, description, and trust indicators
- Followers count
- Shop age ("2+ years", "New shop")
- Social media links (Instagram, Facebook)
- Follow/unfollow functionality
- All products from the shop
- Contact shop button

### 5. Write Review Page
- Star rating selector (1-5 stars)
- Text input (max 300 characters)
- Submit review functionality
- Distraction-free UI

## 🎨 Design System

### Colors
- Primary: Blue (#3B82F6) for CTAs and interactive elements
- Background: Gray-50 (#F9FAFB) for app background
- White cards with soft shadows
- Neutral grays for text hierarchy

### Typography
- Clean, readable font sizes
- Clear hierarchy (H1, H2, H3)
- Responsive text sizing

### Components
- Rounded corners (8-12px)
- Soft shadows for depth
- High contrast for accessibility
- Large touch targets (44px minimum)

## 🔧 Technical Implementation

### Technology Stack
- React 18.3.1
- TypeScript
- Tailwind CSS v4
- React Slick (carousel)
- Lucide React (icons)

### Component Structure
```
/src/app
├── components/
│   ├── CategoryCard.tsx
│   ├── ProductCard.tsx
│   ├── ReviewCard.tsx
│   ├── StarRating.tsx
│   ├── EmptyState.tsx
│   ├── SearchBar.tsx
│   ├── LoadingSpinner.tsx
│   └── Toast.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── CategoryProductsPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── ShopDetailPage.tsx
│   └── WriteReviewPage.tsx
├── data/
│   └── mockData.ts
└── App.tsx
```

### Navigation System
- State-based routing with history stack
- Back button functionality
- Deep linking support (can be added)

### Mock Data
The app includes comprehensive mock data:
- 6 product categories
- 4 shops with varying follower counts
- 10 products across categories
- 5 sample reviews

## 🤖 Telegram Bot Integration

### Current Integration Points
1. **Saved Products**: When users save a product, they're notified that saved items are viewable in the Telegram bot
2. **Contact Seller**: Opens seller's Telegram chat in new window
3. **Notifications**: Designed to support bot notifications for followed shops

### Future Bot Features (Design Ready)
- New product notifications from followed shops
- Saved products list management
- Order history tracking
- Quick access to recent conversations

## ♿ Accessibility & UX

### Mobile Optimizations
- Touch-friendly tap targets (minimum 44px)
- Swipe gestures supported (carousel)
- Safe area insets for notched devices
- No hover-dependent interactions

### User Experience
- Instant feedback on all actions
- Loading states for async operations
- Empty states with helpful messaging
- Confirmation messages for important actions
- Error handling with user-friendly messages

### Performance
- Optimized images
- Minimal JavaScript bundle
- CSS-based animations
- Efficient re-renders with React

## 🚀 Future Enhancements

### MVP+ Features
1. Advanced search with filters
2. Product categories with subcategories
3. Shop verification badges
4. Image upload for reviews
5. Wishlists and collections
6. Price alerts
7. Shop analytics for sellers

### Scalability Considerations
- Backend integration ready
- Database schema designed
- API structure planned
- Real-time updates via Telegram
- Payment integration possible (external)

## 📊 Trust & Safety

### Trust Indicators
- Follower counts (social proof)
- Review system (1-5 stars + text)
- Shop age ("2+ years", "New shop")
- Review count per product

### Safety Features
- Direct Telegram communication (platform trust)
- No payment handling (reduces fraud risk)
- Community-based moderation (planned)
- Report functionality (planned)

## 🎯 MVP Scope

### Included ✅
- Browse products by category
- View product details
- Read reviews
- Write reviews
- Follow shops
- Save products
- Contact sellers via Telegram
- View shop details
- Trust indicators

### Not Included ❌
- In-app checkout/payments
- Shopping cart
- Direct messaging
- Image uploads
- Account management UI
- Push notifications (handled by bot)

## 📝 Notes

- All product images are fetched from Unsplash
- Mock data is defined in `/src/app/data/mockData.ts`
- Telegram links open in new window
- "Saved" products show confirmation alert
- Review submission simulates async operation

This is a high-fidelity MVP ready for integration with a Telegram bot backend and real data APIs.
