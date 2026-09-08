import React from 'react';

export default function Footer({ onNavigate }) {
  const handleNavClick = (page, e) => {
    if (e) e.preventDefault();
    if (onNavigate) onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <a href="/" className="brand-logo" onClick={(e) => handleNavClick('home', e)}>
            <span className="brand-icon">🛍️</span>
            <span>ShopSphere</span>
          </a>
          <p className="footer-brand-desc">
            Modern shopping made simple. Discover high-quality electronics, jewelry, and fashion with real-time API catalog updates.
          </p>
        </div>

        <div>
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/" className="footer-link" onClick={(e) => handleNavClick('home', e)}>Home</a></li>
            <li><a href="/products" className="footer-link" onClick={(e) => handleNavClick('products', e)}>Products</a></li>
            <li><a href="/about" className="footer-link" onClick={(e) => handleNavClick('about', e)}>About Us</a></li>
            <li><a href="/cart" className="footer-link" onClick={(e) => handleNavClick('cart', e)}>Shopping Cart</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Categories</h4>
          <ul className="footer-links">
            <li><a href="/products" className="footer-link" onClick={(e) => handleNavClick('products', e)}>Electronics</a></li>
            <li><a href="/products" className="footer-link" onClick={(e) => handleNavClick('products', e)}>Jewelry</a></li>
            <li><a href="/products" className="footer-link" onClick={(e) => handleNavClick('products', e)}>Men's Clothing</a></li>
            <li><a href="/products" className="footer-link" onClick={(e) => handleNavClick('products', e)}>Women's Clothing</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Customer Care</h4>
          <ul className="footer-links">
            <li><span className="footer-link">24/7 Support</span></li>
            <li><span className="footer-link">Fast Shipping</span></li>
            <li><span className="footer-link">Easy Returns</span></li>
            <li><span className="footer-link">Secure Payment</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} ShopSphere. All rights reserved. Capstone Web Project.</span>
        <span>Powered by Fake Store REST API & React 18</span>
      </div>
    </footer>
  );
}
