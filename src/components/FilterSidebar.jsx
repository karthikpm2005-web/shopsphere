import React from 'react';

const BRANDS = ['Samsung', 'Apple', 'OnePlus', 'Xiaomi', 'Sony', 'LG', 'ASUS', 'Nike', 'Roadster', 'BIBA', 'Minimalist', 'Wakefit', 'Fortune'];

export default function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  selectedBrand,
  onBrandChange,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
  minDiscount,
  onDiscountChange,
  onResetFilters
}) {
  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar-header">
        <h3 className="filter-title">Filters</h3>
        <button type="button" className="btn-clear-filters" onClick={onResetFilters}>
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="filter-group">
        <h4 className="filter-group-title">Category</h4>
        <select 
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Laptops">Laptops</option>
          <option value="Electronics">Electronics</option>
          <option value="TVs">TVs</option>
          <option value="Appliances">Appliances</option>
          <option value="Men's Fashion">Men's Fashion</option>
          <option value="Women's Fashion">Women's Fashion</option>
          <option value="Beauty">Beauty</option>
          <option value="Grocery">Grocery</option>
          <option value="Sports">Sports</option>
          <option value="Furniture">Furniture</option>
        </select>
      </div>

      {/* Brand */}
      <div className="filter-group">
        <h4 className="filter-group-title">Brand</h4>
        <select 
          className="filter-select"
          value={selectedBrand}
          onChange={(e) => onBrandChange(e.target.value)}
        >
          <option value="all">All Brands</option>
          {BRANDS.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="filter-group">
        <h4 className="filter-group-title">Price Range</h4>
        <div className="radio-list">
          {[
            { label: 'All Prices', value: 'all' },
            { label: 'Under ₹500', value: 'under-500' },
            { label: '₹500 – ₹1,000', value: '500-1000' },
            { label: '₹1,000 – ₹5,000', value: '1000-5000' },
            { label: '₹5,000 – ₹25,000', value: '5000-25000' },
            { label: '₹25,000+', value: 'above-25000' }
          ].map(p => (
            <label key={p.value} className="radio-label">
              <input 
                type="radio" 
                name="priceRange" 
                value={p.value}
                checked={priceRange === p.value}
                onChange={() => onPriceChange(p.value)}
              />
              <span>{p.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="filter-group">
        <h4 className="filter-group-title">Customer Rating</h4>
        <div className="radio-list">
          {[
            { label: 'All Ratings', value: 0 },
            { label: '4★ & above', value: 4 },
            { label: '3★ & above', value: 3 },
            { label: '2★ & above', value: 2 }
          ].map(r => (
            <label key={r.value} className="radio-label">
              <input 
                type="radio" 
                name="minRating" 
                value={r.value}
                checked={minRating === r.value}
                onChange={() => onRatingChange(r.value)}
              />
              <span>{r.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Discount */}
      <div className="filter-group">
        <h4 className="filter-group-title">Discount</h4>
        <div className="radio-list">
          {[
            { label: 'All Discounts', value: 0 },
            { label: '10%+ Off', value: 10 },
            { label: '20%+ Off', value: 20 },
            { label: '30%+ Off', value: 30 },
            { label: '50%+ Off', value: 50 }
          ].map(d => (
            <label key={d.value} className="radio-label">
              <input 
                type="radio" 
                name="minDiscount" 
                value={d.value}
                checked={minDiscount === d.value}
                onChange={() => onDiscountChange(d.value)}
              />
              <span>{d.label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
