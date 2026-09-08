/**
 * API Service for fetching product data from Fake Store API
 * Endpoint: https://fakestoreapi.com/products
 * Includes automatic offline fallback dataset for 100% reliability.
 */

const API_BASE_URL = 'https://fakestoreapi.com';

// Local Fallback Dataset if API is unreachable
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    description: "Your everyday pack for work and everyday life. Fits 15 inch laptops in its padded sleeve.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fit style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions like working, hiking, camping.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 }
  },
  {
    id: 4,
    title: "John Hardy Women's Legends Naga Gold Bracelet",
    price: 695.0,
    description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
    category: "jewelry",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 4.6, count: 400 }
  },
  {
    id: 5,
    title: "Solid Gold Petite Micropave Ring",
    price: 168.0,
    description: "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and handcrafted in the USA.",
    category: "jewelry",
    image: "https://fakestoreapi.com/img/61sbMiAs0mL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3.9, count: 70 }
  },
  {
    id: 6,
    title: "WD 2TB Elements Portable External Hard Drive",
    price: 64.0,
    description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: { rate: 3.3, count: 203 }
  },
  {
    id: 7,
    title: "SanDisk SSD PLUS 1TB Internal SSD",
    price: 109.0,
    description: "Easy upgrade for faster boot up, shutdown, application load and response time. Boosts burst write performance.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: { rate: 2.9, count: 470 }
  },
  {
    id: 8,
    title: "Silicon Power 256GB SSD 3D NAND A55",
    price: 109.0,
    description: "3D NAND flash technology enables high transfer speeds and overall system performance boost.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    rating: { rate: 4.8, count: 319 }
  },
  {
    id: 9,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket",
    price: 56.99,
    description: "Stand collar, adjustable removable hood, adjustable cuffs, zip pockets, waterproof windproof warm coat.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    rating: { rate: 2.6, count: 235 }
  },
  {
    id: 10,
    title: "Lock and Love Women's Removable Hooded Biker Jacket",
    price: 29.95,
    description: "100% POLYURETHANE(shell) 100% POLYESTER(lining). Faux leather material for style and comfort.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    rating: { rate: 2.9, count: 340 }
  }
];

/**
 * Fetches all products from Fake Store API.
 * Falls back to local dataset if network or CORS fails.
 */
export async function getProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return FALLBACK_PRODUCTS;
  } catch (error) {
    console.warn('API Fetch failed, using fallback products dataset:', error.message);
    return FALLBACK_PRODUCTS;
  }
}

/**
 * Fetches a single product by ID.
 */
export async function getProductById(id) {
  const numericId = Number(id);
  try {
    const response = await fetch(`${API_BASE_URL}/products/${numericId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data && data.id) {
      return data;
    }
    // Fallback search
    return FALLBACK_PRODUCTS.find(p => p.id === numericId) || null;
  } catch (error) {
    console.warn(`Product ID ${id} fetch failed, using fallback search:`, error.message);
    return FALLBACK_PRODUCTS.find(p => p.id === numericId) || null;
  }
}
