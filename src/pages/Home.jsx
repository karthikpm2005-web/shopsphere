import React, { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import Loading from '../components/Loading';
import FlashSaleTimer from '../components/FlashSaleTimer';
import { getProducts } from '../services/api';

export default function Home({ onNavigate, onSelectProduct }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      setLoading(true);
      const data = await getProducts();
      setFeaturedProducts(data.slice(0, 4));
      setLoading(false);
    }
    loadFeatured();
  }, []);

  const handleShopNow = () => {
    if (onNavigate) onNavigate('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Real-time Flash Sale Countdown Banner */}
      <FlashSaleTimer />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">✨ Live Interactive Shopping Platform</div>
        <h1 className="hero-title">Shop smarter. Live better.</h1>
        <p className="hero-subtitle">
          Discover quality products at great prices. Real-time currency conversions, live stock updates, and instant global shipping.
        </p>
        <button type="button" className="hero-cta-btn" onClick={handleShopNow}>
          <span>Shop Now</span>
          <span>→</span>
        </button>
      </section>

      {/* Value Proposition Benefits */}
      <section className="benefits-grid">
        <div className="benefit-card">
          <div className="benefit-icon">🚀</div>
          <div>
            <h3 className="benefit-title">Fast Global Shipping</h3>
            <p className="benefit-desc">Free express delivery on all orders over $50</p>
          </div>
        </div>

        <div className="benefit-card">
          <div className="benefit-icon">🛡️</div>
          <div>
            <h3 className="benefit-title">Buyer Protection</h3>
            <p className="benefit-desc">Full 30-day money-back guarantee policy</p>
          </div>
        </div>

        <div className="benefit-card">
          <div className="benefit-icon">⚡</div>
          <div>
            <h3 className="benefit-title">Real-Time API Sync</h3>
            <p className="benefit-desc">Live currency selector & inventory stock counters</p>
          </div>
        </div>

        <div className="benefit-card">
          <div className="benefit-icon">🔒</div>
          <div>
            <h3 className="benefit-title">Secure Checkout</h3>
            <p className="benefit-desc">Encrypted payments & zero transaction fees</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Collections</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Handpicked trending items updated in real time
            </p>
          </div>
          <button 
            type="button" 
            className="category-btn active"
            onClick={handleShopNow}
          >
            View All Catalog →
          </button>
        </div>

        {loading ? (
          <Loading message="Loading featured items..." />
        ) : (
          <ProductGrid products={featuredProducts} onSelectProduct={onSelectProduct} />
        )}
      </section>
    </div>
  );
}
