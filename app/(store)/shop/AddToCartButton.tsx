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
  inStock?: boolean;
  variant?: "full" | "icon";
}

export default function AddToCartButton({
  product,
  inStock = true,
  variant = "full",
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  if (variant === "icon") {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addItem({ ...product, quantity: 1 });
        }}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-lg font-bold text-white shadow-md transition hover:bg-primary/90"
      >
        +
      </button>
    );
  }

  return (
    <button
      onClick={() => addItem({ ...product, quantity: 1 })}
      disabled={!inStock}
      className="rounded bg-primary px-6 py-2 text-sm font-bold uppercase text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {inStock ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}
