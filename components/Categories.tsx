"use client";

import { useState } from "react";

const comboItems = [
  { id: 1, name: "Double Bed", image: "/images/combo/combo-01.jpeg" },
  { id: 2, name: "Fridge", image: "/images/combo/combo-02.jpeg" },
  { id: 3, name: "Smart TV", image: "/images/combo/combo-03.jpeg" },
  { id: 4, name: "Sofa Set", image: "/images/combo/combo-04.jpeg" },
  { id: 5, name: "Washing Machine", image: "/images/combo/combo-05.jpeg" },
  { id: 6, name: "Cooler", image: "/images/combo/combo-06.jpeg" },
  { id: 7, name: "Almira", image: "/images/combo/combo-07.jpeg" },
  { id: 8, name: "Table", image: "/images/combo/combo-08.jpeg" },
  { id: 9, name: "Dressing", image: "/images/combo/combo-09.jpeg" },
  { id: 10, name: "Gas Stove", image: "/images/combo/combo-10.jpeg" },
  {
    id: 11,
    name: "Kitchen Bartan Set (51 Piece)",
    image: "/images/combo/combo-11.jpeg",
  },
  {
    id: 12,
    name: "Serving Machine",
    image: "/images/combo/combo-12.jpeg",
  },
  { id: 13, name: "Mattress", image: "/images/combo/combo-13.jpeg" },
  { id: 14, name: "Pillow", image: "/images/combo/combo-14.jpeg" },
  {
    id: 15,
    name: "Mixer Grinder",
    image: "/images/combo/combo-15.jpeg",
  },
  { id: 16, name: "Iron", image: "/images/combo/combo-16.jpeg" },
  { id: 17, name: "Blanket", image: "/images/combo/combo-17.jpeg" },
  { id: 18, name: "Bedsheet", image: "/images/combo/combo-18.jpeg" },
  { id: 19, name: "Hand Mixer", image: "/images/combo/combo-19.jpeg" },
  { id: 20, name: "Wall Clock", image: "/images/combo/combo-20.jpeg" },
  { id: 21, name: "Stool", image: "/images/combo/combo-21.jpeg" },
];

/* Suggested lists — verify these with the client */
const electronicsItems = [
  "Smart TVs",
  "LED TVs",
  "Refrigerators",
  "Double Door Refrigerators",
  "Single Door Refrigerators",
  "Washing Machines",
  "Semi-Automatic Washing Machines",
  "Fully Automatic Washing Machines",
  "Air Coolers",
  "Air Conditioners",
  "Ceiling Fans",
  "Table Fans",
  "Room Heaters",
  "Water Heaters",
  "Home Theatre Systems",
  "Soundbars",
  "Bluetooth Speakers",
  "Mixer Grinders",
  "Hand Mixers",
  "Electric Irons",
  "Gas Stoves",
  "Kitchen Appliances",
  "Microwave Ovens",
  "Electric Kettles",
  "Other Home Electronics",
];

const furnitureItems = [
  "Double Beds",
  "Single Beds",
  "Sofa Sets",
  "3-Seater Sofas",
  "2-Seater Sofas",
  "Dining Tables",
  "Dining Chairs",
  "Center Tables",
  "Study Tables",
  "Computer Tables",
  "Dressing Tables",
  "Almirahs",
  "Wardrobes",
  "Storage Cabinets",
  "TV Units",
  "Side Tables",
  "Chairs",
  "Stools",
  "Mattresses",
  "Pillows",
  "Blankets",
  "Bedsheets",
  "Shoe Racks",
  "Bookshelves",
  "Home Furniture",
];

type ActiveModal = "combo" | "electronics" | "furniture" | null;

