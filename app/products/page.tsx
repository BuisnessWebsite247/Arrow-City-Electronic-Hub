"use client";

import { useMemo, useState } from "react";
import { products, type Product } from "@/data/products";

type CategoryFilter = "All" | "Furniture" | "Electronics";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState<CategoryFilter>("All");
  const [subcategory, setSubcategory] =
    useState("All");
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const subcategories = useMemo(() => {
    const filtered =
      category === "All"
        ? products
        : products.filter(
            (product) => product.category === category
          );

    return [
      "All",
      ...Array.from(
        new Set(
          filtered.map(
            (product) => product.subcategory
          )
        )
      ),
    ];
  }, [category]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subcategory.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesSubcategory =
        subcategory === "All" ||
        product.subcategory === subcategory;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubcategory
      );
    });
  }, [search, category, subcategory]);

  const handleCategoryChange = (
    nextCategory: CategoryFilter
  ) => {
    setCategory(nextCategory);
    setSubcategory("All");
  };

  return (
    <main className="products-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="products-hero">
        <div className="products-hero-inner">

          <div className="products-eyebrow">
            ARROW CITY ELECTRONIC HUB
          </div>

          <h1>
            Shop Our
            <span> Products</span>
          </h1>

          <p>
            Explore furniture, electronics and home
            essentials available at our showroom.
          </p>

          {/* SEARCH */}
          <div className="products-search">
            <span>⌕</span>

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search beds, TVs, sofas, fridges..."
              aria-label="Search products"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* POPULAR SEARCHES */}
          <div className="popular-searches">
            <span>Popular:</span>

            {[
              "Beds",
              "Sofas",
              "Smart TV",
              "Fridge",
              "Washing Machine",
            ].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setSearch(item)}
              >
                {item}
              </button>
            ))}
          </div>

        </div>
      </section>


      {/* =================================================
          PRODUCT AREA
      ================================================= */}

      <section className="products-content">

        {/* CATEGORY TABS */}

        <div className="products-category-tabs">
          {(
            [
              "All",
              "Furniture",
              "Electronics",
            ] as CategoryFilter[]
          ).map((item) => (
            <button
              type="button"
              key={item}
              className={
                category === item
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleCategoryChange(item)
              }
            >
              {item}
            </button>
          ))}
        </div>


        {/* SUBCATEGORY */}

        <div className="products-subcategories">
          {subcategories.map((item) => (
            <button
              type="button"
              key={item}
              className={
                subcategory === item
                  ? "active"
                  : ""
              }
              onClick={() =>
                setSubcategory(item)
              }
            >
              {item}
            </button>
          ))}
        </div>


        {/* RESULTS HEADER */}

        <div className="products-results-header">
          <div>
            <h2>
              {search
                ? `Results for "${search}"`
                : "All Products"}
            </h2>

            <p>
              {filteredProducts.length} products
            </p>
          </div>
        </div>


        {/* PRODUCT GRID */}

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <article
                className="catalog-product-card"
                key={product.id}
              >

                <button
                  type="button"
                  className="catalog-product-image"
                  onClick={() =>
                    setSelectedProduct(product)
                  }
                  aria-label={`View ${product.name}`}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  ) : (
                    <div className="product-image-placeholder">
                      <span>
                        {product.category ===
                        "Furniture"
                          ? "🛋️"
                          : "📺"}
                      </span>

                      <small>
                        Image coming soon
                      </small>
                    </div>
                  )}
                </button>


                <div className="catalog-product-info">

                  <span className="catalog-product-category">
                    {product.subcategory}
                  </span>

                  <h3>
                    {product.name}
                  </h3>

                  <div className="catalog-product-bottom">

                    <strong>
                      {product.price !== null
                        ? `₹${product.price.toLocaleString("en-IN")}`
                        : "Price coming soon"}
                    </strong>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedProduct(product)
                      }
                    >
                      View →
                    </button>

                  </div>

                </div>

              </article>
            ))}
          </div>
        ) : (
          <div className="products-empty">
            <div>⌕</div>

            <h3>
              No products found
            </h3>

            <p>
              Try searching for another product
              or choose a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSubcategory("All");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

      </section>


      {/* =================================================
          PRODUCT DETAILS MODAL
      ================================================= */}

      {selectedProduct && (
        <div
          className="product-details-overlay"
          onClick={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedProduct(null);
            }
          }}
        >
          <div className="product-details-modal">

            <button
              type="button"
              className="product-details-close"
              onClick={() =>
                setSelectedProduct(null)
              }
              aria-label="Close product details"
            >
              ×
            </button>

            <div className="product-details-image">
              {selectedProduct.image ? (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                />
              ) : (
                <div className="product-details-placeholder">
                  <span>
                    {selectedProduct.category ===
                    "Furniture"
                      ? "🛋️"
                      : "📺"}
                  </span>

                  <p>
                    Product image will be added
                  </p>
                </div>
              )}
            </div>

            <div className="product-details-content">

              <span className="catalog-product-category">
                {selectedProduct.subcategory}
              </span>

              <h2>
                {selectedProduct.name}
              </h2>

              <p>
                {selectedProduct.description}
              </p>

              <div className="product-details-price">
                {selectedProduct.price !== null
                  ? `₹${selectedProduct.price.toLocaleString("en-IN")}`
                  : "Price coming soon"}
              </div>

              <div className="product-details-actions">

                <a
                  href={`https://wa.me/919729802008?text=${encodeURIComponent(
                    `Hello Arrow City Electronic Hub, I am interested in ${selectedProduct.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Enquiry →
                </a>

                <a
                  href="tel:+919729802008"
                >
                  Call Showroom
                </a>

              </div>

            </div>

          </div>
        </div>
      )}

    </main>
  );
}