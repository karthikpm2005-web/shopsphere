import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatCurrency, formatRating } from '../utils/helpers';

export default function Wishlist({ onNavigate, onSelectProduct }) {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="hero-section" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <span style={{ fontSize: '4.5rem' }}>❤️</span>
        <h1 className="hero-title" style={{ marginTop: '1rem' }}>Your Wishlist is Empty</h1>
        <p className="hero-subtitle">
          Save your favorite products to your wishlist while browsing!
        </p>
        <button type="button" className="hero-cta-btn" onClick={() => onNavigate('products')}>
          Browse Products Catalog →
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="section-header-bar">
        <div>
          <h1 className="marketplace-section-title">My Wishlist ({wishlistItems.length})</h1>
        </div>
      </div>

      <div className="product-grid">
        {wishlistItems.map(product => (
          <div key={product.id} className="marketplace-card">
            <div className="card-top-image-box">
              <button 
                type="button" 
                className="wishlist-heart-btn active"
                onClick={() => removeFromWishlist(product.id)}
                title="Remove from Wishlist"
              >
                ❤️
              </button>
              <img src={product.image} alt={product.title} className="card-main-img" />
            </div>

            <div className="card-content-body">
              <span className="brand-label">{product.brand || 'ShopSphere'}</span>
              <h3 className="card-title">{product.title}</h3>
              <span className="rating-pill">{formatRating(product.rating)}</span>

              <div className="card-price-row" style={{ marginTop: '0.75rem' }}>
                <span className="current-price">{formatCurrency(product.price)}</span>
              </div>

              <div className="card-actions-row" style={{ marginTop: '1rem' }}>
                <button type="button" className="btn-card-add" style={{ width: '100%' }} onClick={() => handleMoveToCart(product)}>
                  🛒 Move to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
