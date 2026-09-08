import React from 'react';
import { CATEGORIES_LIST } from '../services/indianProductsData';

export default function CategoryBar({ selectedCategory, onSelectCategory }) {
  return (
    <div className="category-bar-wrapper">
      <div className="category-bar-inner">
        {CATEGORIES_LIST.map(cat => {
          const isActive = selectedCategory === cat.id || selectedCategory === cat.name;
          return (
            <button 
              key={cat.id}
              type="button"
              className={`category-item-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.name === 'All Categories' ? 'all' : cat.name)}
            >
              <span className="category-item-icon">{cat.icon}</span>
              <span className="category-item-name">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
