"use client";

import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Amit Kumar",
    rating: 5,
    text: "Great collection of electronics and home products. 👍 Very helpful staff and a smooth shopping experience! 😊",
    image: "https://i.pravatar.cc/120?img=12",
  },
  {
    id: 2,
    name: "Neha Sharma",
    rating: 5,
    text: "Really liked the variety of furniture and electronics. 🛋️📺 Good place for home shopping.",
    image: "https://i.pravatar.cc/120?img=47",
  },
  {
    id: 3,
    name: "Rahul Verma",
    rating: 4,
    text: "Good showroom with a nice collection. 👍 Staff was cooperative and helpful. 😊",
    image: "https://i.pravatar.cc/120?img=33",
  },
  {
    id: 4,
    name: "Pooja Mehta",
    rating: 5,
    text: "Found some great options for my home here. 🏠✨ Good variety and convenient location.",
    image: "https://i.pravatar.cc/120?img=44",
  },
  {
    id: 5,
    name: "Vikas Yadav",
    rating: 5,
    text: "Nice experience! 👌 Good electronics collection and the staff explained everything properly.",
    image: "https://i.pravatar.cc/120?img=11",
  },
  {
    id: 6,
    name: "Riya Singh",
    rating: 4,
    text: "A convenient place to explore furniture and appliances. 🛍️ Overall a good experience.",
    image: "https://i.pravatar.cc/120?img=49",
  },
  {
    id: 7,
    name: "Manoj Gupta",
    rating: 5,
    text: "Good products at a local showroom with plenty of options. 👍😊 Worth checking out.",
    image: "https://i.pravatar.cc/120?img=15",
  },
  {
    id: 8,
    name: "Simran Kaur",
    rating: 5,
    text: "Loved the furniture collection! 🛋️❤️ The showroom has some really useful home products.",
    image: "https://i.pravatar.cc/120?img=32",
  },
  {
    id: 9,
    name: "Deepak Saini",
    rating: 4,
    text: "Good range of electronics and appliances. 📺🔌 Staff was friendly and helpful.",
    image: "https://i.pravatar.cc/120?img=68",
  },
  {
    id: 10,
    name: "Anjali Verma",
    rating: 5,
    text: "Very convenient location near the bus stand. 📍 Found what I was looking for without any hassle.",
    image: "https://i.pravatar.cc/120?img=45",
  },
  {
    id: 11,
    name: "Rohit Malik",
    rating: 5,
    text: "Nice showroom and good variety of products. ⭐ The overall experience was very good.",
    image: "https://i.pravatar.cc/120?img=52",
  },
  {
    id: 12,
    name: "Kavita Sharma",
    rating: 4,
    text: "Good selection for home needs. 🏠😊 Helpful service and plenty of things to explore.",
    image: "https://i.pravatar.cc/120?img=48",
  },
  {
    id: 13,
    name: "Sandeep Kumar",
    rating: 5,
    text: "Good collection and friendly service. 👍 Would visit again for future home purchases.",
    image: "https://i.pravatar.cc/120?img=53",
  },
  {
    id: 14,
    name: "Priya Kapoor",
    rating: 5,
    text: "A nice place for both furniture and electronics. 🛋️📱 Good variety under one roof.",
    image: "https://i.pravatar.cc/120?img=23",
  },
  {
    id: 15,
    name: "Nitin Dahiya",
    rating: 4,
    text: "Overall a good shopping experience. 😊 Good range of products and convenient location.",
    image: "https://i.pravatar.cc/120?img=57",
  },
];

/* Duplicate the reviews for seamless looping */
const scrollingReviews = [...reviews, ...reviews];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [animate, setAnimate] = useState(true);

  const trackRef = useRef<HTMLDivElement>(null);

  /* Calculate exact width of one card + gap */
  useEffect(() => {
    const updateStep = () => {
      const track = trackRef.current;

      if (!track) return;

      const firstCard =
        track.querySelector<HTMLElement>(".review-card");

      if (!firstCard) return;

      const cardWidth = firstCard.getBoundingClientRect().width;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.gap || "0");

      setStep(cardWidth + gap);
    };

    updateStep();

    window.addEventListener("resize", updateStep);

    return () => {
      window.removeEventListener("resize", updateStep);
    };
  }, []);

  /* Move exactly ONE review every 3 seconds */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => current + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  /*
    Once the duplicated set reaches the same visual position,
    silently reset to the original set.
  */
  useEffect(() => {
    if (currentIndex !== reviews.length) return;

    const timer = setTimeout(() => {
      setAnimate(false);
      setCurrentIndex(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
        });
      });
    }, 850);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const trackStyle = {
    transform: `translate3d(-${currentIndex * step}px, 0, 0)`,
    transition: animate
      ? "transform 0.85s cubic-bezier(0.65, 0, 0.35, 1)"
      : "none",
  };

  return (
    <section
      id="reviews"
      className="reviews-section scroll-reveal"
    >
      <div className="section-heading reviews-heading">
        <div className="section-badge">
          Customer Reviews
        </div>

        <h2>
          What Our <span>Customers Say</span>
        </h2>

        <p>
          Rated 4.2 out of 5 based on 15 customer reviews.
        </p>
      </div>

      <div className="review-rating-box">
        <strong>4.2</strong>

        <div className="rating-stars">
          ★★★★★
        </div>

        <span>15 Reviews</span>
      </div>

      <div className="reviews-carousel">
        <div
          ref={trackRef}
          className="reviews-track"
          style={trackStyle}
        >
          {scrollingReviews.map((review, index) => (
            <article
              className="review-card"
              key={`${review.id}-${index}`}
            >
              <div className="review-stars">
                {"★".repeat(review.rating)}
                <span className="empty-stars">
                  {"★".repeat(5 - review.rating)}
                </span>
              </div>

              <p className="review-comment">
                {review.text}
              </p>

              <div className="review-author">
                <img
                  src={review.image}
                  alt={review.name}
                  className="review-avatar-image"
                />

                <div className="review-author-info">
                  <strong>{review.name}</strong>
                  <span>Customer Review</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}