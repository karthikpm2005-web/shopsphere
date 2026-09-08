import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar({ activePage = 'home', onNavigate }) {
  const { totalItems } = useCart();
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
          href="/" 
          className="brand-logo"
          onClick={(e) => handleNavClick('home', e)}
        >
          <span className="brand-icon">🛍️</span>
          <span>ShopSphere</span>
        </a>

        <nav>
          <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
            <li>
              <a 
                href="/" 
                className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
                onClick={(e) => handleNavClick('home', e)}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/products" 
                className={`nav-link ${activePage === 'products' ? 'active' : ''}`}
                onClick={(e) => handleNavClick('products', e)}
              >
                Products
              </a>
            </li>
            <li>
              <a 
                href="/about" 
                className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
                onClick={(e) => handleNavClick('about', e)}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="/cart" 
                className="cart-badge-btn"
                onClick={(e) => handleNavClick('cart', e)}
                aria-label={`Cart with ${totalItems} items`}
              >
                <span>🛒 Cart</span>
                <span className="cart-count">{totalItems}</span>
              </a>
            </li>
          </ul>
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
