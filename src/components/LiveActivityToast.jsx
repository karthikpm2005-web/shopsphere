import React, { useState, useEffect } from 'react';

const RECENT_ACTIVITIES = [
  { name: 'Sarah M.', city: 'New York, USA', action: 'purchased Mens Casual Slim Fit T-Shirt', time: '2m ago' },
  { name: 'Alex K.', city: 'London, UK', action: 'purchased Solid Gold Petite Ring', time: '4m ago' },
  { name: 'Kenji T.', city: 'Tokyo, Japan', action: 'purchased SanDisk SSD 1TB Internal SSD', time: '1m ago' },
  { name: 'Elena R.', city: 'Madrid, Spain', action: 'purchased Fjallraven Foldsack Backpack', time: '5m ago' },
  { name: 'Priya S.', city: 'Mumbai, India', action: 'purchased John Hardy Naga Gold Bracelet', time: 'Just now' },
  { name: 'David L.', city: 'Sydney, Australia', action: 'purchased WD 2TB Portable Hard Drive', time: '3m ago' }
];

export default function LiveActivityToast() {
  const [activity, setActivity] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const triggerNext = () => {
      const randomIndex = Math.floor(Math.random() * RECENT_ACTIVITIES.length);
      setActivity(RECENT_ACTIVITIES[randomIndex]);
      setVisible(true);

      setTimeout(() => setVisible(false), 5000);
    };

    const initialTimer = setTimeout(triggerNext, 4000);
    const interval = setInterval(triggerNext, 18000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!activity || !visible) return null;

  return (
    <div className="live-activity-toast" role="status" aria-live="polite">
      <div className="toast-avatar">🛍️</div>
      <div className="toast-content">
        <p className="toast-title">
          <strong>{activity.name}</strong> from {activity.city}
        </p>
        <p className="toast-body">{activity.action}</p>
        <span className="toast-time">⚡ Live • {activity.time}</span>
      </div>
      <button 
        type="button" 
        className="toast-close" 
        onClick={() => setVisible(false)}
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}
