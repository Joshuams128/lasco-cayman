import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  salePrice?: number;
  images?: Array<{ asset: { _ref: string } }>;
  category?: { name: string; slug: { current: string } };
  inStock: boolean;
}

interface Category {
  _id: string;
  name: string;
  slug: { current: string };
}

async function getProducts(category?: string) {
  const filter = category
    ? `*[_type == "product" && category->slug.current == $category]`
    : `*[_type == "product"]`;

  return client.fetch<Product[]>(
    `${filter} | order(name asc) {
      _id, name, slug, price, salePrice, images, inStock,
      category->{ name, slug }
    }`,
    category ? { category } : {}
  );
}

async function getCategories() {
  return client.fetch<Category[]>(
    `*[_type == "category"] | order(name asc) { _id, name, slug }`
  );
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(category),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex gap-10">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 md:block">
          <h2 className="mb-5 text-xs font-bold uppercase tracking-widest text-gray-400">Categories</h2>
          <ul className="space-y-1">
            <li>
              <Link
                href="/shop"
                className={`block rounded-lg px-3 py-2 text-sm transition ${!category ? "bg-primary/10 font-semibold text-primary" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
              >
                See All
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat._id}>
                <Link
                  href={`/shop?category=${cat.slug.current}`}
                  className={`block rounded-lg px-3 py-2 text-sm transition ${category === cat.slug.current ? "bg-primary/10 font-semibold text-primary" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {category
              ? categories.find((c) => c.slug.current === category)?.name || "Shop"
              : "All Products"}
          </h1>

          <p className="mt-3 mb-8 flex items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Product availability and prices are subject to change.
          </p>

          {/* Mobile category filter */}
          <div className="mb-8 flex gap-2 overflow-x-auto pb-1 md:hidden">
            <Link
              href="/shop"
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition ${!category ? "bg-primary text-white shadow-sm" : "border border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary"}`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/shop?category=${cat.slug.current}`}
                className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition ${category === cat.slug.current ? "bg-primary text-white shadow-sm" : "border border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary"}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {products.length === 0 ? (
            <p className="py-12 text-center text-gray-400">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((product) => {
                const imageUrl = product.images?.[0]
                  ? urlFor(product.images[0]).width(300).height(300).url()
                  : null;

                return (
                  <div key={product._id} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
                    {/* Product Image */}
                    <Link href={`/shop/${product.slug.current}`}>
                      <div className="relative aspect-square overflow-hidden bg-gray-50/50">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            className="object-contain p-5 transition duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          </div>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                            <span className="rounded-full bg-gray-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
                              Out of Stock
                            </span>
                          </div>
                        )}

                        {/* Quick View overlay */}
                        <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-gray-900/90 to-gray-900/70 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white transition-transform duration-300 group-hover:translate-y-0">
                          Quick View
                        </div>
                      </div>
                    </Link>

                    {/* Product Info */}
                    <Link href={`/shop/${product.slug.current}`} className="block px-4 pb-4 pt-3">
                      {product.category && (
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                          {product.category.name}
                        </p>
                      )}
                      <h3 className="mt-1.5 text-sm font-bold leading-snug text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="mt-3 flex items-baseline gap-2">
                        {product.salePrice ? (
                          <>
                            <span className="text-lg font-extrabold text-primary">
                              ${product.salePrice.toFixed(2)}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-extrabold text-primary">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {product.salePrice && (
                        <p className="mt-1 inline-block rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600">
                          SAVE ${(product.price - product.salePrice).toFixed(2)}
                        </p>
                      )}
                    </Link>

                    {/* Hover Add to Cart - overlay on image area */}
                    {product.inStock && (
                      <div className="pointer-events-none absolute inset-x-0 top-0 aspect-square">
                        <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-auto">
                          <AddToCartButton
                            product={{
                              id: product._id,
                              name: product.name,
                              price: product.salePrice || product.price,
                              image: imageUrl || "",
                              slug: product.slug.current,
                            }}
                            variant="full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
