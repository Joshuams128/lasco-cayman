"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

export interface HeroSlideData {
  imageUrl?: string;
  heading?: string;
  subheading?: string;
}

interface DefaultSlide {
  heading: string;
  subheading: string;
  gradientClass: string;
}

const DEFAULT_SLIDES: DefaultSlide[] = [
  {
    heading: "A Taste of the Caribbean",
    subheading: "Direct from Jamaica to your door, anywhere across Grand Cayman.",
    gradientClass: "from-primary via-primary-dark to-papaya",
  },
  {
    heading: "Stocked Fresh, Always Authentic",
    subheading: "Wholesale and retail pricing on the brands you grew up with.",
    gradientClass: "from-sea via-sea-dark to-palm",
  },
  {
    heading: "Island Delivery, Every Week",
    subheading: "From LASCO Food Drinks to authentic canned Caribbean staples.",
    gradientClass: "from-sun via-papaya to-primary",
  },
];

export default function HeroSlider({ slides }: { slides?: HeroSlideData[] }) {
  const displaySlides =
    slides && slides.length > 0
      ? slides.map((s, i) => {
          const fallback = DEFAULT_SLIDES[i % DEFAULT_SLIDES.length];
          return {
            imageUrl: s.imageUrl,
            heading: s.heading || fallback.heading,
            subheading: s.subheading || fallback.subheading,
            gradientClass: fallback.gradientClass,
          };
        })
      : DEFAULT_SLIDES.map((s) => ({ ...s, imageUrl: undefined as string | undefined }));

  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % displaySlides.length);
  }, [displaySlides.length]);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + displaySlides.length) % displaySlides.length);
  }, [displaySlides.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[560px] w-full overflow-hidden sm:h-[640px] md:h-[600px]">
      {displaySlides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {slide.imageUrl ? (
            <>
              <Image
                src={slide.imageUrl}
                alt={slide.heading}
                fill
                priority={i === 0}
                className={`object-cover transition-transform duration-[6000ms] ease-out ${
                  i === current ? "scale-110" : "scale-100"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/10" />
            </>
          ) : (
            <div className={`relative h-full w-full bg-gradient-to-br ${slide.gradientClass}`}>
              <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-blob-float" />
              <div className="absolute -bottom-32 -right-16 h-[28rem] w-[28rem] rounded-full bg-charcoal/10 blur-3xl animate-blob-float [animation-delay:2s]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,0,0,0.25),_transparent_60%)]" />
            </div>
          )}

          <div className="relative flex h-full items-center">
            <div className="mx-auto w-full max-w-7xl px-4">
              <div className="max-w-xl">
                <p className="mb-3 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                  LASCO Cayman
                </p>
                <h1
                  className={`font-display text-4xl font-extrabold leading-[1.05] text-white drop-shadow-sm sm:text-5xl md:text-6xl ${
                    i === current ? "animate-fade-up" : ""
                  }`}
                >
                  {slide.heading}
                </h1>
                <p className="mt-4 max-w-md text-base text-white/90 sm:text-lg">
                  {slide.subheading}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/shop"
                    className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-charcoal shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Shop Now
                  </Link>
                  <Link
                    href="#categories"
                    className="rounded-full border-2 border-white/70 px-8 py-3.5 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
                  >
                    Browse Categories
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30 sm:flex"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30 sm:flex"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
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
