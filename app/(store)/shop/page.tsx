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
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 border-r pr-6 md:block">
          <h2 className="mb-4 text-lg font-bold">Categories</h2>
          <ul className="space-y-3">
            <li>
              <Link
                href="/shop"
                className={`text-sm hover:text-primary ${!category ? "font-bold text-primary" : "text-gray-700"}`}
              >
                See All
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat._id}>
                <Link
                  href={`/shop?category=${cat.slug.current}`}
                  className={`text-sm hover:text-primary ${category === cat.slug.current ? "font-bold text-primary" : "text-gray-700"}`}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <h1 className="mb-2 text-2xl font-bold">
            {category
              ? categories.find((c) => c.slug.current === category)?.name || "Shop"
              : "All Products"}
          </h1>

          <p className="mb-6 flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">
            <span>&#9432;</span>
            Product availability and prices are subject to change.
          </p>

          {/* Mobile category filter */}
          <div className="mb-6 flex gap-2 overflow-x-auto md:hidden">
            <Link
              href="/shop"
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm ${!category ? "bg-primary text-white" : "bg-white text-gray-700"}`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/shop?category=${cat.slug.current}`}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm ${category === cat.slug.current ? "bg-primary text-white" : "bg-white text-gray-700"}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {products.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((product) => {
                const imageUrl = product.images?.[0]
                  ? urlFor(product.images[0]).width(300).height(300).url()
                  : null;

                return (
                  <div key={product._id} className="group relative">
                    {/* Product Image */}
                    <Link href={`/shop/${product.slug.current}`}>
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            className="object-contain p-2 transition group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-gray-300">
                            No image
                          </div>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                            <span className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Add Button */}
                    {product.inStock && (
                      <div className="absolute right-2 top-2">
                        <AddToCartButton
                          product={{
                            id: product._id,
                            name: product.name,
                            price: product.salePrice || product.price,
                            image: imageUrl || "",
                            slug: product.slug.current,
                          }}
                          variant="icon"
                        />
                      </div>
                    )}

                    {/* Product Info */}
                    <Link href={`/shop/${product.slug.current}`} className="mt-3 block">
                      <div className="flex items-center gap-2">
                        {product.salePrice ? (
                          <>
                            <span className="text-base font-bold text-red-600">
                              ${product.salePrice.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-base font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {product.salePrice && (
                        <p className="text-xs font-semibold text-red-600">
                          SAVE ${(product.price - product.salePrice).toFixed(2)}
                        </p>
                      )}
                      <h3 className="mt-1 text-sm font-medium text-gray-900">
                        {product.name}
                      </h3>
                    </Link>
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
