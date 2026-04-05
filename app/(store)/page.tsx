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
      <HeroSlider />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/shop" className="text-sm font-medium text-primary hover:underline">
            Shop all
          </Link>
        </div>
        {featured.length === 0 ? (
          <p className="text-gray-500">No featured products yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {featured.map((product) => (
              <Link
                key={product._id}
                href={`/shop/${product.slug.current}`}
                className="group"
              >
                <div className="relative h-40 overflow-hidden rounded-lg bg-white">
                  {product.images?.[0] && (
                    <Image
                      src={urlFor(product.images[0]).width(200).height(200).url()}
                      alt={product.name}
                      fill
                      className="object-contain p-3 transition group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    {product.salePrice ? (
                      <>
                        <span className="text-sm font-bold text-gray-900">
                          ${product.salePrice.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {product.salePrice && (
                    <p className="text-xs font-semibold text-red-600">
                      SAVE ${(product.price - product.salePrice).toFixed(2)}
                    </p>
                  )}
                  <h3 className="mt-1 text-xs font-medium text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
