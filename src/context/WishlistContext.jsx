import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

const WISHLIST_KEY = 'shopsphere_wishlist_v1';
const RECENT_KEY = 'shopsphere_recent_v1';
const ORDERS_KEY = 'shopsphere_orders_v1';

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem(RECENT_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_KEY);
      return saved ? JSON.parse(saved) : [
        {
          id: 'SS10001',
          date: '05 Sep 2026',
          status: 'Delivered',
          items: [
            { id: 101, title: 'Samsung Galaxy S24 Ultra 5G', price: 129999, quantity: 1, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80' }
          ],
          total: 129999
        },
        {
          id: 'SS10002',
          date: '01 Sep 2026',
          status: 'Delivered',
          items: [
            { id: 112, title: "Men's Premium Slim Fit Casual Cotton Shirt", price: 899, quantity: 2, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80' }
          ],
          total: 1798
        }
      ];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistItems)); } catch (e) {}
  }, [wishlistItems]);

  useEffect(() => {
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(recentlyViewed)); } catch (e) {}
  }, [recentlyViewed]);

  useEffect(() => {
    try { localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); } catch (e) {}
  }, [orders]);

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      if (prev.some(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const addRecentlyViewed = (product) => {
    if (!product || !product.id) return;
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  };

  const addOrder = (orderItems, totalAmount) => {
    const newOrder = {
      id: `SS${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'In Transit',
      items: orderItems,
      total: totalAmount
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        recentlyViewed,
        orders,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        addRecentlyViewed,
        addOrder
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
