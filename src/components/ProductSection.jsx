import React from 'react';
import ProductCard from './ProductCard';

export default function ProductSection({ title, subtitle, products, onSelectProduct, onViewAll }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="marketplace-section">
      <div className="section-header-bar">
        <div>
          <h2 className="marketplace-section-title">{title}</h2>
          {subtitle && <p className="marketplace-section-sub">{subtitle}</p>}
        </div>
        {onViewAll && (
          <button type="button" className="btn-view-all" onClick={onViewAll}>
            View All →
          </button>
        )}
      </div>

      <div className="product-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onSelectProduct={onSelectProduct} 
          />
        ))}
      </div>
    </section>
  );
}
