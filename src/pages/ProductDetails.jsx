import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { getProductById } from '../services/api';
import { formatCurrency, formatRating } from '../utils/helpers';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function ProductDetails({ productId, onNavigate }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedMessage, setAddedMessage] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      if (!productId) {
        setError("Invalid product selection.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      const data = await getProductById(productId);
      if (data) {
        setProduct(data);
      } else {
        setError("Product not found. It may have been removed or is unavailable.");
      }
      setLoading(false);
    }
    loadProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedMessage(true);
      setTimeout(() => setAddedMessage(false), 3000);
    }
  };

  const handleBack = () => {
    if (onNavigate) onNavigate('products');
  };

  if (loading) return <Loading message="Loading product details..." />;
  if (error) return <ErrorMessage message={error} onRetry={handleBack} />;

  return (
    <div>
      <button 
        type="button" 
        className="category-btn"
        onClick={handleBack}
        style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
      >
        ← Back to Catalog
      </button>

      <div className="product-details-container">
        <div className="details-image-wrapper">
          <img src={product.image} alt={product.title} className="details-image" />
        </div>

        <div className="details-info">
          <span className="details-category">{product.category}</span>
          <h1 className="details-title">{product.title}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1rem', color: 'var(--accent-amber)', fontWeight: 600 }}>
              {formatRating(product.rating)}
            </span>
            <span style={{ color: 'var(--text-subtle)', fontSize: '0.85rem' }}>
              ({product.rating?.count || 0} customer reviews)
            </span>
          </div>

          <div className="details-price">{formatCurrency(product.price)}</div>

          <p className="details-description">{product.description}</p>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Quantity:
            </label>
            <div className="quantity-controls">
              <button 
                type="button" 
                className="qty-btn"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="qty-display">{quantity}</span>
              <button 
                type="button" 
                className="qty-btn"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>

              <button 
                type="button" 
                className="hero-cta-btn"
                onClick={handleAddToCart}
                style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)' }}
              >
                🛒 Add to Cart ({formatCurrency(product.price * quantity)})
              </button>
            </div>

            {addedMessage && (
              <p style={{ color: 'var(--success)', fontSize: '0.9rem', fontWeight: 600, marginTop: '0.75rem' }}>
                ✓ Added {quantity} x "{product.title.slice(0, 25)}..." to your cart!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
