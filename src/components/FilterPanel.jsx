import React from 'react';
import SearchBar from './SearchBar';

const CATEGORIES = [
  { label: 'All Products', value: 'all' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Jewelry', value: 'jewelry' },
  { label: "Men's Clothing", value: "men's clothing" },
  { label: "Women's Clothing", value: "women's clothing" }
];

export default function FilterPanel({ 
  searchQuery, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange, 
  sortBy, 
  onSortChange 
}) {
  return (
    <div className="filter-container">
      <div className="filter-row">
        <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label htmlFor="sort-select" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Sort By:
          </label>
          <select 
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort products by"
          >
            <option value="default">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating-high">Rating: Highest First</option>
            <option value="name-asc">Name: A-Z</option>
          </select>
        </div>
      </div>

      <div className="category-pills">
        {CATEGORIES.map(cat => (
          <button 
            key={cat.value}
            type="button"
            className={`category-btn ${selectedCategory === cat.value ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
