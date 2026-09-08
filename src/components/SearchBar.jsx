import React from 'react';

export default function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="search-box">
      <span className="search-icon-inside">🔍</span>
      <input 
        type="text" 
        className="search-input"
        placeholder="Search products by title or category..." 
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search products"
      />
    </div>
  );
}
