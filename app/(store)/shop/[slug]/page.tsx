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
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/" className="transition hover:text-primary">Home</Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <Link href="/shop" className="transition hover:text-primary">Shop</Link>
        {product.category && (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link
              href={`/shop?category=${product.category.slug.current}`}
              className="transition hover:text-primary"
            >
              {product.category.name}
            </Link>
          </>
        )}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="font-medium text-gray-700 line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-contain p-8"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          {product.category && (
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              {product.category.name}
            </p>
          )}
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-5">
            {product.salePrice ? (
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-primary">
                    ${product.salePrice.toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-300 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <span className="mt-2 inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                  SAVE ${(product.price - product.salePrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-4xl font-extrabold text-primary">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="mt-5">
            {product.inStock ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                Out of Stock
              </span>
            )}
          </div>

          {product.description && (
            <div className="mt-8 border-t pt-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Description
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {product.description}
              </p>
            </div>
          )}

          <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
            Product availability and prices are subject to change based on offers
            available at pick-up or delivery time.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-3">
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
              className="flex items-center gap-2 rounded-xl border-2 border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:border-primary hover:text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              Add to List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
