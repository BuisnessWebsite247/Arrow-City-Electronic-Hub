"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCount = (event: Event) => {
      const customEvent = event as CustomEvent<{ count?: number }>;
      setCartCount(customEvent.detail?.count ?? 0);
    };

    window.addEventListener("arrow-city-cart-count", updateCount);
    return () => window.removeEventListener("arrow-city-cart-count", updateCount);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const openCart = () => {
    closeMenu();
    window.dispatchEvent(new Event("arrow-city-open-cart"));
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="#home" className="logo-link" onClick={closeMenu} aria-label="Arrow City home">
          <img
            src="/images/logo/arrow-city-logo.png"
            alt="Arrow City Electronic Hub"
            className="logo"
          />
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>

          <button type="button" className="navbar-cart-button" onClick={openCart} aria-label={`Open cart, ${cartCount} items`}>
            <span aria-hidden="true">🛒</span>
            <span>Cart</span>
            <span className="navbar-cart-count">{cartCount}</span>
          </button>

          <a
            href="https://wa.me/919729802008"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
          >
            <span>💬</span>
            WhatsApp Us
          </a>
        </nav>

        <div className="navbar-mobile-actions">
          <button type="button" className="navbar-cart-button navbar-cart-button-mobile" onClick={openCart} aria-label={`Open cart, ${cartCount} items`}>
            <span aria-hidden="true">🛒</span>
            <span className="navbar-cart-count">{cartCount}</span>
          </button>
          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            type="button"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#products" onClick={closeMenu}>Products</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#gallery" onClick={closeMenu}>Gallery</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
            <button type="button" className="navbar-mobile-cart-link" onClick={openCart}>
              🛒 View Cart <span className="navbar-cart-count">{cartCount}</span>
            </button>
            <a
              href="https://wa.me/919729802008"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button"
              onClick={closeMenu}
            >
              💬 WhatsApp Us
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
