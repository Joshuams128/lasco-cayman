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
}

export default function ProductCard({
  id,
  name,
  slug,
  price,
  salePrice,
  imageUrl,
  inStock,
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
    <div className="group rounded-lg border bg-white p-4 transition-shadow hover:shadow-lg">
      <Link href={`/shop/${slug}`}>
        <div className="relative aspect-square overflow-hidden rounded-md bg-accent">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
      </Link>

      <div className="mt-3">
        <Link href={`/shop/${slug}`}>
          <h3 className="font-semibold hover:text-primary">{name}</h3>
        </Link>

        <div className="mt-1 flex items-center gap-2">
          {salePrice ? (
            <>
              <span className="text-lg font-bold text-primary">
                ${salePrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold">${price.toFixed(2)}</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="mt-3 w-full rounded-lg bg-primary py-2 text-sm text-white hover:bg-primary/90 disabled:bg-gray-300"
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
