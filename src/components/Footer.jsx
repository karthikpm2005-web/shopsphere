import React from 'react';

export default function Footer({ onNavigate }) {
  const handleNav = (page, e) => {
    if (e) e.preventDefault();
    if (onNavigate) onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="marketplace-footer">
      <div className="footer-top-columns">
        <div>
          <h4 className="footer-title">ABOUT</h4>
          <ul className="footer-list">
            <li><a href="#/about" onClick={(e) => handleNav('about', e)}>About Us</a></li>
            <li><a href="#/about" onClick={(e) => handleNav('about', e)}>Contact Us</a></li>
            <li><span className="footer-link-disabled">Careers</span></li>
            <li><span className="footer-link-disabled">ShopSphere Stories</span></li>
            <li><span className="footer-link-disabled">Press & Media</span></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">HELP</h4>
          <ul className="footer-list">
            <li><span className="footer-link-disabled">Payments</span></li>
            <li><span className="footer-link-disabled">Shipping Info</span></li>
            <li><span className="footer-link-disabled">Cancellation & Returns</span></li>
            <li><span className="footer-link-disabled">FAQ & Support</span></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">CONSUMER POLICY</h4>
          <ul className="footer-list">
            <li><span className="footer-link-disabled">Cancellation & Return Policy</span></li>
            <li><span className="footer-link-disabled">Terms Of Use</span></li>
            <li><span className="footer-link-disabled">Security</span></li>
            <li><span className="footer-link-disabled">Privacy Policy</span></li>
            <li><span className="footer-link-disabled">Sitemap</span></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">SOCIAL</h4>
          <ul className="footer-list">
            <li><span className="footer-link-disabled">Facebook</span></li>
            <li><span className="footer-link-disabled">Twitter / X</span></li>
            <li><span className="footer-link-disabled">Instagram</span></li>
            <li><span className="footer-link-disabled">YouTube</span></li>
          </ul>
        </div>

        <div className="footer-address-col">
          <h4 className="footer-title">REGISTERED OFFICE ADDRESS</h4>
          <p className="footer-address-text">
            ShopSphere Internet Private Limited,<br />
            Buildings Alyssa, Begonia & Clover Elephant Tech Park,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103, Karnataka, India
          </p>
        </div>
      </div>

      <div className="footer-bottom-trust-bar">
        <div className="trust-item">
          <span>🛍️ 100% Original Products</span>
        </div>
        <div className="trust-item">
          <span>⚡ Fast Express Delivery</span>
        </div>
        <div className="trust-item">
          <span>🛡️ 30-Day Easy Returns</span>
        </div>
        <div className="trust-item">
          <span>🔒 100% Safe & Secure Payments</span>
        </div>
      </div>

      <div className="footer-copyright-bar">
        <span>&copy; {new Date().getFullYear()} ShopSphere. All rights reserved. Capstone Indian Marketplace.</span>
      </div>
    </footer>
  );
}
