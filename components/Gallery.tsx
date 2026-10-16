
"use client";

import { useEffect, useState } from "react";

const galleryItems = [
  {
    id: 1,
    src: "/images/gallery/gallery-01.jpeg",
    title: "Our Showroom",
  },
  {
    id: 2,
    src: "/images/gallery/gallery-02.jpeg",
    title: "Electronics Collection",
  },
  {
    id: 3,
    src: "/images/gallery/gallery-03.jpeg",
    title: "Furniture Collection",
  },
  {
    id: 4,
    src: "/images/gallery/gallery-04.jpeg",
    title: "Home Appliances",
  },
  {
    id: 5,
    src: "/images/gallery/gallery-05.jpeg",
    title: "Featured Products",
  },
  {
    id: 6,
    src: "/images/gallery/gallery-06.jpeg",
    title: "Visit Arrow City",
  },
];

export default function Gallery() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");

    const updateScreen = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateScreen();
    mediaQuery.addEventListener("change", updateScreen);

    return () => {
      mediaQuery.removeEventListener("change", updateScreen);
    };
  }, []);

  const visibleItems = isMobile
    ? galleryItems.slice(0, visibleCount)
    : galleryItems;

  return (
    <section
      id="gallery"
      className="gallery-section scroll-reveal"
    >
      <div className="section-heading">
        <div className="section-badge">
          Our Gallery
        </div>

        <h2>
          Explore Our <span>Showroom</span>
        </h2>

        <p>
          Take a look at our showroom, products and collections.
        </p>
      </div>

      <div className="gallery-grid">
        {visibleItems.map((item) => (
          <div
            className="gallery-card"
            key={item.id}
          >
            <div className="gallery-image-frame">
              <img
                src={item.src}
                alt={`Arrow City ${item.title}`}
                className="gallery-image"
              />
            </div>
          </div>
        ))}
      </div>

      {isMobile && (
        <div className="gallery-actions">
          {visibleCount < galleryItems.length ? (
            <button
              type="button"
              className="more-photos-button"
              onClick={() =>
                setVisibleCount((count) =>
                  Math.min(count + 3, galleryItems.length)
                )
              }
              aria-expanded={visibleCount > 3}
            >
              More Photos ↓
            </button>
          ) : (
            <button
              type="button"
              className="more-photos-button"
              onClick={() => setVisibleCount(3)}
            >
              Show Less ↑
            </button>
          )}
        </div>
      )}
    </section>
  );
}
