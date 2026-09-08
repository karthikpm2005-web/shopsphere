import React from 'react';

export default function ErrorMessage({ message = "Unable to load products. Please try again.", onRetry }) {
  return (
    <div className="error-banner" role="alert" aria-live="polite">
      <p className="error-title">⚠️ Service Exception</p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{message}</p>
      {onRetry && (
        <button type="button" className="btn-retry" onClick={onRetry}>
          🔄 Try Again
        </button>
      )}
    </div>
  );
}
