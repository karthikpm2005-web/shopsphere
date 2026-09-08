import React from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency, formatRating, calculateDiscount, truncateText } from '../utils/helpers';

export default function ProductCard({ product, onSelectProduct }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);
  const discountText = calculateDiscount(product.price, product.originalPrice) || (product.discount ? `${product.discount}% off` : null);

  const handleCardClick = () => {
    if (onSelectProduct) onSelectProduct(product.id);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <article className="marketplace-card" onClick={handleCardClick} tabIndex={0} role="button" aria-label={`View details for ${product.title}`}>
      <div className="card-top-image-box">
        {discountText && (
          <span className="discount-badge-pill">{discountText}</span>
        )}

        <button 
          type="button" 
          className={`wishlist-heart-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          aria-label="Wishlist toggle"
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>

        <img 
          src={product.image} 
          alt={product.title} 
          className="card-main-img" 
          loading="lazy" 
        />
      </div>

      <div className="card-content-body">
        <div className="brand-category-row">
          <span className="brand-label">{product.brand || 'ShopSphere'}</span>
          <span className="delivery-tag">{product.delivery || 'Free Delivery'}</span>
        </div>

        <h3 className="card-title" title={product.title}>
          {truncateText(product.title, 55)}
        </h3>

        <div className="card-rating-row">
          <span className="rating-pill">{formatRating(product.rating)}</span>
        </div>

        <div className="card-price-row">
          <span className="current-price">{formatCurrency(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="original-price">{formatCurrency(product.originalPrice)}</span>
          )}
        </div>

        <div className="card-actions-row">
          <button 
            type="button" 
            className="btn-card-details"
            onClick={handleCardClick}
          >
            Details
          </button>
          <button 
            type="button" 
            className="btn-card-add"
            onClick={handleAddToCart}
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
