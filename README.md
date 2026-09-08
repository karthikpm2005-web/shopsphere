# ShopSphere – Modern E-Commerce Product Catalog

**ShopSphere** is a production-ready, modular E-commerce Product Catalog web application built for the Web Development Capstone Project. It demonstrates modular React frontend architecture, client-side routing, global state management with LocalStorage persistence, live REST API integration, real-time search & category filtering, 5-mode product sorting, dynamic product detail rendering, shopping cart functionality, responsive design, and production deployment configuration.

---

## 🌟 Key Features

- **Modular Component Architecture**: Reusable UI elements (`Navbar`, `Footer`, `ProductCard`, `ProductGrid`, `SearchBar`, `FilterPanel`, `CartItem`, `Loading`, `ErrorMessage`).
- **Client-Side Routing**: Instant navigation across Home (`/`), Products Catalog (`/products`), Product Details (`/products/:id`), Shopping Cart (`/cart`), About (`/about`), and 404 Not Found (`*`) without page reloads.
- **Real-Time REST API Integration**: Fetches live product data from [Fake Store API](https://fakestoreapi.com/products).
- **Graceful Offline Data Fallback**: Automated fallback data layer in `services/api.js` ensuring 100% uptime even during network or API drops.
- **Search, Filtering & Sorting Pipeline**:
  - Live search input matching titles and categories.
  - Multi-category filter buttons (All, Electronics, Jewelry, Men's Clothing, Women's Clothing).
  - 5-mode sorting selector (Default, Price: Low to High, Price: High to Low, Rating: Highest First, Name: A-Z).
- **Shopping Cart & LocalStorage Sync**: Add/remove items, adjust quantities, calculate subtotal, shipping, and tax, with state persisted in `window.localStorage`.
- **Responsive & Accessible Design**: Modern glassmorphism UI styled with Vanilla CSS tokens, grid/flexbox, lazy-loaded images, focus outlines, and semantic HTML5 tags.

---

## 📁 Project Structure

```
shopsphere/
├── index.html              # HTML5 template with Google Fonts
├── vite.config.js          # Vite build configuration
├── package.json            # React 18, React Router, Vite dependencies
├── vercel.json             # Vercel SPA routing rewrite rules
├── _redirects              # Netlify SPA redirect rules
├── README.md               # Project documentation
└── src/
    ├── components/
    │   ├── Navbar.jsx          # Header navigation & cart count badge
    │   ├── Footer.jsx          # Reusable footer with brand links
    │   ├── ProductCard.jsx     # Reusable product card component
    │   ├── ProductGrid.jsx     # Responsive grid container
    │   ├── SearchBar.jsx       # Live input search bar
    │   ├── FilterPanel.jsx     # Category filter pills & sorting selector
    │   ├── CartItem.jsx        # Shopping cart item component
    │   ├── Loading.jsx         # Loading spinner indicator
    │   └── ErrorMessage.jsx    # Accessible error banner
    ├── pages/
    │   ├── Home.jsx            # Hero banner, featured products, value props
    │   ├── Products.jsx        # Main catalog with search/filter/sort
    │   ├── ProductDetails.jsx  # Detailed product view & quantity selector
    │   ├── Cart.jsx            # Cart overview, summary calculation & demo checkout
    │   ├── About.jsx           # About page detailing tech stack & mission
    │   └── NotFound.jsx       # Custom 404 page
    ├── context/
    │   └── CartContext.jsx     # Global Cart state management & LocalStorage
    ├── services/
    │   └── api.js              # Fake Store API client with fallback data
    ├── utils/
    │   └── helpers.js          # Currency formatting, rating stars, sorting logic
    ├── App.jsx                 # App wrapper & client-side router
    ├── main.jsx                # Bootstrap entry point
    └── index.css               # Modern CSS design system
```

---

## 🛠️ How to Run Locally

1. Open a terminal inside the project directory:
   ```bash
   cd C:\Users\User\.gemini\antigravity\scratch\shopsphere
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start local dev server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

---

## 🚀 How to Deploy

### Option A: Vercel
1. Push this repository to GitHub.
2. Connect your GitHub repository to [Vercel](https://vercel.com).
3. Vercel automatically detects Vite & React and uses `vercel.json` for SPA routing!

### Option B: Netlify
1. Connect your GitHub repository to [Netlify](https://netlify.com).
2. Set Build Command to `npm run build` and Publish Directory to `dist`.
3. Netlify automatically reads `_redirects` to handle client-side routes!
