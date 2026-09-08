import React, { useState, useEffect, useMemo } from 'react';
import FilterPanel from '../components/FilterPanel';
import ProductGrid from '../components/ProductGrid';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getProducts } from '../services/api';
import { sortProducts } from '../utils/helpers';

export default function Products({ onSelectProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

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

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = 
        searchQuery.trim() === '' ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = 
        selectedCategory === 'all' ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const displayedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortBy);
  }, [filteredProducts, sortBy]);

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Product Catalog</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Explore our real-time collection of {products.length} products
          </p>
        </div>
      </div>

      <FilterPanel 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {loading ? (
        <Loading message="Fetching live catalog from API..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchCatalog} />
      ) : (
        <ProductGrid 
          products={displayedProducts} 
          onSelectProduct={onSelectProduct} 
        />
      )}
    </div>
  );
}
