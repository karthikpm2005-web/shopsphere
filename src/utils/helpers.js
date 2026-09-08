/**
 * Helper utility functions for ShopSphere e-commerce application.
 */

/**
 * Formats a numerical amount to USD currency string ($XX.XX).
 */
export function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

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
