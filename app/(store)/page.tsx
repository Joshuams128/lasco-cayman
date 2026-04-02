// TODO: Fetch hero slides and featured products from Sanity
// import { client } from "@/sanity/client";

export default function HomePage() {
  return (
    <div>
      {/* TODO: Hero carousel from siteSettings.heroSlides */}
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="text-5xl font-bold">Welcome to LASCO Cayman</h1>
        <p className="mt-4 text-xl">Your one-stop shop in the Cayman Islands</p>
      </section>

      {/* TODO: Featured products grid from siteSettings.featuredProducts */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold">Featured Products</h2>
        <p className="text-gray-500">
          TODO: Fetch and display featured products from Sanity
        </p>
      </section>
    </div>
  );
}
