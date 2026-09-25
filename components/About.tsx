export default function About() {
  return (
    <section
      id="about"
      className="about-section scroll-reveal"
    >
      <div className="about-container">

        {/* IMAGE */}
        <div className="about-image-wrapper">
          <div className="about-image-card">
            <img
              src="/images/about/about-01.jpeg"
              alt="Arrow City Electronic Hub showroom"
              className="about-image"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="about-content">

          <div className="section-badge">
            About Arrow City
          </div>

          <h2>
            Your Local Destination for
            <span> Electronics & Furniture</span>
          </h2>

          <p>
            Arrow City Electronic Hub is a showroom located on
            Bhiwani–Rohtak Road, near New Bus Stand, Bhiwani,
            Haryana.
          </p>

          <p>
            The showroom offers a combination of electronics
            and furniture, giving customers a convenient place
            to explore products for their homes.
          </p>

          {/* DETAILS */}
          <div className="about-details">

            <div className="about-detail">
              <span>📍</span>

              <div>
                <strong>Convenient Location</strong>

                <p>
                  Near New Bus Stand, Bhiwani
                </p>
              </div>
            </div>

            <div className="about-detail">
              <span>🛍️</span>

              <div>
                <strong>Electronics & Furniture</strong>

                <p>
                  Explore products for your home
                </p>
              </div>
            </div>

            <div className="about-detail">
              <span>⭐</span>

              <div>
                <strong>Customer Rated</strong>

                <p>
                  4.2/5 based on 15 reviews
                </p>
              </div>
            </div>

          </div>

          <a
            href="https://wa.me/919729802008?text=Hello%20Arrow%20City%20Electronic%20Hub%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="about-button"
          >
            Contact Us on WhatsApp →
          </a>

        </div>

      </div>
    </section>
  );
}