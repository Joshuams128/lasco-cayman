import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  salePrice?: number;
  description?: string;
  images?: Array<{ asset: { _ref: string } }>;
  category?: { name: string };
  inStock: boolean;
}

async function getProduct(slug: string) {
  return client.fetch<Product | null>(
    `*[_type == "product" && slug.current == $slug][0] {
      _id, name, slug, price, salePrice, description, images, inStock,
      category->{ name }
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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-accent">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          )}
        </div>

        <div>
          {product.category && (
            <p className="text-sm text-gray-500">{product.category.name}</p>
          )}
          <h1 className="mt-1 text-3xl font-bold">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            {product.salePrice ? (
              <>
                <span className="text-3xl font-bold text-primary">
                  ${product.salePrice.toFixed(2)}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {product.description && (
            <p className="mt-6 text-gray-600">{product.description}</p>
          )}

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
        </div>
      </div>
    </div>
  );
}
