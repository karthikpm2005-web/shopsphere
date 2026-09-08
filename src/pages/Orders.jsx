import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/helpers';

export default function Orders({ onNavigate }) {
  const { orders } = useWishlist();

  if (orders.length === 0) {
    return (
      <div className="hero-section" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <span style={{ fontSize: '4.5rem' }}>📦</span>
        <h1 className="hero-title" style={{ marginTop: '1rem' }}>No Orders Found</h1>
        <p className="hero-subtitle">
          You haven't placed any orders yet. Place your first order today!
        </p>
        <button type="button" className="hero-cta-btn" onClick={() => onNavigate('products')}>
          Start Shopping →
        </button>
      </div>
    );
  }

  return (
    <div className="orders-page-container">
      <div className="section-header-bar">
        <div>
          <h1 className="marketplace-section-title">My Orders ({orders.length})</h1>
          <p className="marketplace-section-sub">Track and manage your order history</p>
        </div>
      </div>

      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <div>
                <span className="order-id">Order #{order.id}</span>
                <span className="order-date">Placed on {order.date}</span>
              </div>
              <span className={`order-status-badge ${order.status === 'Delivered' ? 'delivered' : 'transit'}`}>
                ● {order.status}
              </span>
            </div>

            <div className="order-items-list">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item-row">
                  <img src={item.image} alt={item.title} className="order-item-img" />
                  <div className="order-item-info">
                    <h4 className="order-item-title">{item.title}</h4>
                    <span className="order-item-qty">Qty: {item.quantity} • {formatCurrency(item.price)} each</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-card-footer">
              <span className="order-total-label">Order Total: <strong>{formatCurrency(order.total)}</strong></span>
              <button type="button" className="btn-track-order" onClick={() => alert(`Tracking Order #${order.id}: Shipment on standard delivery route.`)}>
                Track Package 🚚
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
