"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

export interface HeroProduct {
  src: string;
  alt: string;
}

export interface HeroSlideData {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  chips?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  theme?: string;
  products?: HeroProduct[];
  /** Full-bleed background photo. Optional — themes render without one. */
  imageUrl?: string;
}

interface Theme {
  gradient: string;
  blobA: string;
  blobB: string;
  eyebrow: string;
  chip: string;
  heading: string;
  body: string;
  outlineBtn: string;
}

/**
 * `sun` is a light background, so its text flips to charcoal. White on the
 * yellow end of that gradient lands around 1.8:1 contrast, which fails WCAG AA.
 */
const THEMES: Record<string, Theme> = {
  magenta: {
    gradient: "bg-gradient-to-br from-primary via-primary-dark to-papaya-dark",
    blobA: "bg-sun/20",
    blobB: "bg-white/10",
    eyebrow: "text-sun",
    chip: "bg-white/15 text-white",
    heading: "text-white",
    body: "text-white/90",
    outlineBtn: "border-white/70 text-white hover:border-white hover:bg-white/10",
  },
  sea: {
    gradient: "bg-gradient-to-br from-sea via-sea-dark to-palm-dark",
    blobA: "bg-sun/20",
    blobB: "bg-white/10",
    eyebrow: "text-sun",
    chip: "bg-white/15 text-white",
    heading: "text-white",
    body: "text-white/90",
    outlineBtn: "border-white/70 text-white hover:border-white hover:bg-white/10",
  },
  sun: {
    gradient: "bg-gradient-to-br from-sun via-papaya to-papaya-dark",
    blobA: "bg-white/25",
    blobB: "bg-charcoal/10",
    eyebrow: "text-charcoal",
    chip: "bg-charcoal/15 text-charcoal",
    heading: "text-charcoal",
    body: "text-charcoal/80",
    outlineBtn:
      "border-charcoal/60 text-charcoal hover:border-charcoal hover:bg-charcoal/10",
  },
};

/** Fallback content — real LASCO products, shown until Sanity slides exist. */
const DEFAULT_SLIDES: HeroSlideData[] = [
  {
    eyebrow: "LASCO Cayman",
    heading: "A Taste of the Caribbean",
    subheading:
      "Authentic Jamaican staples delivered across Grand Cayman — wholesale and retail.",
    chips: ["Island delivery", "Wholesale pricing", "Direct from Jamaica"],
    ctaLabel: "Shop All Products",
    ctaHref: "/shop",
    theme: "magenta",
    products: [
      { src: "/products/chocolate-lasoy-80g.webp", alt: "LASCO Chocolate LaSoy" },
      { src: "/products/green-peas.webp", alt: "LASCO Green Peas" },
      { src: "/products/oats-porridge-banana.webp", alt: "LASCO Oats Porridge Mix Banana" },
    ],
  },
  {
    eyebrow: "Breakfast & Little Ones",
    heading: "Mornings Made Easy",
    subheading:
      "Baby Yum cereals and LASCO porridge mixes — wholesome, fortified, ready in minutes.",
    chips: ["Iron & vitamins", "6 months+", "Just add water"],
    ctaLabel: "Shop Breakfast",
    ctaHref: "/shop",
    theme: "sea",
    products: [
      { src: "/products/by-corn.webp", alt: "Baby Yum Corn cereal" },
      { src: "/products/by-5cereal-fruits.webp", alt: "Baby Yum 5 Cereal with Fruits" },
      { src: "/products/oats-porridge-cinnamon.webp", alt: "LASCO Oats Porridge Mix Cinnamon" },
    ],
  },
  {
    eyebrow: "Pantry Staples",
    heading: "Stock Up & Save",
    subheading:
      "Canned beans, peas and vegetables by the case — the shelf essentials, always in stock.",
    chips: ["Buy by the case", "Free delivery over CI$99", "Always in stock"],
    ctaLabel: "Shop Pantry",
    ctaHref: "/shop",
    theme: "sun",
    products: [
      { src: "/products/baked-beans.webp", alt: "LASCO Baked Beans in tomato sauce" },
      { src: "/products/sweet-corn.webp", alt: "LASCO Sweet Corn" },
      { src: "/products/red-kidney-beans.webp", alt: "LASCO Red Kidney Beans" },
    ],
  },
];

/**
 * Staggered placement so the products read as a group, not a row.
 *
 * Sized by HEIGHT rather than width: the packshots have wildly different
 * aspect ratios (tall sachets vs. squat cereal tins), and matching widths
 * would render the landscape ones visibly undersized.
 *
 * Count scales down with the viewport — three products crammed into a phone
 * width shrinks each one below the point where the label is readable:
 *   < 640px  2 products
 *   ≥ 640px  3 products
 *   ≥ 1024px 4 products (when a 4th is supplied)
 */
