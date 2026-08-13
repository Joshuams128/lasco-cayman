import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Link from "next/link";
import Image from "next/image";
import HeroSlider, { HeroSlideData } from "@/components/home/HeroSlider";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
}

interface SiteSettings {
  heroSlides?: Array<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image?: any;
    heading?: string;
    subheading?: string;
  }>;
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
      _id, name, slug, image,
      "productCount": count(*[_type == "product" && category._ref == ^._id])
    }`
  );
}

async function getSiteSettings() {
  return client.fetch<SiteSettings | null>(
    `*[_type == "siteSettings"][0] { heroSlides }`
  );
}

const VALUE_PROPS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: "Authentic Products",
    sub: "Direct from Jamaica",
    color: "primary",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Island Delivery",
    sub: "Across Grand Cayman",
    color: "sea",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Best Prices",
    sub: "Wholesale & retail",
    color: "sun",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Taste of Home",
    sub: "Caribbean flavours",
    color: "papaya",
  },
];

// Static class names so Tailwind's JIT scanner can find them (no dynamic interpolation)
const VALUE_PROP_STYLES: Record<string, { bg: string; text: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary" },
  sea: { bg: "bg-sea/10", text: "text-sea" },
  sun: { bg: "bg-sun/10", text: "text-sun" },
  papaya: { bg: "bg-papaya/10", text: "text-papaya" },
};

const CATEGORY_TILES = [
  { bg: "bg-primary", text: "text-white", textMuted: "text-white/80" },
  { bg: "bg-sea", text: "text-white", textMuted: "text-white/80" },
  { bg: "bg-sun", text: "text-charcoal", textMuted: "text-charcoal/70" },
  { bg: "bg-palm", text: "text-white", textMuted: "text-white/80" },
  { bg: "bg-papaya", text: "text-white", textMuted: "text-white/80" },
  { bg: "bg-primary-dark", text: "text-white", textMuted: "text-white/80" },
];

export default async function HomePage() {
  const [featured, latest, categories, settings] = await Promise.all([
    getFeaturedProducts(),
    getLatestProducts(),
    getCategoriesWithCount(),
    getSiteSettings(),
  ]);

  const displayProducts = featured.length > 0 ? featured : latest;

  const heroSlides: HeroSlideData[] | undefined = settings?.heroSlides
    ?.filter((s) => s.image || s.heading)
    .map((s) => ({
      imageUrl: s.image ? urlFor(s.image).width(1800).height(900).url() : undefined,
      heading: s.heading,
      subheading: s.subheading,
    }));

  return (
    <div className="bg-cream">
      <HeroSlider slides={heroSlides} />

      {/* Value Propositions */}
      <section className="border-b border-warm-border bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 md:grid-cols-4">
          {VALUE_PROPS.map((item) => {
            const style = VALUE_PROP_STYLES[item.color];
            return (
            <div
              key={item.title}
              className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-warm-gray"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${style.bg} ${style.text}`}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-charcoal">{item.title}</p>
                <p className="text-xs text-warm-muted">{item.sub}</p>
              </div>
            </div>
            );
          })}
        </div>
      </section>

      {/* Shop by Category */}
      {categories.length > 0 && (
        <section id="categories" className="mx-auto max-w-7xl px-4 py-16 scroll-mt-20">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Browse</p>
            <h2 className="mt-1 font-display text-3xl font-extrabold text-charcoal sm:text-4xl">
              Shop by Category
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-warm-muted">
              Explore our full range of Caribbean products, from pantry staples to island favourites.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat, i) => {
              const tile = CATEGORY_TILES[i % CATEGORY_TILES.length];
              const imageUrl = cat.image ? urlFor(cat.image).width(600).height(600).url() : null;

              return (
                <Link
                  key={cat._id}
                  href={`/shop?category=${cat.slug.current}`}
                  className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {imageUrl ? (
                    <>
                      <Image
                        src={imageUrl}
                        alt={cat.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                    </>
                  ) : (
                    <div className={`absolute inset-0 ${tile.bg}`}>
                      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
                      <div className="absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-black/10" />
                    </div>
                  )}
                  <div className="relative p-5">
                    <h3 className={`text-lg font-bold leading-tight ${imageUrl ? "text-white" : tile.text}`}>
                      {cat.name}
                    </h3>
                    <p className={`mt-0.5 text-xs font-semibold ${imageUrl ? "text-white/80" : tile.textMuted}`}>
                      {cat.productCount} {cat.productCount === 1 ? "product" : "products"}
                    </p>
                    <span
                      className={`mt-3 inline-flex items-center gap-1 text-xs font-bold opacity-0 transition group-hover:opacity-100 ${
                        imageUrl ? "text-white" : tile.text
                      }`}
                    >
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
      <section className="bg-warm-gray py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Hand-picked</p>
              <h2 className="mt-1 font-display text-3xl font-extrabold text-charcoal sm:text-4xl">
                {featured.length > 0 ? "Featured Products" : "Our Products"}
              </h2>
            </div>
            <Link
              href="/shop"
              className="rounded-full border border-warm-border bg-white px-5 py-2 text-sm font-semibold text-charcoal transition hover:border-primary hover:text-primary"
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
                    className="group overflow-hidden rounded-3xl border border-warm-border bg-white transition hover:-translate-y-1 hover:shadow-xl"
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
                      {product.salePrice && (
                        <span className="absolute left-3 top-3 rounded-full bg-papaya px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                          Sale
                        </span>
                      )}
                    </div>
                    <div className="border-t border-warm-border p-4">
                      {product.category && (
                        <p className="text-[10px] font-bold uppercase tracking-widest text-sea">
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
      <section className="relative overflow-hidden bg-charcoal py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-charcoal to-sea/20" />
        <div className="absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl animate-blob-float" />
        <div className="absolute -right-16 top-1/4 h-80 w-80 rounded-full bg-sun/10 blur-3xl animate-blob-float [animation-delay:3s]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-sun">LASCO Cayman</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-extrabold text-white md:text-5xl">
            A Taste of the Caribbean, Delivered to Your Door
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/60 md:text-base">
            From Lasco Food Drinks to authentic Jamaican canned goods &mdash; we bring the flavours of home right here to the Cayman Islands.
          </p>
          <Link
            href="/shop"
            className="mt-9 inline-block rounded-full bg-primary px-10 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
