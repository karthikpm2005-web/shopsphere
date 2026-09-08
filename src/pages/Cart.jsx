import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/helpers';

export default function Cart({ onNavigate }) {
  const { cartItems, totalItems, subtotalPrice, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const { addToWishlist, addOrder } = useWishlist();
  const [placedOrder, setPlacedOrder] = useState(null);

  const totalOriginalPrice = cartItems.reduce((sum, item) => sum + (item.originalPrice || item.price * 1.2) * item.quantity, 0);
  const totalDiscountSavings = totalOriginalPrice - subtotalPrice;
  const deliveryFee = subtotalPrice > 500 || subtotalPrice === 0 ? 0 : 99;
  const grandTotal = subtotalPrice + deliveryFee;

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    const newOrder = addOrder(cartItems, grandTotal);
    setPlacedOrder(newOrder);
    clearCart();
  };

  const handleSaveForLater = (item) => {
    addToWishlist(item);
    removeFromCart(item.id);
  };

  if (placedOrder) {
    return (
      <div className="hero-section" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <span style={{ fontSize: '4.5rem' }}>🎉</span>
        <h1 className="hero-title" style={{ marginTop: '1rem' }}>Order Placed Successfully!</h1>
        <p className="hero-subtitle">
          Order ID: <strong>#{placedOrder.id}</strong> • Total Amount: <strong>{formatCurrency(placedOrder.total)}</strong>
        </p>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Confirmation details have been saved to your "My Orders" account history.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button type="button" className="hero-cta-btn" onClick={() => onNavigate('orders')}>
            View My Orders →
          </button>
          <button type="button" className="category-btn" onClick={() => onNavigate('products')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="hero-section" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <span style={{ fontSize: '4.5rem' }}>🛒</span>
        <h1 className="hero-title" style={{ marginTop: '1rem' }}>Your Cart is Empty</h1>
        <p className="hero-subtitle">
          Explore thousands of top-rated deals and add items to your cart!
        </p>
        <button type="button" className="hero-cta-btn" onClick={() => onNavigate('products')}>
          Shop Products Catalog →
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <div className="section-header-bar">
        <div>
          <h1 className="marketplace-section-title">My Shopping Cart ({totalItems})</h1>
        </div>
        <button type="button" className="btn-clear-cart" onClick={clearCart}>
          Clear Cart 🗑️
        </button>
      </div>

      <div className="cart-page-layout">
        {/* Left Column: Items */}
        <div className="cart-items-column">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item-row">
              <img src={item.image} alt={item.title} className="cart-row-img" />

              <div className="cart-row-info">
                <h4 className="cart-row-title">{item.title}</h4>
                <span className="cart-row-brand">{item.brand || 'ShopSphere'}</span>

                <div className="cart-row-price-box">
                  <span className="row-price">{formatCurrency(item.price)}</span>
                  {item.originalPrice && (
                    <span className="row-orig-price">{formatCurrency(item.originalPrice)}</span>
                  )}
                </div>

                <div className="cart-row-actions">
                  <div className="qty-control-box">
                    <button type="button" onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>

                  <button type="button" className="btn-row-action" onClick={() => handleSaveForLater(item)}>
                    Save for Later
                  </button>

                  <button type="button" className="btn-row-action remove" onClick={() => removeFromCart(item.id)}>
                    Remove 🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Price Details Sidebar */}
        <div className="cart-price-details-card">
          <h3 className="price-details-title">PRICE DETAILS</h3>

          <div className="price-detail-row">
            <span>Price ({totalItems} items)</span>
            <span>{formatCurrency(totalOriginalPrice)}</span>
          </div>

          <div className="price-detail-row discount">
            <span>Discount Savings</span>
            <span>- {formatCurrency(totalDiscountSavings)}</span>
          </div>

          <div className="price-detail-row">
            <span>Delivery Charges</span>
            <span className="free-delivery-tag">
              {deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}
            </span>
          </div>

          <div className="price-detail-row total-amount-row">
            <span>Total Amount</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>

          {totalDiscountSavings > 0 && (
            <p className="savings-banner-note">
              🎉 You will save {formatCurrency(totalDiscountSavings)} on this order!
            </p>
          )}

          <button type="button" className="btn-place-order" onClick={handlePlaceOrder}>
            PLACE ORDER →
          </button>
        </div>
      </div>
    </div>
  );
}
