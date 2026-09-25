"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <a href="#home" className="logo-link" onClick={closeMenu}>
          <img
            src="/images/logo/arrow-city-logo.png"
            alt="Arrow City Electronic Hub"
            className="logo"
          />
        </a>

        {/* DESKTOP NAVIGATION */}
        <nav className="desktop-nav">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>

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

        {/* MOBILE MENU BUTTON */}
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* MOBILE NAVIGATION */}
        {menuOpen && (
          <nav className="mobile-nav">

            <a href="#home" onClick={closeMenu}>
              Home
            </a>

            <a href="#products" onClick={closeMenu}>
              Products
            </a>

            <a href="#about" onClick={closeMenu}>
              About
            </a>

            <a href="#gallery" onClick={closeMenu}>
              Gallery
            </a>

            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>

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