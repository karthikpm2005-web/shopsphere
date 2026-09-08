import React from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  if (!item) return null;

  return (
    <div className="cart-item-card">
      <img src={item.image} alt={item.title} className="cart-item-img" />

      <div className="cart-item-details">
        <h4 className="cart-item-title">{item.title}</h4>
        <p className="cart-item-price">{formatCurrency(item.price)} each</p>
      </div>

      <div className="quantity-controls">
        <button 
          type="button" 
          className="qty-btn"
          onClick={() => decreaseQuantity(item.id)}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="qty-display">{item.quantity}</span>
        <button 
          type="button" 
          className="qty-btn"
          onClick={() => increaseQuantity(item.id)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <div style={{ textAlign: 'right', minWidth: '90px' }}>
        <p style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>
          {formatCurrency(item.price * item.quantity)}
        </p>
        <button 
          type="button" 
          onClick={() => removeFromCart(item.id)}
          style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: '0.25rem', cursor: 'pointer' }}
          aria-label="Remove item from cart"
        >
          Remove 🗑️
        </button>
      </div>
    </div>
  );
}
