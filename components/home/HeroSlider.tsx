"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  "/hero/banner-1.jpg",
  "/hero/banner-2.jpg",
  "/hero/banner-3.jpg",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[500px] w-full overflow-hidden bg-white md:h-[600px]">
      {slides.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Slide ${i + 1}`}
            fill
            className="object-contain"
            priority={i === 0}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
          Welcome to LASCO Cayman
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Your one-stop shop in the Cayman Islands
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-white hover:bg-primary/90"
        >
          Shop Now
        </Link>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-3 w-3 rounded-full transition ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
