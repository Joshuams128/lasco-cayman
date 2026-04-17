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
    <div>
      <HeroSlider />

      {/* Value Propositions */}
      <section className="border-b bg-gray-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 md:grid-cols-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Authentic Products</p>
              <p className="text-xs text-gray-500">Direct from Jamaica</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Island Delivery</p>
              <p className="text-xs text-gray-500">Across Grand Cayman</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Best Prices</p>
              <p className="text-xs text-gray-500">Wholesale & retail</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Taste of Home</p>
              <p className="text-xs text-gray-500">Caribbean flavours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
            <p className="mt-1 text-sm text-gray-500">Browse our full range of Caribbean products</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat, i) => {
              const bgColors = [
                "from-primary/90 to-pink-600",
                "from-amber-500 to-orange-600",
                "from-emerald-500 to-green-600",
                "from-sky-500 to-blue-600",
                "from-violet-500 to-purple-600",
                "from-rose-500 to-red-600",
              ];
              const bg = bgColors[i % bgColors.length];

              return (
                <Link
                  key={cat._id}
                  href={`/shop?category=${cat.slug.current}`}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br p-6 text-white shadow-md transition hover:shadow-lg"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${bg} transition group-hover:scale-105`} />
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold">{cat.name}</h3>
                    <p className="mt-1 text-sm text-white/80">
                      {cat.productCount} {cat.productCount === 1 ? "product" : "products"}
                    </p>
                    <span className="mt-3 inline-block text-sm font-medium underline underline-offset-2">
                      Browse &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Featured / Latest Products */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {featured.length > 0 ? "Featured Products" : "Our Products"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">Hand-picked for you</p>
            </div>
            <Link
              href="/shop"
              className="rounded-full border border-primary px-5 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
            >
              View All
            </Link>
          </div>

          {displayProducts.length === 0 ? (
            <p className="text-gray-500">No products yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {displayProducts.map((product) => {
                const imageUrl = product.images?.[0]
                  ? urlFor(product.images[0]).width(300).height(300).url()
                  : null;

                return (
                  <Link
                    key={product._id}
                    href={`/shop/${product.slug.current}`}
                    className="group overflow-hidden rounded-lg border bg-white transition hover:shadow-md"
                  >
                    <div className="relative aspect-square overflow-hidden bg-white">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          className="object-contain p-3 transition group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-300">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      {product.category && (
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          {product.category.name}
                        </p>
                      )}
                      <h3 className="mt-1 text-xs font-bold text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="mt-2 flex items-center gap-2">
                        {product.salePrice ? (
                          <>
                            <span className="text-sm font-bold text-primary">
                              ${product.salePrice.toFixed(2)}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-bold text-primary">
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
      <section className="bg-primary py-14">
        <div className="mx-auto max-w-7xl px-4 text-center text-white">
          <h2 className="text-3xl font-bold md:text-4xl">
            A Taste of the Caribbean, Delivered to Your Door
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            From Lasco Food Drinks to authentic Jamaican canned goods &mdash; we bring the flavours of home right here to the Cayman Islands.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 text-sm font-bold text-primary transition hover:bg-gray-100"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
