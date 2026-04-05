"use client";

import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    slug: string;
    image?: string;
  };
  inStock: boolean;
}

export default function AddToCartButton({ product, inStock }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem({ ...product, quantity: 1 })}
      disabled={!inStock}
      className="mt-6 rounded-lg bg-primary px-8 py-3 text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {inStock ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}
