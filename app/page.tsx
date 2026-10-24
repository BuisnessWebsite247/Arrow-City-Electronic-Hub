"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import ScrollAnimations from "@/components/ScrollAnimations";

export const heroSlides = [
  // 1. Existing hero-03
  {
    id: 1,
    src: "/images/hero-slideshow/hero-03.jpg",
    theme: {
      background: "#F1F7FF",
      backgroundGlow: "rgba(27, 103, 196, 0.16)",
      primary: "#1F63B7",
      accent: "#FCA311",
      text: "#17365C",
      muted: "rgba(23, 54, 92, 0.68)",
      border: "rgba(31, 99, 183, 0.17)",
    },
  },

  // 2. Existing hero-06
  {
    id: 2,
    src: "/images/hero-slideshow/hero-06.jpg",
    theme: {
      background: "#FAF4EC",
      backgroundGlow: "rgba(191, 126, 66, 0.14)",
      primary: "#9A6235",
      accent: "#FCA311",
      text: "#4C3828",
      muted: "rgba(76, 56, 40, 0.66)",
      border: "rgba(154, 98, 53, 0.16)",
    },
  },

  // 3. Washing machine — hero-01
  {
    id: 3,
    src: "/images/hero-slideshow/hero-01.jpg",
    theme: {
      background: "#F3F9FF",
      backgroundGlow: "rgba(70, 160, 235, 0.16)",
      primary: "#2878C8",
      accent: "#FCA311",
      text: "#19324D",
      muted: "rgba(25, 50, 77, 0.68)",
      border: "rgba(40, 120, 200, 0.18)",
    },
  },

  // 4. Existing hero-05
  {
    id: 4,
    src: "/images/hero-slideshow/hero-05.jpg",
    theme: {
      background: "#F1F4F9",
      backgroundGlow: "rgba(27, 54, 105, 0.15)",
      primary: "#1D417E",
      accent: "#FCA311",
      text: "#18253A",
      muted: "rgba(24, 37, 58, 0.68)",
      border: "rgba(29, 65, 126, 0.16)",
    },
  },

  // 5. Sofa collection
  {
    id: 5,
    src: "/images/hero-slideshow/hero-sofa.jpeg",
    theme: {
      background: "#F5F0E9",
      backgroundGlow: "rgba(100, 75, 58, 0.16)",
      primary: "#49362D",
      accent: "#D7AD76",
      text: "#302721",
      muted: "rgba(48, 39, 33, 0.70)",
      border: "rgba(73, 54, 45, 0.20)",
    },
  },

  // 6. Almira collection
  {
    id: 6,
    src: "/images/hero-slideshow/hero-almira.jpeg",
    theme: {
      background: "#FFF4F5",
      backgroundGlow: "rgba(104, 25, 49, 0.15)",
      primary: "#74243D",
      accent: "#D9A36C",
      text: "#401B28",
      muted: "rgba(64, 27, 40, 0.70)",
      border: "rgba(116, 36, 61, 0.20)",
    },
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const activeTheme = heroSlides[activeSlide].theme;

  const homeTheme = {
    "--home-primary": activeTheme.primary,
    "--home-accent": activeTheme.accent,
    "--home-border": activeTheme.border,
  } as CSSProperties;

  return (
    <>
      <div className="home-hero-shell" style={homeTheme}>
        <Navbar />

        <Hero
          slides={heroSlides}
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
        />
      </div>

      <main>
        <ScrollAnimations />
        <Categories />
        <About />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
    </>
  );
}