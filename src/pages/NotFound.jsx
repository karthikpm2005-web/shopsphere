import React from 'react';

export default function NotFound({ onNavigate }) {
  const handleHomeClick = () => {
    if (onNavigate) onNavigate('home');
  };

  return (
    <div className="hero-section" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
      <span style={{ fontSize: '4.5rem' }}>🔍 404</span>
      <h1 className="hero-title" style={{ marginTop: '1rem' }}>Page Not Found</h1>
      <p className="hero-subtitle">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <button type="button" className="hero-cta-btn" onClick={handleHomeClick}>
        Back to Home →
      </button>
    </div>
  );
}
