import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, onSelectProduct }) {
  if (!products || products.length === 0) {
    return (
      <div className="error-banner">
        <p className="error-title">No products found</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Try adjusting your search terms or category filter settings.
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onSelectProduct={onSelectProduct} 
        />
      ))}
    </div>
  );
}
