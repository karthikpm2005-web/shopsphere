import React from 'react';

export default function Loading({ message = "Loading ShopSphere catalog..." }) {
  return (
    <div className="loading-box" role="status" aria-live="polite">
      <div className="spinner"></div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>
        {message}
      </p>
    </div>
  );
}
