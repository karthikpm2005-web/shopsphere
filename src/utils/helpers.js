/**
 * Helper utility functions for ShopSphere e-commerce application.
 * Supports multi-currency conversion (USD, EUR, GBP, INR, JPY) in real-time.
 */

const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  INR: { symbol: '₹', rate: 83.5, label: 'INR (₹)' },
  JPY: { symbol: '¥', rate: 155.0, label: 'JPY (¥)' }
};

/**
 * Formats a numerical amount to string with currency symbol and exchange rate.
 */
export function formatCurrency(amount, currencyCode = 'USD') {
  if (typeof amount !== 'number' || isNaN(amount)) return '$0.00';
  const curr = CURRENCY_RATES[currencyCode] || CURRENCY_RATES.USD;
  const converted = amount * curr.rate;

  if (currencyCode === 'JPY') {
    return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
  }

  return `${curr.symbol}${converted.toFixed(2)}`;
}

export { CURRENCY_RATES };

/**
 * Generates rating star symbols string (e.g. "★ 4.5").
 */
export function formatRating(rating) {
  if (!rating || typeof rating.rate !== 'number') return '★ 4.5';
  return `★ ${rating.rate.toFixed(1)}`;
}

/**
 * Truncates text string to maximum length with ellipsis.
 */
export function truncateText(text, maxLength = 60) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Sorts array of products based on selected sorting criteria.
 */
export function sortProducts(products, sortBy) {
  if (!Array.isArray(products)) return [];
  const list = [...products];

  switch (sortBy) {
    case 'price-low-high':
      return list.sort((a, b) => a.price - b.price);
    case 'price-high-low':
      return list.sort((a, b) => b.price - a.price);
    case 'rating-high':
      return list.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    case 'name-asc':
      return list.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return list;
  }
}
