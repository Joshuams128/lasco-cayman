"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, CartItem } from "@/context/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  imageUrl?: string;
  inStock: boolean;
  categoryName?: string;
}

export default function ProductCard({
  id,
  name,
  slug,
  price,
  salePrice,
  imageUrl,
  inStock,
  categoryName,
}: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const item: CartItem = {
      id,
      name,
      slug,
      price: salePrice ?? price,
      quantity: 1,
      image: imageUrl,
    };
    addItem(item);
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-warm-border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/shop/${slug}`}>
        <div className="relative aspect-square overflow-hidden bg-warm-gray/50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-contain p-5 transition duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-warm-border">
              No Image
            </div>
          )}
          {salePrice && (
            <span className="absolute left-3 top-3 rounded-full bg-papaya px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
              Sale
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        {categoryName && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-sea">{categoryName}</p>
        )}
        <Link href={`/shop/${slug}`}>
          <h3 className="mt-1 text-sm font-bold leading-snug text-charcoal hover:text-primary line-clamp-2">
            {name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          {salePrice ? (
            <>
              <span className="text-lg font-extrabold text-primary">
                ${salePrice.toFixed(2)}
              </span>
              <span className="text-sm text-warm-muted line-through">
                ${price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-lg font-extrabold text-primary">${price.toFixed(2)}</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="mt-3 w-full rounded-xl bg-primary py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:shadow-md hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