export default function Categories() {
  const [activeModal, setActiveModal] =
    useState<ActiveModal>(null);

  return (
    <>
      <section
        id="products"
        className="categories-section new-offers-section scroll-reveal"
      >
        <div className="section-heading offers-heading">
          <div className="section-badge">What We Offer</div>

          <h2>
            Everything For Your
            <span> Home</span>
          </h2>

          <p>
            Furniture, electronics and complete home solutions.
          </p>
        </div>

        <div className="offers-grid">

          {/* =================================================
              COMBO PACKAGE
          ================================================= */}

          <button
            type="button"
            className="combo-feature-card"
            onClick={() => setActiveModal("combo")}
          >
            <div className="combo-feature-top">
              <span className="combo-feature-tag">
                SPECIAL COMBO PACKAGE
              </span>

              <span className="combo-feature-icon">
                🏠
              </span>
            </div>

            <div className="combo-feature-heading">
              <h3>
                21 Items
                <span> in One Package</span>
              </h3>

              <p>Furniture + Electronics</p>
            </div>

            <div className="combo-items-list">
              {comboItems.map((item) => (
                <span key={item.id}>
                  {item.name}
                </span>
              ))}
            </div>

            <div className="combo-feature-bottom">
              <div>
                <small>PACKAGE PRICE</small>
                <strong>₹81,000/-</strong>
              </div>

              <span className="combo-view-package">
                View Items →
              </span>
            </div>
          </button>


          {/* =================================================
              ELECTRONICS
          ================================================= */}

          <button
            type="button"
            className="offer-side-card electronics-offer-card"
            onClick={() => setActiveModal("electronics")}
          >
            <div className="side-card-icon">
              📺
            </div>

            <div className="side-card-content">
              <h3>Electronics</h3>

              <p>
                Explore electronics and appliances for
                everyday home needs.
              </p>
            </div>

            <span className="side-card-link">
              View Products →
            </span>
          </button>


          {/* =================================================
              FURNITURE
          ================================================= */}

          <button
            type="button"
            className="offer-side-card furniture-offer-card"
            onClick={() => setActiveModal("furniture")}
          >
            <div className="side-card-icon">
              🛋️
            </div>

            <div className="side-card-content">
              <h3>Furniture</h3>

              <p>
                Discover comfortable and stylish furniture
                for every room.
              </p>
            </div>

            <span className="side-card-link">
              View Products →
            </span>
          </button>

        </div>
      </section>


      {/* =====================================================
          ELECTRONICS MODAL
      ===================================================== */}

      {activeModal === "electronics" && (
        <ProductListModal
          title="Electronics"
          subtitle="Electronics & Home Appliances"
          icon="📺"
          items={electronicsItems}
          onClose={() => setActiveModal(null)}
        />
      )}


      {/* =====================================================
          FURNITURE MODAL
      ===================================================== */}

      {activeModal === "furniture" && (
        <ProductListModal
          title="Furniture"
          subtitle="Furniture for Every Room"
          icon="🛋️"
          items={furnitureItems}
          onClose={() => setActiveModal(null)}
        />
      )}


      {/* =====================================================
          COMBO MODAL
      ===================================================== */}

      {activeModal === "combo" && (
        <div
          className="combo-modal-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setActiveModal(null);
            }
          }}
        >
          <div className="combo-modal">

            <div className="combo-modal-header">
              <div>
                <div className="combo-modal-badge">
                  SPECIAL COMBO
                </div>

                <h2>21-Item Home Package</h2>

                <p>Furniture + Electronics</p>
              </div>

              <button
                type="button"
                className="combo-close-button"
                onClick={() => setActiveModal(null)}
                aria-label="Close package"
              >
                ×
              </button>
            </div>

            <div className="combo-modal-price">
              <span>Complete Package</span>
              <strong>₹81,000/-</strong>
            </div>

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


/* =========================================================
   REUSABLE TEXT LIST MODAL
========================================================= */

function ProductListModal({
  title,
  subtitle,
  icon,
  items,
  onClose,
}: {
  title: string;
  subtitle: string;
  icon: string;
  items: string[];
  onClose: () => void;
}) {
  return (
    <div
      className="product-list-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="product-list-modal">

        <div className="product-list-header">

          <div className="product-list-title-area">
            <div className="product-list-icon">
              {icon}
            </div>

            <div>
              <div className="product-list-label">
                ARROW CITY
              </div>

              <h2>{title}</h2>

              <p>{subtitle}</p>
            </div>
          </div>

          <button
            type="button"
            className="product-list-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>

        </div>


        <div className="product-list-divider"></div>


        <div className="product-list-grid">
          {items.map((item, index) => (
            <div
              className="product-list-item"
              key={item}
            >
              <span className="product-list-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="product-list-bullet"></span>

              <span className="product-list-name">
                {item}
              </span>
            </div>
          ))}
        </div>


        <div className="product-list-footer">
          <span>
            Looking for something specific?
          </span>

          <a
            href="https://wa.me/919729802008?text=Hello%20Arrow%20City%20Electronic%20Hub%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
          >
            Enquire on WhatsApp →
          </a>
        </div>

      </div>
    </div>
  );
}