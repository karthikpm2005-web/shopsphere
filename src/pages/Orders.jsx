import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/helpers';

export default function Orders({ onNavigate }) {
  const { orders, updateOrderStatus } = useWishlist();
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);

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

  const trackingStages = [
    { stage: 1, title: 'Order Placed & Confirmed', icon: '📝' },
    { stage: 2, title: 'Packed at Warehouse', icon: '📦' },
    { stage: 3, title: 'Shipped via Express', icon: '🚚' },
    { stage: 4, title: 'Out for Delivery', icon: '🛵' },
    { stage: 5, title: 'Delivered', icon: '🎉' }
  ];

  const handleSimulateStage = (orderId) => {
    updateOrderStatus(orderId);
    // Refresh tracking modal view
    const updated = orders.find(o => o.id === orderId);
    if (updated) {
      setActiveTrackingOrder(updated);
    }
  };

  const currentModalOrder = activeTrackingOrder ? orders.find(o => o.id === activeTrackingOrder.id) || activeTrackingOrder : null;

  return (
    <div className="orders-page-container">
      <div className="section-header-bar">
        <div>
          <h1 className="marketplace-section-title">My Orders ({orders.length})</h1>
          <p className="marketplace-section-sub">Track real-time shipment status & view notification logs</p>
        </div>
      </div>

      <div className="orders-list">
        {orders.map(order => {
          const currentStage = order.trackingStage || (order.status === 'Delivered' ? 5 : 2);
          const customerPhone = order.customer?.phone || '+91 98765 43210';
          const customerEmail = order.customer?.email || 'karthikpm2005@gmail.com';

          return (
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

              {/* Payment & Contact Info snippet */}
              <div className="order-meta-info-bar">
                <span>💳 Payment: <strong>{order.payment?.method || 'UPI Express'}</strong> ({order.payment?.status || 'Paid'})</span>
                <span>📱 SMS Alert: <strong>{customerPhone}</strong></span>
                <span>✉️ Email Alert: <strong>{customerEmail}</strong></span>
              </div>

              <div className="order-items-list">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item-row">
                    <img src={item.image} alt={item.title} className="order-item-img" />
                    <div className="order-item-info">
                      <h4 className="order-item-title">{item.title}</h4>
                      <span className="order-item-qty">Qty: {item.quantity || item.qty || 1} • {formatCurrency(item.price)} each</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-card-footer">
                <span className="order-total-label">Order Total: <strong>{formatCurrency(order.total)}</strong></span>
                <button type="button" className="btn-track-order" onClick={() => setActiveTrackingOrder(order)}>
                  Live Order Tracking 🚚
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* LIVE ORDER TRACKING MODAL */}
      {currentModalOrder && (
        <div className="modal-backdrop">
          <div className="tracking-modal-container">
            <div className="modal-header">
              <div>
                <h3>🚚 Live Order Shipment Tracking</h3>
                <p className="sub-heading">Order #{currentModalOrder.id} • Waybill ID: {currentModalOrder.tracking?.trackingId || 'EX-849201'}</p>
              </div>
              <button type="button" className="modal-close-btn" onClick={() => setActiveTrackingOrder(null)}>✕</button>
            </div>

            <div className="modal-body">
              {/* 5-STAGE PROGRESS BAR */}
              <div className="tracking-timeline-box">
                <div className="timeline-progress-bar">
                  <div 
                    className="timeline-progress-fill" 
                    style={{ width: `${(( (currentModalOrder.trackingStage || 1) - 1) / 4) * 100}%` }}
                  ></div>
                </div>

                <div className="timeline-steps-nodes">
                  {trackingStages.map(s => {
                    const isCompleted = (currentModalOrder.trackingStage || 1) >= s.stage;
                    const isCurrent = (currentModalOrder.trackingStage || 1) === s.stage;
                    return (
                      <div key={s.stage} className={`timeline-node-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                        <div className="node-icon-circle">{s.icon}</div>
                        <span className="node-title">{s.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* DELIVERY AGENT & COURIER CARD */}
              <div className="courier-agent-card">
                <div className="agent-avatar">🛵</div>
                <div className="agent-info">
                  <h4>Delivery Executive: {currentModalOrder.tracking?.agentName || 'Rajesh Kumar'}</h4>
                  <p>Partner: {currentModalOrder.tracking?.courier || 'ExpressLogistics India'} • Vehicle: KA-01-EQ-9482</p>
                  <span className="delivery-est-badge">⏰ Estimated Delivery: {currentModalOrder.tracking?.estimatedDelivery || 'Today by 5:00 PM'}</span>
                </div>
                <button type="button" className="btn-call-agent" onClick={() => alert(`Dialing Delivery Agent Rajesh Kumar at ${currentModalOrder.tracking?.agentPhone || '+91 98123 45678'}...`)}>
                  📞 Call Agent
                </button>
              </div>

              {/* SIMULATE MOVEMENT BUTTON */}
              {(currentModalOrder.trackingStage || 1) < 5 && (
                <div className="simulate-stage-box">
                  <button type="button" className="btn-simulate-next" onClick={() => handleSimulateStage(currentModalOrder.id)}>
                    ⚡ Advance Delivery Stage & Send SMS/Email Alert →
                  </button>
                </div>
              )}

              {/* PHONE & EMAIL NOTIFICATION LOGS */}
              <div className="notification-logs-section">
                <h4>📲 Customer Notification Log History ({currentModalOrder.notifications?.length || 0})</h4>
                <div className="logs-scroll-box">
                  {currentModalOrder.notifications && currentModalOrder.notifications.length > 0 ? (
                    currentModalOrder.notifications.map((note, i) => (
                      <div key={i} className={`log-entry-card ${note.type === 'SMS' ? 'sms-log' : 'email-log'}`}>
                        <div className="log-entry-header">
                          <span className="log-type-tag">{note.type === 'SMS' ? '📱 SMS ALERT' : '✉️ EMAIL RECEIPT'}</span>
                          <span className="log-recipient">To: {note.recipient}</span>
                          <span className="log-time">{note.time}</span>
                        </div>
                        <p className="log-msg">{note.message}</p>
                      </div>
                    ))
                  ) : (
                    <p className="no-logs">No notification logs generated yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
