import React, { useState, useEffect } from 'react';

const BANNER_SLIDES = [
  {
    id: 1,
    title: "BIG SHOPPING DAYS SALE",
    subtitle: "Up to 70% OFF on Electronics & Gadgets",
    tag: "⚡ LIVE NOW • ENDS IN 24 HOURS",
    bg: "linear-gradient(135deg, #1e1b4b 0%, #311b92 50%, #4a148c 100%)",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80",
    cta: "Shop Sale Deals →",
    target: "Electronics"
  },
  {
    id: 2,
    title: "NEXT-GEN SMARTPHONES LAUNCH",
    subtitle: "Galaxy S24 Ultra & iPhone 15 Pro Max from ₹24,999",
    tag: "🔥 EXTRA 10% BANK DISCOUNT",
    bg: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0369a1 100%)",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    cta: "Explore Mobiles →",
    target: "Mobiles"
  },
  {
    id: 3,
    title: "FASHION FESTIVAL 2026",
    subtitle: "Top Brands Min 50% OFF | Kurtas, Shirts & Sneakers",
    tag: "🏷️ FREE EXPRESS DELIVERY",
    bg: "linear-gradient(135deg, #831843 0%, #9d174d 50%, #be185d 100%)",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    cta: "Upgrade Wardrobe →",
    target: "Fashion"
  },
  {
    id: 4,
    title: "HOME & APPLIANCES BONANZA",
    subtitle: "OLED TVs, Smart Refrigerators & Memory Mattresses",
    tag: "🏠 NO COST EMI AVAILABLE",
    bg: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%)",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    cta: "Shop Home Deals →",
    target: "Appliances"
  }
];

export default function HeroCarousel({ onNavigateCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % BANNER_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = BANNER_SLIDES[currentSlide];

  const handleCta = () => {
    if (onNavigateCategory) onNavigateCategory(slide.target);
  };

  return (
    <div className="hero-carousel-container" style={{ background: slide.bg }}>
      <div className="hero-carousel-content">
        <span className="carousel-tag">{slide.tag}</span>
        <h1 className="carousel-title">{slide.title}</h1>
        <p className="carousel-subtitle">{slide.subtitle}</p>
        <button type="button" className="carousel-cta-btn" onClick={handleCta}>
          {slide.cta}
        </button>
      </div>

      <div className="hero-carousel-image-box">
        <img src={slide.image} alt={slide.title} className="carousel-img" />
      </div>

      {/* Prev / Next Controls */}
      <button 
        type="button" 
        className="carousel-arrow prev"
        onClick={() => setCurrentSlide(prev => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length)}
      >
        ‹
      </button>
      <button 
        type="button" 
        className="carousel-arrow next"
        onClick={() => setCurrentSlide(prev => (prev + 1) % BANNER_SLIDES.length)}
      >
        ›
      </button>

      {/* Indicators */}
      <div className="carousel-dots">
        {BANNER_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            className={`carousel-dot ${idx === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
