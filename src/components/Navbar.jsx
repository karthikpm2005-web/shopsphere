import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CURRENCY_RATES } from '../utils/helpers';

export default function Navbar({ activePage = 'home', onNavigate }) {
  const { totalItems, currency, setCurrency } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (page, e) => {
    if (e) e.preventDefault();
    if (onNavigate) onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a 
          href="#/" 
          className="brand-logo"
          onClick={(e) => handleNavClick('home', e)}
        >
          <span className="brand-icon">🛍️</span>
          <span>ShopSphere</span>
        </a>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
            <li>
              <a 
                href="#/" 
                className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
                onClick={(e) => handleNavClick('home', e)}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#/products" 
                className={`nav-link ${activePage === 'products' ? 'active' : ''}`}
                onClick={(e) => handleNavClick('products', e)}
              >
                Products
              </a>
            </li>
            <li>
              <a 
                href="#/about" 
                className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
                onClick={(e) => handleNavClick('about', e)}
              >
                About
              </a>
            </li>
          </ul>

          {/* Real-time Currency Converter Selector */}
          <div className="currency-selector-wrapper">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: 600 }}>Curr:</span>
            <select 
              className="currency-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              aria-label="Select currency"
            >
              {Object.keys(CURRENCY_RATES).map(code => (
                <option key={code} value={code}>
                  {CURRENCY_RATES[code].label}
                </option>
              ))}
            </select>
          </div>

          <a 
            href="#/cart" 
            className="cart-badge-btn"
            onClick={(e) => handleNavClick('cart', e)}
            aria-label={`Cart with ${totalItems} items`}
          >
            <span>🛒 Cart</span>
            <span className="cart-count">{totalItems}</span>
          </a>
        </nav>

        <button 
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
