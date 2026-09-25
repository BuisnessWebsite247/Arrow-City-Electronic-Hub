"use client";

import { useState } from "react";

const galleryItems = [
  { id: 1, src: "/images/gallery/gallery-01.jpeg", title: "Our Showroom" },
  { id: 2, src: "/images/gallery/gallery-02.jpeg", title: "Electronics Collection" },
  { id: 3, src: "/images/gallery/gallery-03.jpeg", title: "Furniture Collection" },
  { id: 4, src: "/images/gallery/gallery-04.jpeg", title: "Home Appliances" },
  { id: 5, src: "/images/gallery/gallery-05.jpeg", title: "Featured Products" },
  { id: 6, src: "/images/gallery/gallery-06.jpeg", title: "Visit Arrow City" },
  { id: 7, src: "/images/gallery/gallery-07.jpeg", title: "Electronics Collection" },
  { id: 8, src: "/images/gallery/gallery-08.jpeg", title: "Furniture Collection" },
  { id: 9, src: "/images/gallery/gallery-09.jpeg", title: "Showroom Interior" },
  { id: 10, src: "/images/gallery/gallery-10.jpeg", title: "Featured Products" },
  { id: 11, src: "/images/gallery/gallery-11.jpeg", title: "Electronics" },
  { id: 12, src: "/images/gallery/gallery-12.jpeg", title: "Furniture" },
  { id: 13, src: "/images/gallery/gallery-13.jpeg", title: "Home Appliances" },
  { id: 14, src: "/images/gallery/gallery-14.jpeg", title: "Showroom" },
  { id: 15, src: "/images/gallery/gallery-15.jpeg", title: "Arrow City" },
];

export default function Gallery() {
  const [showMore, setShowMore] = useState(false);

  const visibleItems = showMore
    ? galleryItems
    : galleryItems.slice(0, 6);

  return (
    <section id="gallery" className="gallery-section scroll-reveal">
      <div className="section-heading">
        <div className="section-badge">Our Gallery</div>

        <h2>
          Explore Our <span>Showroom</span>
        </h2>

        <p>
          Take a look at our showroom, products and collections.
        </p>
      </div>

      <div className="gallery-grid scroll-stagger">
        {visibleItems.map((item) => (
          <div className="gallery-card" key={item.id}>
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

      <div className="gallery-actions">
        <button
          type="button"
          className="more-photos-button"
          onClick={() => setShowMore((previous) => !previous)}
          aria-expanded={showMore}
        >
          {showMore ? "Show Less ↑" : "More Photos ↓"}
        </button>
      </div>
    </section>
  );
}