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

  const addOrder = (orderItems, totalAmount, customerInfo = {}, paymentInfo = {}) => {
    const orderId = `SS${Math.floor(10000 + Math.random() * 90000)}`;
    const nowStr = new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    
    const phone = customerInfo.phone || '+91 76766 13969';
    const email = customerInfo.email || 'karthikpm2005@gmail.com';
    const name = customerInfo.name || 'Karthik PM';
    
    const initialSMS = `💬 SMS to ${phone}: Hi ${name}, your ShopSphere Order #${orderId} of ₹${Math.round(totalAmount).toLocaleString('en-IN')} is CONFIRMED via ${paymentInfo.method || 'UPI Express'}! Track live at shopsphere.in/track/${orderId}`;
    const initialEmail = `✉️ Email to ${email}: Subject: Order Confirmation #${orderId} - ShopSphere India. Dear ${name}, thank you for your purchase of ${orderItems.length} item(s).`;

    const newOrder = {
      id: orderId,
      date: nowStr,
      status: 'Order Placed & Confirmed',
      trackingStage: 1,
      items: orderItems,
      total: totalAmount,
      customer: {
        name,
        phone,
        email,
        address: customerInfo.address || 'Flat 402, Royal Palms, Indiranagar, Bengaluru, KA - 560038'
      },
      payment: {
        method: paymentInfo.method || 'UPI Express',
        details: paymentInfo.details || 'karthik@okaxis',
        status: paymentInfo.method === 'Cash on Delivery (COD)' ? 'Pending COD' : 'Paid'
      },
      tracking: {
        courier: 'ExpressLogistics India',
        trackingId: `EX-${Math.floor(100000 + Math.random() * 900000)}`,
        agentName: 'Rajesh Kumar',
        agentPhone: '+91 98123 45678',
        estimatedDelivery: 'Tomorrow by 5:00 PM'
      },
      notifications: [
        { type: 'SMS', recipient: phone, message: initialSMS, time: nowStr },
        { type: 'EMAIL', recipient: email, message: initialEmail, time: nowStr }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      const stages = ['Order Placed & Confirmed', 'Packed at Bengaluru Warehouse', 'Shipped via Express Logistics', 'Out for Delivery', 'Delivered'];
      const nextStage = Math.min(5, (order.trackingStage || 1) + 1);
      const stageName = stages[nextStage - 1];
      const nowStr = new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
      
      const newSMS = `💬 SMS to ${order.customer.phone}: Update on Order #${order.id}: Status is now "${stageName}". Agent: ${order.tracking.agentName} (${order.tracking.agentPhone}).`;
      const newEmail = `✉️ Email to ${order.customer.email}: Order #${order.id} Update: Your package status has changed to "${stageName}".`;

      return {
        ...order,
        trackingStage: nextStage,
        status: stageName,
        notifications: [
          { type: 'SMS', recipient: order.customer.phone, message: newSMS, time: nowStr },
          { type: 'EMAIL', recipient: order.customer.email, message: newEmail, time: nowStr },
          ...order.notifications
        ]
      };
    }));
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
        addOrder,
        updateOrderStatus
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

