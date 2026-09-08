/**
 * API Service for ShopSphere Indian E-Commerce Marketplace
 * Merges enriched Indian products dataset with Fake Store REST API items converted to ₹.
 */

import { INDIAN_PRODUCTS } from './indianProductsData';

const USD_TO_INR = 83.5;

export async function getProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) throw new Error('API request failed');
    const apiProducts = await response.json();

    if (Array.isArray(apiProducts) && apiProducts.length > 0) {
      // Convert USD prices to INR for Fake Store API items
      const convertedApiProducts = apiProducts.map(p => ({
        id: p.id,
        title: p.title,
        brand: p.category ? p.category.split(' ')[0].toUpperCase() : 'ShopSphere',
        category: mapApiCategory(p.category),
        price: Math.round(p.price * USD_TO_INR),
        originalPrice: Math.round(p.price * USD_TO_INR * 1.25),
        discount: 20,
        rating: p.rating || { rate: 4.2, count: 150 },
        image: p.image,
        images: [p.image],
        stock: 15,
        delivery: "Free delivery by Tomorrow",
        isFeatured: false,
        isBestSeller: p.id % 2 === 0,
        highlights: ["High quality craftsmanship", "1 Year Manufacturer Warranty"],
        specifications: { "Category": p.category, "Brand": "ShopSphere" },
        description: p.description
      }));

      // Combine Indian products with converted API products
      return [...INDIAN_PRODUCTS, ...convertedApiProducts];
    }
    return INDIAN_PRODUCTS;
  } catch (error) {
    console.warn('Fake Store API unavailable, using local Indian Marketplace dataset:', error.message);
    return INDIAN_PRODUCTS;
  }
}

export async function getProductById(id) {
  const numericId = Number(id);
  const allProducts = await getProducts();
  return allProducts.find(p => p.id === numericId) || INDIAN_PRODUCTS.find(p => p.id === numericId) || null;
}

function mapApiCategory(cat) {
  if (!cat) return 'Electronics';
  const lower = cat.toLowerCase();
  if (lower.includes('electronics')) return 'Electronics';
  if (lower.includes('jewelery') || lower.includes('jewelry')) return 'Jewelry';
  if (lower.includes("men's clothing")) return "Men's Fashion";
  if (lower.includes("women's clothing")) return "Women's Fashion";
  return 'Fashion';
}
