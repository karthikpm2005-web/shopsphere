import React from 'react';

export default function About({ onNavigate }) {
  const handleShopNow = () => {
    if (onNavigate) onNavigate('products');
  };

  return (
    <div>
      <section className="hero-section">
        <div className="hero-badge">🌐 Academic Capstone Project</div>
        <h1 className="hero-title">About ShopSphere</h1>
        <p className="hero-subtitle">
          ShopSphere is a full-stack production-ready e-commerce web application engineered to demonstrate modern frontend web architecture, component-based UI design, state management, and API integration.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem', marginBottom: '3rem' }}>
        <div className="benefit-card">
          <div className="benefit-icon">🧩</div>
          <div>
            <h3 className="benefit-title">Modular Architecture</h3>
            <p className="benefit-desc">
              Clean separation of concerns across reusable components, page views, services, contexts, and helper utilities.
            </p>
          </div>
        </div>

        <div className="benefit-card">
          <div className="benefit-icon">🔄</div>
          <div>
            <h3 className="benefit-title">Client-Side Routing</h3>
            <p className="benefit-desc">
              Seamless navigation across home, catalog, product details, cart, and about pages without browser reloads.
            </p>
          </div>
        </div>

        <div className="benefit-card">
          <div className="benefit-icon">💾</div>
          <div>
            <h3 className="benefit-title">State Persistence</h3>
            <p className="benefit-desc">
              Global React Context state synced automatically with LocalStorage for seamless browser session retention.
            </p>
          </div>
        </div>

        <div className="benefit-card">
          <div className="benefit-icon">📡</div>
          <div>
            <h3 className="benefit-title">REST API & Fallbacks</h3>
            <p className="benefit-desc">
              Real-time integration with Fake Store API (`fakestoreapi.com`) backed by an automated offline data layer.
            </p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '3rem 0' }}>
        <button type="button" className="hero-cta-btn" onClick={handleShopNow}>
          Explore ShopSphere Catalog →
        </button>
      </div>
    </div>
  );
}
