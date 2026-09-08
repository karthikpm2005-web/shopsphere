import React, { useState, useEffect } from 'react';
import CategoryBar from '../components/CategoryBar';
import HeroCarousel from '../components/HeroCarousel';
import FlashSaleTimer from '../components/FlashSaleTimer';
import ProductSection from '../components/ProductSection';
import Loading from '../components/Loading';
import { getProducts } from '../services/api';
import { useWishlist } from '../context/WishlistContext';

export default function Home({ onNavigate, onSelectProduct, onSelectCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { recentlyViewed } = useWishlist();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleCategoryClick = (cat) => {
    if (onSelectCategory) onSelectCategory(cat);
  };

  const handleViewAllCategory = (cat) => {
    if (onSelectCategory) onSelectCategory(cat);
  };

  // Product Section Subsets
  const dealsOfDay = products.filter(p => p.discount && p.discount >= 10).slice(0, 4);
  const mobiles = products.filter(p => p.category === 'Mobiles').slice(0, 4);
  const electronics = products.filter(p => p.category === 'Electronics' || p.category === 'Laptops').slice(0, 4);
  const fashion = products.filter(p => p.category.includes('Fashion')).slice(0, 4);
  const appliances = products.filter(p => p.category === 'Appliances' || p.category === 'TVs').slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const recommended = products.slice(4, 8);

  return (
    <div className="home-page-container">
      {/* Category Navigation Bar */}
      <CategoryBar selectedCategory="all" onSelectCategory={handleCategoryClick} />

      {/* Hero Carousel */}
      <HeroCarousel onNavigateCategory={handleCategoryClick} />

      {/* Promotional Bank Offer Cards */}
      <section className="bank-offers-grid">
        <div className="bank-offer-card hdfc">
          <span className="offer-badge">HDFC BANK</span>
          <h4>10% Instant Discount</h4>
          <p>On Credit & Debit Cards • Min order ₹5,000</p>
        </div>
        <div className="bank-offer-card icici">
          <span className="offer-badge">ICICI BANK</span>
          <h4>Up to ₹3,000 Off</h4>
          <p>On No Cost EMI Transactions</p>
        </div>
        <div className="bank-offer-card sbi">
          <span className="offer-badge">AXIS BANK</span>
          <h4>5% Unlimited Cashback</h4>
          <p>Using ShopSphere Axis Credit Card</p>
        </div>
        <div className="bank-offer-card delivery">
          <span className="offer-badge">FREE DELIVERY</span>
          <h4>Zero Shipping Cost</h4>
          <p>On All Orders Over ₹500 across India</p>
        </div>
      </section>

      {/* Real-time Flash Sale Countdown */}
      <FlashSaleTimer />

      {loading ? (
        <Loading message="Loading ShopSphere Marketplace deals..." />
      ) : (
        <>
          {/* Deals of the Day */}
          <ProductSection 
            title="🔥 Deals of the Day" 
            subtitle="Massive price drops on top-rated products • Limited Time Offers"
            products={dealsOfDay}
            onSelectProduct={onSelectProduct}
            onViewAll={() => handleViewAllCategory('all')}
          />

          {/* Best Mobiles & Smartphones */}
          <ProductSection 
            title="📱 Top Smartphones & Mobiles" 
            subtitle="Samsung, Apple, OnePlus, Xiaomi & More"
            products={mobiles.length ? mobiles : products.slice(0, 4)}
            onSelectProduct={onSelectProduct}
            onViewAll={() => handleViewAllCategory('Mobiles')}
          />

          {/* Best Electronics & Laptops */}
          <ProductSection 
            title="💻 Laptops, Headphones & Wearables" 
            subtitle="MacBooks, ROG Gaming, Sony Noise Canceling, Apple Watch"
            products={electronics.length ? electronics : products.slice(2, 6)}
            onSelectProduct={onSelectProduct}
            onViewAll={() => handleViewAllCategory('Electronics')}
          />

          {/* Fashion & Apparel */}
          <ProductSection 
            title="👗 Fashion & Apparel Trends" 
            subtitle="Kurtas, Cotton Shirts, Nike Sneakers & Handbags"
            products={fashion.length ? fashion : products.slice(6, 10)}
            onSelectProduct={onSelectProduct}
            onViewAll={() => handleViewAllCategory("Men's Fashion")}
          />

          {/* Home & TV Appliances */}
          <ProductSection 
            title="📺 TVs & Home Appliances" 
            subtitle="LG OLED 4K, Smart Fridges, AI Washing Machines"
            products={appliances.length ? appliances : products.slice(8, 12)}
            onSelectProduct={onSelectProduct}
            onViewAll={() => handleViewAllCategory('Appliances')}
          />

          {/* Best Sellers */}
          <ProductSection 
            title="⭐ Highest Rated Best Sellers" 
            subtitle="Most loved by millions of ShopSphere shoppers"
            products={bestSellers.length ? bestSellers : products.slice(1, 5)}
            onSelectProduct={onSelectProduct}
            onViewAll={() => handleViewAllCategory('all')}
          />

          {/* Recommended For You */}
          <ProductSection 
            title="🎯 Recommended for You" 
            subtitle="Personalized suggestions based on your browsing"
            products={recommended}
            onSelectProduct={onSelectProduct}
            onViewAll={() => handleViewAllCategory('all')}
          />

          {/* Recently Viewed Products */}
          {recentlyViewed.length > 0 && (
            <ProductSection 
              title="👁️ Recently Viewed Products" 
              subtitle="Continue shopping from where you left off"
              products={recentlyViewed.slice(0, 4)}
              onSelectProduct={onSelectProduct}
            />
          )}
        </>
      )}
    </div>
  );
}
