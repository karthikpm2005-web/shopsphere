import React from 'react';

export default function Account({ onNavigate }) {
  return (
    <div className="account-page-container">
      <div className="section-header-bar">
        <div>
          <h1 className="marketplace-section-title">My Account</h1>
          <p className="marketplace-section-sub">Manage your profile, addresses, and shopping preferences</p>
        </div>
      </div>

      <div className="account-layout">
        {/* Sidebar */}
        <aside className="account-sidebar">
          <div className="user-profile-summary">
            <span className="profile-avatar">👤</span>
            <div>
              <h3 className="profile-name">Karthik P M</h3>
              <span className="profile-email">karthikpm2005@gmail.com</span>
            </div>
          </div>

          <nav className="account-nav-list">
            <a href="#/orders" className="account-nav-item" onClick={(e) => { e.preventDefault(); onNavigate('orders'); }}>📦 My Orders</a>
            <a href="#/wishlist" className="account-nav-item" onClick={(e) => { e.preventDefault(); onNavigate('wishlist'); }}>❤️ My Wishlist</a>
            <a href="#/account" className="account-nav-item active">👤 Profile Information</a>
            <a href="#/account" className="account-nav-item">📍 Saved Addresses</a>
            <a href="#/account" className="account-nav-item">💳 Saved Cards & UPI</a>
          </nav>
        </aside>

        {/* Main Info */}
        <div className="account-main-content">
          <div className="account-card">
            <h3 className="account-card-title">Personal Information</h3>
            <div className="info-grid">
              <div>
                <label className="info-label">Full Name</label>
                <input type="text" className="info-input" defaultValue="Karthik P M" readOnly />
              </div>
              <div>
                <label className="info-label">Email Address</label>
                <input type="email" className="info-input" defaultValue="karthikpm2005@gmail.com" readOnly />
              </div>
              <div>
                <label className="info-label">Mobile Number</label>
                <input type="text" className="info-input" defaultValue="+91 98765 43210" readOnly />
              </div>
              <div>
                <label className="info-label">Member Status</label>
                <input type="text" className="info-input" defaultValue="ShopSphere Plus Member ✦" readOnly />
              </div>
            </div>
          </div>

          <div className="account-card">
            <h3 className="account-card-title">Default Delivery Address</h3>
            <p className="address-text">
              <strong>Karthik P M</strong><br />
              #42, 3rd Main Road, Outer Ring Road, Devarabeesanahalli<br />
              Bengaluru, Karnataka - 560103<br />
              Phone: +91 98765 43210
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
