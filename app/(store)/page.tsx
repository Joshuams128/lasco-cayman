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
}

async function getFeaturedProducts() {
  return client.fetch<Product[]>(
    `*[_type == "product" && featured == true][0...8] {
      _id, name, slug, price, salePrice, images
    }`
  );
}

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <div>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="text-5xl font-bold">Welcome to LASCO Cayman</h1>
        <p className="mt-4 text-xl">Your one-stop shop in the Cayman Islands</p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-primary hover:bg-gray-100"
        >
          Shop Now
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold">Featured Products</h2>
        {featured.length === 0 ? (
          <p className="text-gray-500">No featured products yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
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
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{product.name}</h3>
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
      </section>
    </div>
  );
}
