import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Account from './pages/Account';
import About from './pages/About';
import NotFound from './pages/NotFound';

function MainAppContent() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { toastMessage } = useCart();

  // Sync hash routes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash || hash === 'home') {
        setActivePage('home');
      } else if (hash === 'products') {
        setSelectedCategory('all');
        setActivePage('products');
      } else if (hash.startsWith('category/')) {
        const cat = decodeURIComponent(hash.split('/')[1]);
        setSelectedCategory(cat);
        setActivePage('products');
      } else if (hash.startsWith('products/')) {
        const id = hash.split('/')[1];
        setSelectedProductId(id);
        setActivePage('product-details');
      } else if (hash === 'cart') {
        setActivePage('cart');
      } else if (hash === 'wishlist') {
        setActivePage('wishlist');
      } else if (hash === 'orders') {
        setActivePage('orders');
      } else if (hash === 'account') {
        setActivePage('account');
      } else if (hash === 'about') {
        setActivePage('about');
      } else {
        setActivePage('404');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page, param = null) => {
    if (page === 'product-details' && param) {
      setSelectedProductId(param);
      setActivePage('product-details');
      window.location.hash = `#/products/${param}`;
    } else if (page === 'category' && param) {
      setSelectedCategory(param);
      setActivePage('products');
      window.location.hash = `#/category/${encodeURIComponent(param)}`;
    } else {
      if (page === 'products' && param) setSelectedCategory(param);
      setActivePage(page);
      window.location.hash = `#/${page}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (term) => {
    setSearchQuery(term);
    navigateTo('products');
  };

  return (
    <div className="app-container">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="global-toast-banner" role="alert" aria-live="polite">
          {toastMessage}
        </div>
      )}

      {/* Top Marketplace Navbar */}
      <Navbar activePage={activePage} onNavigate={navigateTo} onSearch={handleSearch} />

      {/* Main Content Area */}
      <main className="main-content">
        {activePage === 'home' && (
          <Home 
            onNavigate={navigateTo} 
            onSelectProduct={(id) => navigateTo('product-details', id)}
            onSelectCategory={(cat) => navigateTo('category', cat)}
          />
        )}
        {activePage === 'products' && (
          <Products 
            onSelectProduct={(id) => navigateTo('product-details', id)}
            initialCategory={selectedCategory}
            searchQuery={searchQuery}
          />
        )}
        {activePage === 'product-details' && (
          <ProductDetails 
            productId={selectedProductId} 
            onNavigate={navigateTo} 
            onSelectProduct={(id) => navigateTo('product-details', id)}
          />
        )}
        {activePage === 'cart' && (
          <Cart onNavigate={navigateTo} />
        )}
        {activePage === 'wishlist' && (
          <Wishlist onNavigate={navigateTo} onSelectProduct={(id) => navigateTo('product-details', id)} />
        )}
        {activePage === 'orders' && (
          <Orders onNavigate={navigateTo} />
        )}
        {activePage === 'account' && (
          <Account onNavigate={navigateTo} />
        )}
        {activePage === 'about' && (
          <About onNavigate={navigateTo} />
        )}
        {activePage === '404' && (
          <NotFound onNavigate={navigateTo} />
        )}
      </main>

      {/* Marketplace Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <MainAppContent />
      </WishlistProvider>
    </CartProvider>
  );
}
