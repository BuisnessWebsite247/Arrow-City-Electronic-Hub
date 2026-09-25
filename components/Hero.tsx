"use client";

import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { CSSProperties } from "react";

type HeroSlide = {
  id: number;
  src: string;

  theme: {
    background: string;
    backgroundGlow: string;
    primary: string;
    accent: string;
    text: string;
    muted: string;
    border: string;
  };
};

type HeroProps = {
  slides: HeroSlide[];
  activeSlide: number;
  setActiveSlide: Dispatch<SetStateAction<number>>;
};

export default function Hero({
  slides,
  activeSlide,
  setActiveSlide,
}: HeroProps) {
  const slide = slides[activeSlide];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) =>
        current === slides.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length, setActiveSlide]);

  const heroStyle = {
    "--hero-bg": slide.theme.background,
    "--hero-glow": slide.theme.backgroundGlow,
    "--hero-primary": slide.theme.primary,
    "--hero-accent": slide.theme.accent,
    "--hero-text": slide.theme.text,
    "--hero-muted": slide.theme.muted,
    "--hero-border": slide.theme.border,
  } as CSSProperties;

  const goToPrevious = () => {
    setActiveSlide(
      activeSlide === 0 ? slides.length - 1 : activeSlide - 1
    );
  };

  const goToNext = () => {
    setActiveSlide(
      activeSlide === slides.length - 1 ? 0 : activeSlide + 1
    );
  };

  return (
    <section
      id="home"
      className="hero-section hero-slideshow-section"
      style={heroStyle}
    >
      <div className="hero-container">

        {/* LEFT SIDE */}
        <div className="hero-content">

          <div className="hero-badge">
            ✦ Electronics • Furniture • Home
          </div>

          <h1>
            Everything Your Home
            <br />
            <span>Needs. All in One Place.</span>
          </h1>

          <p className="hero-description">
            Quality electronics and furniture, right here in Bhiwani.
          </p>

          <div className="hero-rating">
            <span className="stars">★★★★★</span>

            <span className="rating-number">
              4.2/5
            </span>

            <span className="review-text">
              • 15 reviews
            </span>
          </div>

          <div className="hero-buttons">

            <a
              href="tel:+919729802008"
              className="hero-button primary-button"
            >
              📞 Call Now
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Arrow+City+Electronic+Hub+Bhiwani+Haryana+127021"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-button secondary-button"
            >
              📍 Get Directions
            </a>

          </div>

          <div className="hero-location">
            <span>📍</span>

            <div>
              <strong>Find Us in Bhiwani</strong>

              <p>
                Bhiwani–Rohtak Road, Near New Bus Stand
              </p>
            </div>
          </div>

        </div>


        {/* RIGHT SIDE — SLIDESHOW */}
        <div className="hero-image-wrapper">

          <div className="hero-image-card hero-slideshow-card">

            <div
              key={slide.id}
              className="hero-slide-image"
            >
              <img
                src={slide.src}
                alt={`Arrow City showroom image ${slide.id}`}
                className="hero-slide-photo"
              />
            </div>


            {/* PREVIOUS */}
            <button
              type="button"
              className="hero-slide-arrow hero-slide-arrow-left"
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              ←
            </button>


            {/* NEXT */}
            <button
              type="button"
              className="hero-slide-arrow hero-slide-arrow-right"
              onClick={goToNext}
              aria-label="Next slide"
            >
              →
            </button>


            {/* DOTS */}
            <div className="hero-slide-dots">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={
                    index === activeSlide
                      ? "hero-slide-dot active"
                      : "hero-slide-dot"
                  }
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>


            {/* COUNTER */}
            <div className="hero-slide-counter">
              {String(activeSlide + 1).padStart(2, "0")}
              {" / "}
              {String(slides.length).padStart(2, "0")}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}