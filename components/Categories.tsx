"use client";

import { useState } from "react";

const comboItems = [
  {
    id: 1,
    name: "Item 01",
    image: "/images/combo/combo-01.jpeg",
  },
  {
    id: 2,
    name: "Item 02",
    image: "/images/combo/combo-02.jpeg",
  },
  {
    id: 3,
    name: "Item 03",
    image: "/images/combo/combo-03.jpeg",
  },
  {
    id: 4,
    name: "Item 04",
    image: "/images/combo/combo-04.jpeg",
  },
  {
    id: 5,
    name: "Item 05",
    image: "/images/combo/combo-05.jpeg",
  },
  {
    id: 6,
    name: "Item 06",
    image: "/images/combo/combo-06.jpeg",
  },
  {
    id: 7,
    name: "Item 07",
    image: "/images/combo/combo-07.jpeg",
  },
  {
    id: 8,
    name: "Item 08",
    image: "/images/combo/combo-08.jpeg",
  },
  {
    id: 9,
    name: "Item 09",
    image: "/images/combo/combo-09.jpeg",
  },
  {
    id: 10,
    name: "Item 10",
    image: "/images/combo/combo-10.jpeg",
  },
  {
    id: 11,
    name: "Item 11",
    image: "/images/combo/combo-11.jpeg",
  },
  {
    id: 12,
    name: "Item 12",
    image: "/images/combo/combo-12.jpeg",
  },
  {
    id: 13,
    name: "Item 13",
    image: "/images/combo/combo-13.jpeg",
  },
  {
    id: 14,
    name: "Item 14",
    image: "/images/combo/combo-14.jpeg",
  },
  {
    id: 15,
    name: "Item 15",
    image: "/images/combo/combo-15.jpeg",
  },
  {
    id: 16,
    name: "Item 16",
    image: "/images/combo/combo-16.jpeg",
  },
  {
    id: 17,
    name: "Item 17",
    image: "/images/combo/combo-17.jpeg",
  },
  {
    id: 18,
    name: "Item 18",
    image: "/images/combo/combo-18.jpeg",
  },
  {
    id: 19,
    name: "Item 19",
    image: "/images/combo/combo-19.jpeg",
  },
  {
    id: 20,
    name: "Item 20",
    image: "/images/combo/combo-20.jpeg",
  },
  {
    id: 21,
    name: "Item 21",
    image: "/images/combo/combo-21.jpeg",
  },
];

export default function Categories() {
  const [showCombo, setShowCombo] = useState(false);

  return (
    <>
      <section
        id="products"
        className="categories-section scroll-reveal"
      >
        <div className="section-heading">
          <div className="section-badge">
            What We Offer
          </div>

          <h2>
            Everything For Your
            <span> Home</span>
          </h2>

          <p>
            From modern electronics to comfortable furniture,
            discover products for every part of your home.
          </p>
        </div>

        <div className="categories-grid scroll-stagger">

          {/* ELECTRONICS */}
          <div className="category-card">
            <div className="category-icon">
              📺
            </div>

            <h3>Electronics</h3>

            <p>
              Explore TVs, audio systems, coolers,
              and other modern electronics.
            </p>

            <a
              href="https://wa.me/919729802008?text=Hello%20Arrow%20City%20Electronic%20Hub%2C%20I%20would%20like%20to%20know%20more%20about%20your%20electronics."
              target="_blank"
              rel="noopener noreferrer"
              className="category-link"
            >
              Enquire Now →
            </a>
          </div>


          {/* FURNITURE */}
          <div className="category-card">
            <div className="category-icon">
              🛋️
            </div>

            <h3>Furniture</h3>

            <p>
              Find comfortable and stylish furniture
              for your home and living spaces.
            </p>

            <a
              href="https://wa.me/919729802008?text=Hello%20Arrow%20City%20Electronic%20Hub%2C%20I%20would%20like%20to%20know%20more%20about%20your%20furniture."
              target="_blank"
              rel="noopener noreferrer"
              className="category-link"
            >
              Enquire Now →
            </a>
          </div>


          {/* COMBO PACKAGE */}
          <button
            type="button"
            className="category-card combo-package-card"
            onClick={() => setShowCombo(true)}
          >
            <div className="category-icon">
              🏠
            </div>

            <div className="combo-badge">
              SPECIAL PACKAGE
            </div>

            <h3>Combo Package</h3>

            <p>
              21 Furniture + Electronics items
              together in one complete home package.
            </p>

            <div className="combo-price">
              ₹81,000/-
            </div>

            <span className="category-link">
              View Package →
            </span>
          </button>

        </div>
      </section>


      {/* =====================================================
          COMBO PACKAGE MODAL
      ===================================================== */}

      {showCombo && (
        <div
          className="combo-modal-overlay"
          onClick={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setShowCombo(false);
            }
          }}
        >
          <div className="combo-modal">

            {/* HEADER */}
            <div className="combo-modal-header">

              <div>
                <div className="combo-modal-badge">
                  SPECIAL COMBO
                </div>

                <h2>
                  21-Item Home Package
                </h2>

                <p>
                  Furniture + Electronics
                </p>
              </div>

              <button
                type="button"
                className="combo-close-button"
                onClick={() => setShowCombo(false)}
                aria-label="Close package"
              >
                ×
              </button>

            </div>


            {/* PRICE */}
            <div className="combo-modal-price">
              <span>Complete Package</span>
              <strong>₹81,000/-</strong>
            </div>


            {/* ITEMS */}
            <div className="combo-items-grid">
              {comboItems.map((item) => (
                <div
                  className="combo-item"
                  key={item.id}
                >
                  <div className="combo-item-image">
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  </div>

                  <h3>{item.name}</h3>
                </div>
              ))}
            </div>


            {/* FOOTER */}
            <div className="combo-modal-footer">

              <p>
                Interested in this package?
              </p>

              <a
                href="https://wa.me/919729802008?text=Hello%20Arrow%20City%20Electronic%20Hub%2C%20I%20am%20interested%20in%20the%20%E2%82%B981%2C000%20combo%20package."
                target="_blank"
                rel="noopener noreferrer"
                className="combo-enquire-button"
              >
                Enquire on WhatsApp →
              </a>

            </div>

          </div>
        </div>
      )}
    </>
  );
}