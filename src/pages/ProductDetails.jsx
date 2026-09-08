import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getProductById, getProducts } from '../services/api';
import { formatCurrency, formatRating, calculateDiscount } from '../utils/helpers';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import ProductGrid from '../components/ProductGrid';

export default function ProductDetails({ productId, onNavigate, onSelectProduct }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, addRecentlyViewed } = useWishlist();

  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeMessage, setPincodeMessage] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isWishlisted = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    async function loadData() {
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
        setSelectedImg(data.image);
        addRecentlyViewed(data);

        // Fetch similar products in same category
        const all = await getProducts();
        const similar = all.filter(p => p.category === data.category && p.id !== data.id).slice(0, 4);
        setSimilarProducts(similar);
      } else {
        setError("Product not found.");
      }
      setLoading(false);
    }
    loadData();
  }, [productId]);

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeMessage(`✓ Fast Delivery available to ${pincode} by Tomorrow!`);
    } else {
      setPincodeMessage(`⚠️ Please enter a valid 6-digit Pincode.`);
    }
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    if (product) addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      if (onNavigate) onNavigate('cart');
    }
  };

  if (loading) return <Loading message="Loading product details..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => onNavigate('products')} />;

  const discountText = calculateDiscount(product.price, product.originalPrice) || (product.discount ? `${product.discount}% off` : null);

  return (
    <div className="product-details-page">
      <button 
        type="button" 
        className="btn-back-link"
        onClick={() => onNavigate('products')}
      >
        ← Back to Catalog
      </button>

      <div className="details-main-layout">
        {/* Left Column: Image Gallery */}
        <div className="details-gallery-box">
          <div className="details-primary-image-wrapper">
            <img src={selectedImg || product.image} alt={product.title} className="details-primary-img" />
            <button 
              type="button" 
              className={`details-wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={handleWishlistToggle}
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              {isWishlisted ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
            </button>
          </div>

          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
            <div className="details-thumbnails-row">
              {product.images.map((imgUrl, idx) => (
                <img 
                  key={idx}
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`thumbnail-img ${selectedImg === imgUrl ? 'active' : ''}`}
                  onClick={() => setSelectedImg(imgUrl)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Actions */}
        <div className="details-info-box">
          <span className="details-brand-pill">{product.brand || 'ShopSphere'}</span>
          <h1 className="details-product-title">{product.title}</h1>

          <div className="details-rating-row">
            <span className="details-rating-pill">{formatRating(product.rating)}</span>
            <span className="details-reviews-count">({product.rating?.count || 120} ratings & reviews)</span>
          </div>

          {/* Price Box */}
          <div className="details-price-card">
            <div className="price-tag-row">
              <span className="details-final-price">{formatCurrency(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="details-original-price">{formatCurrency(product.originalPrice)}</span>
              )}
              {discountText && (
                <span className="details-discount-tag">{discountText}</span>
              )}
            </div>
            <span className="inclusive-tax-note">Inclusive of all taxes</span>
          </div>

          {/* Bank Offers List */}
          <div className="details-offers-box">
            <h4 className="offers-title">Available Bank & Promo Offers:</h4>
            <ul className="offers-list">
              <li>🏷️ <strong>Bank Offer:</strong> 10% Instant Discount on HDFC Credit Cards up to ₹1,500.</li>
              <li>🏷️ <strong>Partner Offer:</strong> Sign up for ShopSphere Pay Later & get ₹500 Gift Card.</li>
              <li>🏷️ <strong>No Cost EMI:</strong> Available on major credit cards starting ₹2,100/mo.</li>
            </ul>
          </div>

          {/* Delivery Pincode Checker */}
          <div className="pincode-checker-box">
            <h4 className="checker-title">Delivery Options</h4>
            <form className="pincode-form" onSubmit={handlePincodeCheck}>
              <input 
                type="text" 
                className="pincode-input"
                placeholder="Enter 6-digit Pincode"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              <button type="submit" className="btn-check-pincode">Check</button>
            </form>
            {pincodeMessage && <p className="pincode-msg">{pincodeMessage}</p>}
          </div>

          {/* Quantity & CTA Action Buttons */}
          <div className="details-cta-section">
            <div className="details-qty-selector">
              <label>Qty:</label>
              <button type="button" className="qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span className="qty-num">{quantity}</span>
              <button type="button" className="qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <div className="details-buttons-row">
              <button type="button" className="btn-add-to-cart" onClick={handleAddToCart}>
                🛒 Add to Cart
              </button>
              <button type="button" className="btn-buy-now" onClick={handleBuyNow}>
                ⚡ Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights & Specifications */}
      <div className="details-specs-section">
        <div className="highlights-card">
          <h3 className="section-specs-title">Key Highlights</h3>
          <ul className="highlights-bullets">
            {product.highlights ? (
              product.highlights.map((h, i) => <li key={i}>• {h}</li>)
            ) : (
              <>
                <li>• Premium high-durability craftsmanship</li>
                <li>• Official 1-Year Brand Warranty Included</li>
                <li>• 30-Day Easy Replacement Policy</li>
              </>
            )}
          </ul>
        </div>

        <div className="specifications-card">
          <h3 className="section-specs-title">Full Specifications</h3>
          <table className="specs-table">
            <tbody>
              <tr>
                <td className="spec-name">Brand</td>
                <td className="spec-val">{product.brand || 'ShopSphere'}</td>
              </tr>
              <tr>
                <td className="spec-name">Category</td>
                <td className="spec-val">{product.category}</td>
              </tr>
              <tr>
                <td className="spec-name">Model / Title</td>
                <td className="spec-val">{product.title}</td>
              </tr>
              {product.specifications && Object.entries(product.specifications).map(([key, val]) => (
                <tr key={key}>
                  <td className="spec-name">{key}</td>
                  <td className="spec-val">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div style={{ marginTop: '3.5rem' }}>
          <h2 className="marketplace-section-title" style={{ marginBottom: '1.25rem' }}>Similar Products</h2>
          <ProductGrid products={similarProducts} onSelectProduct={onSelectProduct} />
        </div>
      )}
    </div>
  );
}
