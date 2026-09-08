import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/helpers';

export default function Cart({ onNavigate }) {
  const { cartItems, totalItems, subtotalPrice, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const { addToWishlist, addOrder } = useWishlist();

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Shipping & Customer Info, 2: Payment Gateway, 3: Success Confirmation
  
  const [customerInfo, setCustomerInfo] = useState({
    name: 'Karthik PM',
    phone: '+91 76766 13969',
    email: 'karthikpm2005@gmail.com',
    pincode: '560038',
    address: 'Flat 402, Royal Palms, Indiranagar, Bengaluru, KA'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi, card, netbanking, cod, wallet
  const [upiId, setUpiId] = useState('karthik@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8920');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [codOtp, setCodOtp] = useState('');
  const [placedOrder, setPlacedOrder] = useState(null);

  const totalOriginalPrice = cartItems.reduce((sum, item) => sum + (item.originalPrice || item.price * 1.2) * item.quantity, 0);
  const totalDiscountSavings = totalOriginalPrice - subtotalPrice;
  const deliveryFee = subtotalPrice > 500 || subtotalPrice === 0 ? 0 : 99;
  const grandTotal = subtotalPrice + deliveryFee;

  const handleOpenCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutStep(1);
    setShowCheckoutModal(true);
  };

  const handleConfirmPayment = () => {
    let paymentDetailStr = '';
    let payMethodName = 'UPI Express';

    if (paymentMethod === 'upi') {
      payMethodName = 'UPI (Google Pay / PhonePe / Paytm)';
      paymentDetailStr = `UPI ID: ${upiId || 'karthik@upi'}`;
    } else if (paymentMethod === 'card') {
      payMethodName = 'Credit / Debit Card (Visa/RuPay)';
      paymentDetailStr = `Card ending in ${cardNumber.slice(-4) || '8920'}`;
    } else if (paymentMethod === 'netbanking') {
      payMethodName = `Net Banking (${selectedBank})`;
      paymentDetailStr = `${selectedBank} NetBanking Account`;
    } else if (paymentMethod === 'cod') {
      payMethodName = 'Cash on Delivery (COD)';
      paymentDetailStr = 'Pay ₹' + Math.round(grandTotal) + ' on delivery (OTP Verified)';
    } else if (paymentMethod === 'wallet') {
      payMethodName = 'ShopSphere Wallet / Pay Later';
      paymentDetailStr = 'ShopSphere Pay Balance';
    }

    const newOrder = addOrder(
      cartItems,
      grandTotal,
      customerInfo,
      { method: payMethodName, details: paymentDetailStr }
    );

    setPlacedOrder(newOrder);
    setCheckoutStep(3);
    clearCart();
  };

  const handleSaveForLater = (item) => {
    addToWishlist(item);
    removeFromCart(item.id);
  };

  if (cartItems.length === 0 && !placedOrder) {
    return (
      <div className="hero-section" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <span style={{ fontSize: '4.5rem' }}>🛒</span>
        <h1 className="hero-title" style={{ marginTop: '1rem' }}>Your Cart is Empty</h1>
        <p className="hero-subtitle">
          Explore thousands of top-rated deals and add items to your cart!
        </p>
        <button type="button" className="hero-cta-btn" onClick={() => onNavigate('products')}>
          Shop Products Catalog →
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <div className="section-header-bar">
        <div>
          <h1 className="marketplace-section-title">My Shopping Cart ({totalItems})</h1>
        </div>
        {cartItems.length > 0 && (
          <button type="button" className="btn-clear-cart" onClick={clearCart}>
            Clear Cart 🗑️
          </button>
        )}
      </div>

      <div className="cart-page-layout">
        {/* Left Column: Items */}
        <div className="cart-items-column">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item-row">
              <img src={item.image} alt={item.title} className="cart-row-img" />

              <div className="cart-row-info">
                <h4 className="cart-row-title">{item.title}</h4>
                <span className="cart-row-brand">{item.brand || 'ShopSphere'}</span>

                <div className="cart-row-price-box">
                  <span className="row-price">{formatCurrency(item.price)}</span>
                  {item.originalPrice && (
                    <span className="row-orig-price">{formatCurrency(item.originalPrice)}</span>
                  )}
                </div>

                <div className="cart-row-actions">
                  <div className="qty-control-box">
                    <button type="button" onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>

                  <button type="button" className="btn-row-action" onClick={() => handleSaveForLater(item)}>
                    Save for Later
                  </button>

                  <button type="button" className="btn-row-action remove" onClick={() => removeFromCart(item.id)}>
                    Remove 🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Price Details Sidebar */}
        {cartItems.length > 0 && (
          <div className="cart-price-details-card">
            <h3 className="price-details-title">PRICE DETAILS</h3>

            <div className="price-detail-row">
              <span>Price ({totalItems} items)</span>
              <span>{formatCurrency(totalOriginalPrice)}</span>
            </div>

            <div className="price-detail-row discount">
              <span>Discount Savings</span>
              <span>- {formatCurrency(totalDiscountSavings)}</span>
            </div>

            <div className="price-detail-row">
              <span>Delivery Charges</span>
              <span className="free-delivery-tag">
                {deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}
              </span>
            </div>

            <div className="price-detail-row total-amount-row">
              <span>Total Amount</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>

            {totalDiscountSavings > 0 && (
              <p className="savings-banner-note">
                🎉 You will save {formatCurrency(totalDiscountSavings)} on this order!
              </p>
            )}

            <button type="button" className="btn-place-order" onClick={handleOpenCheckout}>
              PROCEED TO CHECKOUT 🔒
            </button>
          </div>
        )}
      </div>

      {/* CHECKOUT & PAYMENT MODAL */}
      {showCheckoutModal && (
        <div className="modal-backdrop">
          <div className="checkout-modal-container">
            <div className="modal-header">
              <h3>
                {checkoutStep === 1 && '📍 1. Delivery & Customer Contact Info'}
                {checkoutStep === 2 && '💳 2. Select Payment Method'}
                {checkoutStep === 3 && '🎉 3. Order Confirmed & Notifications Sent'}
              </h3>
              <button type="button" className="modal-close-btn" onClick={() => setShowCheckoutModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              {/* STEP 1: CUSTOMER & DELIVERY INFO */}
              {checkoutStep === 1 && (
                <div className="checkout-step-box">
                  <p className="step-desc">Enter your phone number and email address to receive real-time order tracking notifications:</p>
                  
                  <div className="checkout-form-grid">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input type="text" className="form-control" value={customerInfo.name} onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})} />
                    </div>

                    <div className="form-group">
                      <label>Phone Number (for SMS Updates) *</label>
                      <input type="tel" className="form-control" value={customerInfo.phone} onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} />
                    </div>

                    <div className="form-group">
                      <label>Email Address (for Digital Receipt) *</label>
                      <input type="email" className="form-control" value={customerInfo.email} onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})} />
                    </div>

                    <div className="form-group">
                      <label>Pincode *</label>
                      <input type="text" className="form-control" value={customerInfo.pincode} onChange={e => setCustomerInfo({...customerInfo, pincode: e.target.value})} />
                    </div>

                    <div className="form-group full-width">
                      <label>Complete Shipping Address *</label>
                      <textarea className="form-control" rows="2" value={customerInfo.address} onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}></textarea>
                    </div>
                  </div>

                  <div className="modal-actions-bar">
                    <button type="button" className="btn-secondary" onClick={() => setShowCheckoutModal(false)}>Cancel</button>
                    <button type="button" className="btn-primary" onClick={() => setCheckoutStep(2)}>Continue to Payment →</button>
                  </div>
                </div>
              )}

              {/* STEP 2: PAYMENT METHOD SELECTION */}
              {checkoutStep === 2 && (
                <div className="checkout-step-box">
                  <div className="payment-options-layout">
                    <div className="payment-tabs-sidebar">
                      <button type="button" className={`pay-tab-btn ${paymentMethod === 'upi' ? 'active' : ''}`} onClick={() => setPaymentMethod('upi')}>
                        📱 UPI (GPay/PhonePe)
                      </button>
                      <button type="button" className={`pay-tab-btn ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>
                        💳 Credit / Debit Cards
                      </button>
                      <button type="button" className={`pay-tab-btn ${paymentMethod === 'netbanking' ? 'active' : ''}`} onClick={() => setPaymentMethod('netbanking')}>
                        🏦 Net Banking
                      </button>
                      <button type="button" className={`pay-tab-btn ${paymentMethod === 'cod' ? 'active' : ''}`} onClick={() => setPaymentMethod('cod')}>
                        💵 Cash on Delivery (COD)
                      </button>
                      <button type="button" className={`pay-tab-btn ${paymentMethod === 'wallet' ? 'active' : ''}`} onClick={() => setPaymentMethod('wallet')}>
                        👛 Wallets & EMI
                      </button>
                    </div>

                    <div className="payment-tab-content">
                      {paymentMethod === 'upi' && (
                        <div className="payment-panel">
                          <h4>Pay via UPI Instant (0% Fee)</h4>
                          <p className="sub-text">Scan QR code or enter your VPA / UPI ID:</p>
                          <div className="qr-box">
                            <div className="qr-placeholder">
                              <span>📷 Scan with GPay / PhonePe / Paytm</span>
                              <strong className="qr-amt">Pay {formatCurrency(grandTotal)}</strong>
                            </div>
                          </div>
                          <div className="form-group" style={{ marginTop: '1rem' }}>
                            <label>Or enter UPI ID:</label>
                            <input type="text" className="form-control" value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="username@upi" />
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'card' && (
                        <div className="payment-panel">
                          <h4>Credit / Debit Card</h4>
                          <p className="sub-text">All major Indian cards supported (Visa, Mastercard, RuPay)</p>
                          <div className="form-group">
                            <label>Card Number</label>
                            <input type="text" className="form-control" value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="4532 0000 0000 8920" />
                          </div>
                          <div className="form-row-2">
                            <div className="form-group">
                              <label>Expiry (MM/YY)</label>
                              <input type="text" className="form-control" defaultValue="08/29" />
                            </div>
                            <div className="form-group">
                              <label>CVV</label>
                              <input type="password" className="form-control" defaultValue="•••" maxLength="4" />
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'netbanking' && (
                        <div className="payment-panel">
                          <h4>Net Banking</h4>
                          <p className="sub-text">Select your bank from top Indian institutions:</p>
                          <select className="form-control" value={selectedBank} onChange={e => setSelectedBank(e.target.value)}>
                            <option value="HDFC Bank">HDFC Bank</option>
                            <option value="ICICI Bank">ICICI Bank</option>
                            <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                            <option value="Axis Bank">Axis Bank</option>
                            <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                            <option value="Punjab National Bank">Punjab National Bank</option>
                          </select>
                        </div>
                      )}

                      {paymentMethod === 'cod' && (
                        <div className="payment-panel">
                          <h4>Cash on Delivery (COD)</h4>
                          <p className="sub-text">Pay {formatCurrency(grandTotal)} in cash or UPI when order arrives.</p>
                          <div className="form-group">
                            <label>Enter Confirmation Code (OTP sent to {customerInfo.phone}):</label>
                            <input type="text" className="form-control" value={codOtp} onChange={e => setCodOtp(e.target.value)} placeholder="Enter 4-digit OTP (e.g. 5892)" />
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'wallet' && (
                        <div className="payment-panel">
                          <h4>ShopSphere Wallet / Pay Later</h4>
                          <p className="sub-text">Available Balance: ₹1,50,000</p>
                          <div className="wallet-badge">✅ Pre-Approved for 0% Interest EMI</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="modal-actions-bar">
                    <button type="button" className="btn-secondary" onClick={() => setCheckoutStep(1)}>← Back</button>
                    <button type="button" className="btn-primary success-btn" onClick={handleConfirmPayment}>
                      PAY {formatCurrency(grandTotal)} & CONFIRM ORDER →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: ORDER SUCCESS & NOTIFICATIONS DISPLAY */}
              {checkoutStep === 3 && placedOrder && (
                <div className="checkout-step-box text-center">
                  <span className="success-emoji">🎉</span>
                  <h2 className="success-title">Order Placed & Confirmed!</h2>
                  <p className="success-subtitle">Order ID: <strong>#{placedOrder.id}</strong> • Amount: <strong>{formatCurrency(placedOrder.total)}</strong></p>

                  <div className="notification-preview-box">
                    <h4>📲 Real-time Customer Notifications Dispatched</h4>
                    
                    <div className="sms-alert-card">
                      <div className="sms-header">
                        <span>💬 SMS Sent to {placedOrder.customer.phone}</span>
                        <span className="sms-tag">JUST NOW</span>
                      </div>
                      <p className="sms-body">{placedOrder.notifications[0]?.message}</p>
                    </div>

                    <div className="email-alert-card">
                      <div className="email-header">
                        <span>✉️ Email Sent to {placedOrder.customer.email}</span>
                        <span className="email-tag">DELIVERED</span>
                      </div>
                      <p className="email-body">{placedOrder.notifications[1]?.message}</p>
                    </div>
                  </div>

                  <div className="modal-actions-bar" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
                    <button type="button" className="btn-primary" onClick={() => { setShowCheckoutModal(false); onNavigate('orders'); }}>
                      View Order & Live Tracking 🚚
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
