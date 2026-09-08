import React, { useState, useEffect, useMemo } from 'react';
import CategoryBar from '../components/CategoryBar';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getProducts } from '../services/api';
import { sortProducts } from '../utils/helpers';

export default function Products({ onSelectProduct, initialCategory = 'all', searchQuery = '' }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  async function fetchCatalog() {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch product catalog.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCatalog();
  }, []);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange('all');
    setMinRating(0);
    setMinDiscount(0);
    setSortBy('default');
  };

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // 1. Search Query
      const q = searchQuery.trim().toLowerCase();
      if (q && !product.title.toLowerCase().includes(q) && 
               !product.brand.toLowerCase().includes(q) && 
               !product.category.toLowerCase().includes(q) &&
               !product.description.toLowerCase().includes(q)) {
        return false;
      }

      // 2. Category
      if (selectedCategory !== 'all' && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // 3. Brand
      if (selectedBrand !== 'all' && product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }

      // 4. Price Bracket
      if (priceRange === 'under-500' && product.price >= 500) return false;
      if (priceRange === '500-1000' && (product.price < 500 || product.price > 1000)) return false;
      if (priceRange === '1000-5000' && (product.price < 1000 || product.price > 5000)) return false;
      if (priceRange === '5000-25000' && (product.price < 5000 || product.price > 25000)) return false;
      if (priceRange === 'above-25000' && product.price < 25000) return false;

      // 5. Rating
      if (minRating > 0 && (!product.rating || product.rating.rate < minRating)) return false;

      // 6. Discount
      if (minDiscount > 0 && (!product.discount || product.discount < minDiscount)) return false;

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, priceRange, minRating, minDiscount]);

  const displayedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortBy);
  }, [filteredProducts, sortBy]);

  return (
    <div className="catalog-page-container">
      <CategoryBar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      <div className="catalog-layout">
        <FilterSidebar 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedBrand={selectedBrand}
          onBrandChange={setSelectedBrand}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          minRating={minRating}
          onRatingChange={setMinRating}
          minDiscount={minDiscount}
          onDiscountChange={setMinDiscount}
          onResetFilters={handleResetFilters}
        />

        <div className="catalog-main-content">
          <div className="catalog-header-bar">
            <div>
              <h1 className="catalog-title">
                {selectedCategory === 'all' ? 'All Products' : selectedCategory}
              </h1>
              <p className="catalog-subtitle">
                Showing {displayedProducts.length} of {products.length} products
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            <div className="sort-box">
              <label htmlFor="sort-dropdown" className="sort-label">Sort By:</label>
              <select 
                id="sort-dropdown"
                className="sort-dropdown-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Relevance</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating-high">Customer Rating</option>
                <option value="discount">Discount %</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {loading ? (
            <Loading message="Loading product catalog..." />
          ) : error ? (
            <ErrorMessage message={error} onRetry={fetchCatalog} />
          ) : (
            <ProductGrid 
              products={displayedProducts} 
              onSelectProduct={onSelectProduct} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
