import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { INDIAN_PRODUCTS } from '../services/indianProductsData';

export default function Navbar({ activePage = 'home', onNavigate, onSearch }) {
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();

  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchRef = useRef(null);

  // Live Autocomplete Suggestions Logic
  useEffect(() => {
    const q = searchTerm.trim().toLowerCase();
    if (q.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const matches = INDIAN_PRODUCTS.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ).slice(0, 6);

    setSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  }, [searchTerm]);

  // Click outside listener for suggestions box
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (onSearch) onSearch(searchTerm);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (product) => {
    if (onNavigate) onNavigate('product-details', product.id);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleNav = (page, e) => {
    if (e) e.preventDefault();
    if (onNavigate) onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="marketplace-header">
      <div className="header-top-container">
        {/* Brand Logo */}
        <a href="#/" className="header-brand" onClick={(e) => handleNav('home', e)}>
          <div className="brand-logo-text">
            <span className="brand-icon">🛍️</span>
            <span className="brand-name">ShopSphere</span>
          </div>
          <span className="brand-tagline">Explore Plus ✦</span>
        </a>

        {/* Large Marketplace Search Bar */}
        <div className="header-search-wrapper" ref={searchRef}>
          <form className="header-search-form" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              className="header-search-input"
              placeholder="Search for products, brands and categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              aria-label="Search catalog"
            />
            <button type="submit" className="header-search-btn" aria-label="Search">
              🔍
            </button>
          </form>

          {/* Autocomplete Suggestions Box */}
          {showSuggestions && (
            <ul className="search-suggestions-dropdown">
              {suggestions.map(p => (
                <li key={p.id} className="suggestion-item" onClick={() => handleSuggestionClick(p)}>
                  <img src={p.image} alt={p.title} className="suggestion-img" />
                  <div className="suggestion-info">
                    <span className="suggestion-title">{p.title}</span>
                    <span className="suggestion-meta">{p.brand} • in {p.category}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Controls */}
        <div className={`header-actions ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#/account" className={`header-action-btn ${activePage === 'account' ? 'active' : ''}`} onClick={(e) => handleNav('account', e)}>
            👤 Login / Profile
          </a>

          <a href="#/orders" className={`header-action-btn ${activePage === 'orders' ? 'active' : ''}`} onClick={(e) => handleNav('orders', e)}>
            📦 My Orders
          </a>

          <a href="#/wishlist" className="header-action-btn badge-btn" onClick={(e) => handleNav('wishlist', e)}>
            ❤️ Wishlist
            {wishlistItems.length > 0 && (
              <span className="action-badge red">{wishlistItems.length}</span>
            )}
          </a>

          <a href="#/cart" className="header-action-btn badge-btn cart-btn-highlight" onClick={(e) => handleNav('cart', e)}>
            🛒 Cart
            <span className="action-badge yellow">{totalItems}</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
