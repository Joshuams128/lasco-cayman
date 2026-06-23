import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Link from "next/link";
import Image from "next/image";
import HeroSlider from "@/components/home/HeroSlider";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  salePrice?: number;
  images?: Array<{ asset: { _ref: string } }>;
  category?: { name: string };
}

interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  productCount: number;
}

async function getFeaturedProducts() {
  return client.fetch<Product[]>(
    `*[_type == "product" && featured == true][0...8] {
      _id, name, slug, price, salePrice, images,
      category->{ name }
    }`
  );
}

async function getLatestProducts() {
  return client.fetch<Product[]>(
    `*[_type == "product"] | order(_createdAt desc)[0...8] {
      _id, name, slug, price, salePrice, images,
      category->{ name }
    }`
  );
}

async function getCategoriesWithCount() {
  return client.fetch<Category[]>(
    `*[_type == "category"] | order(name asc) {
      _id, name, slug,
      "productCount": count(*[_type == "product" && category._ref == ^._id])
    }`
  );
}

export default async function HomePage() {
  const [featured, latest, categories] = await Promise.all([
    getFeaturedProducts(),
    getLatestProducts(),
    getCategoriesWithCount(),
  ]);

  const displayProducts = featured.length > 0 ? featured : latest;

  return (
    <div className="bg-cream">
      <HeroSlider />

      {/* Value Propositions */}
      <section className="border-b border-warm-border bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-7 md:grid-cols-4">
          {[
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ),
              title: "Authentic Products",
              sub: "Direct from Jamaica",
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              ),
              title: "Island Delivery",
              sub: "Across Grand Cayman",
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Best Prices",
              sub: "Wholesale & retail",
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              ),
              title: "Taste of Home",
              sub: "Caribbean flavours",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal">{item.title}</p>
                <p className="text-xs text-warm-muted">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by Category */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Browse</p>
            <h2 className="mt-1 text-3xl font-bold text-charcoal">Shop by Category</h2>
            <p className="mt-2 text-sm text-warm-muted">Explore our full range of Caribbean products</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat, i) => {
              const palettes = [
                { bg: "bg-rose-50", border: "border-rose-200", dot: "bg-primary", text: "text-primary" },
                { bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500", text: "text-amber-700" },
                { bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500", text: "text-emerald-700" },
                { bg: "bg-sky-50", border: "border-sky-200", dot: "bg-sky-500", text: "text-sky-700" },
                { bg: "bg-violet-50", border: "border-violet-200", dot: "bg-violet-500", text: "text-violet-700" },
                { bg: "bg-orange-50", border: "border-orange-200", dot: "bg-orange-500", text: "text-orange-700" },
              ];
              const p = palettes[i % palettes.length];

              return (
                <Link
                  key={cat._id}
                  href={`/shop?category=${cat.slug.current}`}
                  className={`group flex flex-col justify-between rounded-2xl border ${p.border} ${p.bg} p-5 transition hover:shadow-md`}
                >
                  <div className={`h-2 w-2 rounded-full ${p.dot}`} />
                  <div className="mt-8">
                    <h3 className="text-base font-bold text-charcoal">{cat.name}</h3>
                    <p className={`mt-0.5 text-xs font-medium ${p.text}`}>
                      {cat.productCount} {cat.productCount === 1 ? "product" : "products"}
                    </p>
                    <span className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${p.text} opacity-0 transition group-hover:opacity-100`}>
                      Browse →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Featured / Latest Products */}
      <section className="bg-warm-gray py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Hand-picked</p>
              <h2 className="mt-1 text-3xl font-bold text-charcoal">
                {featured.length > 0 ? "Featured Products" : "Our Products"}
              </h2>
            </div>
            <Link
              href="/shop"
              className="rounded-full border border-warm-border bg-white px-5 py-2 text-sm font-medium text-charcoal transition hover:border-primary hover:text-primary"
            >
              View All →
            </Link>
          </div>

          {displayProducts.length === 0 ? (
            <p className="text-warm-muted">No products yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
              {displayProducts.map((product) => {
                const imageUrl = product.images?.[0]
                  ? urlFor(product.images[0]).width(400).height(400).url()
                  : null;

                return (
                  <Link
                    key={product._id}
                    href={`/shop/${product.slug.current}`}
                    className="group overflow-hidden rounded-2xl border border-warm-border bg-white transition hover:shadow-lg"
                  >
                    <div className="relative aspect-square overflow-hidden bg-white">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          className="object-contain p-4 transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-warm-muted">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="border-t border-warm-border p-4">
                      {product.category && (
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-warm-muted">
                          {product.category.name}
                        </p>
                      )}
                      <h3 className="mt-1 text-sm font-semibold text-charcoal line-clamp-2 leading-snug">
                        {product.name}
                      </h3>
                      <div className="mt-2 flex items-center gap-2">
                        {product.salePrice ? (
                          <>
                            <span className="text-base font-bold text-primary">
                              ${product.salePrice.toFixed(2)}
                            </span>
                            <span className="text-xs text-warm-muted line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-base font-bold text-primary">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-charcoal py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">LASCO Cayman</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold text-white md:text-4xl">
            A Taste of the Caribbean, Delivered to Your Door
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/60">
            From Lasco Food Drinks to authentic Jamaican canned goods &mdash; we bring the flavours of home right here to the Cayman Islands.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block rounded-full bg-primary px-10 py-3.5 text-sm font-bold text-white transition hover:bg-primary-dark"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
