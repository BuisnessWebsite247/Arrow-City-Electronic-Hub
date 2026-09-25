export default function Contact() {
  return (
    <section
      id="contact"
      className="contact-section scroll-reveal"
    >

      <div className="contact-container">

        {/* LEFT SIDE */}
        <div className="contact-content">

          <div className="section-badge">
            Contact Us
          </div>

          <h2>
            Visit Our
            <span> Showroom</span>
          </h2>

          <p className="contact-description">
            Have questions or looking for something specific?
            Get in touch or visit us in Bhiwani.
          </p>

          {/* CONTACT DETAILS */}

          <div className="contact-details">

            <div className="contact-detail">

              <div className="contact-icon">
                📍
              </div>

              <div>
                <strong>
                  Our Address
                </strong>

                <p>
                  Bhiwani–Rohtak Road, near New Bus Stand,
                  Bank Colony, Old Bharat Nagar, Bhiwani,
                  Haryana 127021
                </p>
              </div>

            </div>


            <div className="contact-detail">

              <div className="contact-icon">
                📞
              </div>

              <div>
                <strong>
                  Phone
                </strong>

                <p>
                  +91 97298 02008
                </p>
              </div>

            </div>


            <div className="contact-detail">

              <div className="contact-icon">
                🕐
              </div>

              <div>
                <strong>
                  Opening Hours
                </strong>

                <p>
                  Monday – Saturday: 9:30 AM – 8:00 PM
                  <br />
                  Sunday: 11:00 AM – 3:00 PM
                </p>
              </div>

            </div>

          </div>


          {/* BUTTONS */}

          <div className="contact-buttons">

            <a
              href="tel:+919729802008"
              className="contact-button call-button"
            >
              📞 Call Now
            </a>

            <a
              href="https://wa.me/919729802008?text=Hello%20Arrow%20City%20Electronic%20Hub%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button whatsapp-contact-button"
            >
              💬 WhatsApp
            </a>

          </div>

        </div>


        {/* RIGHT SIDE — MAP */}

        <div className="contact-map-wrapper scroll-reveal-right">

          <div className="map-card">

            <iframe
              src="https://www.google.com/maps?q=Arrow+City+Electronic+Hub,+Bhiwani,+Haryana+127021&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Arrow City Electronic Hub location"
            />

          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Arrow+City+Electronic+Hub+Bhiwani+Haryana+127021"
            target="_blank"
            rel="noopener noreferrer"
            className="directions-button"
          >
            📍 Get Directions →
          </a>

        </div>

      </div>

    </section>
  );
}