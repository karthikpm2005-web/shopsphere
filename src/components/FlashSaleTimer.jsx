import React, { useState, useEffect } from 'react';

export default function FlashSaleTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="flash-sale-banner">
      <div className="flash-sale-left">
        <span className="flash-sale-badge">⚡ REAL-TIME FLASH SALE</span>
        <span className="flash-sale-desc">Up to 40% OFF on Top Electronics & Jewelry</span>
      </div>

      <div className="flash-sale-right">
        <span className="timer-label">Ends In:</span>
        <div className="timer-box">
          <span className="time-num">{pad(timeLeft.hours)}</span>
          <span className="time-unit">h</span>
          <span className="time-sep">:</span>
          <span className="time-num">{pad(timeLeft.minutes)}</span>
          <span className="time-unit">m</span>
          <span className="time-sep">:</span>
          <span className="time-num">{pad(timeLeft.seconds)}</span>
          <span className="time-unit">s</span>
        </div>
      </div>
    </div>
  );
}
