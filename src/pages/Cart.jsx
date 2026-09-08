import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { formatCurrency } from '../utils/helpers';

export default function Cart({ onNavigate }) {
  const { cartItems, totalItems, subtotalPrice, clearCart, currency } = useCart();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const shippingCost = subtotalPrice > 50 || subtotalPrice === 0 ? 0 : 9.99;
  const estimatedTax = subtotalPrice * 0.08;
  const grandTotal = subtotalPrice + shippingCost + estimatedTax;

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    clearCart();
  };

  const handleContinueShopping = () => {
    if (onNavigate) onNavigate('products');
  };

  if (checkoutSuccess) {
    return (
      <div className="hero-section" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <span style={{ fontSize: '4rem' }}>🎉</span>
        <h1 className="hero-title" style={{ marginTop: '1rem' }}>Order Placed Successfully!</h1>
        <p className="hero-subtitle">
          Thank you for shopping with ShopSphere. Your order has been placed in demo mode and confirmation sent to your email.
        </p>
        <button type="button" className="hero-cta-btn" onClick={handleContinueShopping}>
          Continue Shopping →
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="hero-section" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <span style={{ fontSize: '4rem' }}>🛒</span>
        <h1 className="hero-title" style={{ marginTop: '1rem' }}>Your Cart is Empty</h1>
        <p className="hero-subtitle">
          Looks like you haven't added any products to your cart yet.
        </p>
        <button type="button" className="hero-cta-btn" onClick={handleContinueShopping}>
          Browse Product Catalog →
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Your Shopping Cart</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Review {totalItems} item{totalItems === 1 ? '' : 's'} in your cart
          </p>
        </div>
        <button type="button" className="category-btn" onClick={clearCart} style={{ color: 'var(--danger)' }}>
          Clear Cart 🗑️
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items-list">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-summary-card">
          <h3 className="section-title" style={{ fontSize: '1.3rem' }}>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal ({totalItems} items)</span>
            <span>{formatCurrency(subtotalPrice, currency)}</span>
          </div>

          <div className="summary-row">
            <span>Estimated Shipping</span>
            <span>{shippingCost === 0 ? 'FREE' : formatCurrency(shippingCost, currency)}</span>
          </div>

          <div className="summary-row">
            <span>Estimated Tax (8%)</span>
            <span>{formatCurrency(estimatedTax, currency)}</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>{formatCurrency(grandTotal, currency)}</span>
          </div>

          <button type="button" className="btn-checkout" onClick={handleCheckout}>
            Proceed to Demo Checkout →
          </button>

          <button 
            type="button" 
            className="category-btn" 
            onClick={handleContinueShopping}
            style={{ width: '100%', textAlign: 'center', marginTop: '0.5rem' }}
          >
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
