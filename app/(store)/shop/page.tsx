import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Link from "next/link";
import Image from "next/image";

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
      <h1 className="mb-8 text-3xl font-bold">Shop</h1>

      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 md:block">
          <h2 className="mb-4 text-lg font-semibold">Categories</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/shop"
                className={`hover:text-primary ${!category ? "font-bold text-primary" : ""}`}
              >
                All Products
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat._id}>
                <Link
                  href={`/shop?category=${cat.slug.current}`}
                  className={`hover:text-primary ${category === cat.slug.current ? "font-bold text-primary" : ""}`}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1">
          {products.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product._id}
                  href={`/shop/${product.slug.current}`}
                  className="group overflow-hidden rounded-lg border bg-white transition hover:shadow-lg"
                >
                  <div className="relative aspect-square bg-accent">
                    {product.images?.[0] && (
                      <Image
                        src={urlFor(product.images[0]).width(400).height(400).url()}
                        alt={product.name}
                        fill
                        className="object-cover transition group-hover:scale-105"
                      />
                    )}
                    {!product.inStock && (
                      <span className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs text-white">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    {product.category && (
                      <p className="text-xs text-gray-500">{product.category.name}</p>
                    )}
                    <h3 className="mt-1 font-semibold">{product.name}</h3>
                    <div className="mt-2 flex items-center gap-2">
                      {product.salePrice ? (
                        <>
                          <span className="text-lg font-bold text-primary">
                            ${product.salePrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
