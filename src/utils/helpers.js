/**
 * Helper utility functions for ShopSphere Indian E-Commerce Marketplace.
 */

/**
 * Formats amount into Indian Rupee currency format (e.g. ₹24,999, ₹1,48,900).
 */
export function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '₹0';
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

/**
 * Generates rating string with review count (e.g. "★ 4.5 (1,240)").
 */
export function formatRating(rating) {
  if (!rating) return '★ 4.5';
  const rateVal = typeof rating.rate === 'number' ? rating.rate.toFixed(1) : '4.5';
  const countVal = typeof rating.count === 'number' ? rating.count.toLocaleString('en-IN') : '120';
  return `★ ${rateVal} (${countVal})`;
}

/**
 * Calculates percentage discount saved.
 */
export function calculateDiscount(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return null;
  const pct = Math.round(((originalPrice - price) / originalPrice) * 100);
  return `${pct}% off`;
}

/**
 * Truncates text string with ellipsis.
 */
export function truncateText(text, maxLength = 60) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Sorts array of products based on selected criteria.
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
    case 'discount':
      return list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    case 'name-asc':
      return list.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return list;
  }
}