const PRODUCT_LAYOUT = [
  "z-10 h-[140px] flex-1 translate-y-3 sm:h-[170px] sm:translate-y-5 md:h-[210px] lg:h-[260px]",
  "z-20 h-[176px] flex-1 -translate-y-1 sm:h-[205px] sm:-translate-y-2 md:h-[260px] lg:h-[320px]",
  "z-10 hidden h-[140px] flex-1 translate-y-4 sm:block sm:h-[170px] sm:translate-y-7 md:h-[210px] lg:h-[260px]",
  "z-0 hidden h-[180px] flex-1 translate-y-10 lg:block lg:h-[220px]",
];

export default function HeroSlider({ slides }: { slides?: HeroSlideData[] }) {
  const displaySlides =
    slides && slides.length > 0
      ? slides.map((s, i) => ({ ...DEFAULT_SLIDES[i % DEFAULT_SLIDES.length], ...s }))
      : DEFAULT_SLIDES;

  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((p) => (p + 1) % displaySlides.length),
    [displaySlides.length]
  );
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + displaySlides.length) % displaySlides.length),
    [displaySlides.length]
  );

  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="relative h-[640px] w-full overflow-hidden md:h-[600px]">
      {displaySlides.map((slide, i) => {
        const theme = THEMES[slide.theme || "magenta"] || THEMES.magenta;
        const active = i === current;
        const products = slide.products || [];

        return (
          <div
            key={i}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {/* Background */}
            {slide.imageUrl ? (
              <>
                <Image
                  src={slide.imageUrl}
                  alt=""
                  fill
                  priority={i === 0}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/50 to-charcoal/20" />
              </>
            ) : (
              <div className={`absolute inset-0 ${theme.gradient}`}>
                <div
                  className={`absolute -left-24 -top-24 h-96 w-96 rounded-full ${theme.blobA} blur-3xl animate-blob-float`}
                />
                <div
                  className={`absolute -bottom-32 -right-10 h-[30rem] w-[30rem] rounded-full ${theme.blobB} blur-3xl animate-blob-float [animation-delay:3s]`}
                />
              </div>
            )}

            <div className="relative mx-auto flex h-full max-w-7xl items-center px-4">
              <div className="grid w-full items-center gap-5 sm:gap-6 md:grid-cols-2">
                {/* Copy */}
                <div className="max-w-xl text-center md:text-left">
                  {slide.eyebrow && (
                    <p
                      className={`text-xs font-bold uppercase tracking-widest ${theme.eyebrow}`}
                    >
                      {slide.eyebrow}
                    </p>
                  )}
                  <h1
                    className={`mt-2 font-display text-3xl font-extrabold leading-[1.05] drop-shadow-sm sm:text-4xl md:text-5xl lg:text-6xl ${theme.heading} ${
                      active ? "animate-fade-up" : ""
                    }`}
                  >
                    {slide.heading}
                  </h1>
                  {slide.subheading && (
                    <p className={`mx-auto mt-3 max-w-md text-sm sm:mt-4 sm:text-base md:mx-0 ${theme.body}`}>
                      {slide.subheading}
                    </p>
                  )}

                  {/* Claim chips — real HTML, so they stay crisp and reflow */}
                  {slide.chips && slide.chips.length > 0 && (
                    <div className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-5 md:justify-start">
                      {slide.chips.map((c) => (
                        <span
                          key={c}
                          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm ${theme.chip}`}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 md:justify-start">
                    <Link
                      href={slide.ctaHref || "/shop"}
                      className="rounded-full bg-white px-6 py-3 text-sm font-bold text-charcoal shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:px-8 sm:py-3.5"
                    >
                      {slide.ctaLabel || "Shop Now"}
                    </Link>
                    <Link
                      href="#categories"
                      className={`rounded-full border-2 px-6 py-3 text-sm font-bold transition sm:px-8 sm:py-3.5 ${theme.outlineBtn}`}
                    >
                      Browse Categories
                    </Link>
                  </div>
                </div>

                {/* Product cutouts */}
                {products.length > 0 && (
                  <div className="mx-auto flex w-full max-w-[300px] items-end justify-center gap-2 sm:max-w-none">
                    {products.slice(0, 4).map((p, pi) => (
                      <div
                        key={p.src}
                        className={`relative ${PRODUCT_LAYOUT[pi]} ${
                          active ? "animate-fade-up" : "opacity-0"
                        }`}
                        style={active ? { animationDelay: `${120 + pi * 110}ms` } : undefined}
                      >
                        <Image
                          src={p.src}
                          alt={p.alt}
                          fill
                          sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 20vw"
                          priority={i === 0 && pi < 2}
                          className="object-contain drop-shadow-2xl"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30 sm:flex"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30 sm:flex"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 gap-2.5">
        {displaySlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === current ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
