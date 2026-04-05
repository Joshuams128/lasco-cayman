import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "../AddToCartButton";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  salePrice?: number;
  description?: string;
  images?: Array<{ asset: { _ref: string } }>;
  category?: { name: string; slug: { current: string } };
  inStock: boolean;
}

async function getProduct(slug: string) {
  return client.fetch<Product | null>(
    `*[_type == "product" && slug.current == $slug][0] {
      _id, name, slug, price, salePrice, description, images, inStock,
      category->{ name, slug }
    }`,
    { slug }
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return notFound();

  const displayPrice = product.salePrice ?? product.price;
  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(600).height(600).url()
    : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">&gt;</span>
        <Link href="/shop" className="hover:text-primary">Shop</Link>
        {product.category && (
          <>
            <span className="mx-2">&gt;</span>
            <Link
              href={`/shop?category=${product.category.slug.current}`}
              className="hover:text-primary"
            >
              {product.category.name}
            </Link>
          </>
        )}
        <span className="mx-2">&gt;</span>
        <span className="text-gray-700">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-300">
              No image
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <div className="mt-4">
            {product.salePrice ? (
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.salePrice.toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-red-600">
                  SAVE ${(product.price - product.salePrice).toFixed(2)}
                </p>
              </div>
            ) : (
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {product.description && (
            <>
              <h2 className="mt-8 text-lg font-bold text-gray-900">
                Product Description
              </h2>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </>
          )}

          <p className="mt-6 text-sm text-gray-500">
            Product availability and prices are subject to change based on offers
            available at pick-up or delivery time.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <AddToCartButton
              product={{
                id: product._id,
                name: product.name,
                price: displayPrice,
                slug: product.slug.current,
                image: imageUrl ?? undefined,
              }}
              inStock={product.inStock}
            />
            <Link
              href="/wishlist"
              className="rounded-lg border-2 border-gray-300 px-8 py-3 font-medium text-gray-700 hover:border-primary hover:text-primary"
            >
              Add to List
            </Link>
          </div>

          {/* Stock Status */}
          <div className="mt-6">
            {product.inStock ? (
              <p className="flex items-center gap-2 text-sm font-medium text-green-600">
                <span className="text-lg">&#10003;</span> Currently in stock
              </p>
            ) : (
              <p className="flex items-center gap-2 text-sm font-medium text-red-600">
                <span className="text-lg">&#10007;</span> Out of stock
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
