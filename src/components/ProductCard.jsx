import React from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency, formatRating, truncateText } from '../utils/helpers';

export default function ProductCard({ product, onSelectProduct }) {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleCardClick = () => {
    if (onSelectProduct) onSelectProduct(product.id);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <article className="product-card" onClick={handleCardClick} tabIndex={0} role="button" aria-label={`View details for ${product.title}`}>
      <div className="product-image-box">
        <span className="category-tag">{product.category}</span>
        <img 
          src={product.image} 
          alt={product.title} 
          className="product-image" 
          loading="lazy" 
        />
      </div>

      <div className="product-card-body">
        <h3 className="product-title" title={product.title}>
          {truncateText(product.title, 55)}
        </h3>

        <div className="product-rating">
          <span>{formatRating(product.rating)}</span>
          <span className="rating-count">({product.rating?.count || 0})</span>
        </div>

        <div className="product-card-footer">
          <span className="product-price">{formatCurrency(product.price)}</span>

          <div className="card-actions">
            <button 
              type="button" 
              className="btn-icon" 
              title="View Details"
              onClick={handleCardClick}
              aria-label="View Details"
            >
              👁️
            </button>
            <button 
              type="button" 
              className="btn-add-cart"
              onClick={handleAddToCart}
              aria-label={`Add ${product.title} to cart`}
            >
              + Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
