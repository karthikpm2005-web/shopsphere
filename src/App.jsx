import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveActivityToast from './components/LiveActivityToast';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import About from './pages/About';
import NotFound from './pages/NotFound';

function MainAppContent() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { toastMessage } = useCart();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash || hash === 'home') {
        setActivePage('home');
      } else if (hash === 'products') {
        setActivePage('products');
      } else if (hash.startsWith('products/')) {
        const id = hash.split('/')[1];
        setSelectedProductId(id);
        setActivePage('product-details');
      } else if (hash === 'cart') {
        setActivePage('cart');
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

  const navigateTo = (page, productId = null) => {
    if (page === 'product-details' && productId) {
      setSelectedProductId(productId);
      setActivePage('product-details');
      window.location.hash = `#/products/${productId}`;
    } else {
      setActivePage(page);
      window.location.hash = `#/${page}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (id) => {
    navigateTo('product-details', id);
  };

  return (
    <div className="app-container">
      {/* Real-time Global Notification Banner */}
      {toastMessage && (
        <div className="global-toast-banner" role="alert" aria-live="polite">
          {toastMessage}
        </div>
      )}

      {/* Real-time Activity Popup */}
      <LiveActivityToast />

      <Navbar activePage={activePage} onNavigate={navigateTo} />

      <main className="main-content">
        {activePage === 'home' && (
          <Home onNavigate={navigateTo} onSelectProduct={handleSelectProduct} />
        )}
        {activePage === 'products' && (
          <Products onSelectProduct={handleSelectProduct} />
        )}
        {activePage === 'product-details' && (
          <ProductDetails productId={selectedProductId} onNavigate={navigateTo} />
        )}
        {activePage === 'cart' && (
          <Cart onNavigate={navigateTo} />
        )}
        {activePage === 'about' && (
          <About onNavigate={navigateTo} />
        )}
        {activePage === '404' && (
          <NotFound onNavigate={navigateTo} />
        )}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}
