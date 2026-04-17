"use client";

import { useState, useCallback } from "react";
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
  const [added, setAdded] = useState(false);

  const handleAdd = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      addItem({ ...product, quantity: 1 });
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    },
    [addItem, product]
  );

  if (variant === "icon") {
    return (
      <button
        onClick={handleAdd}
        className={`flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold text-white shadow-md transition duration-200 hover:scale-110 ${added ? "bg-emerald-500" : "bg-primary hover:bg-primary/90"}`}
      >
        {added ? "\u2713" : "+"}
      </button>
    );
  }

  return (
    <button
      onClick={() => handleAdd()}
      disabled={!inStock}
      className={`rounded-xl px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition duration-200 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 ${added ? "bg-emerald-500" : "bg-primary hover:bg-primary/90"}`}
    >
      {!inStock ? "Out of Stock" : added ? "\u2713 Added to Cart" : "Add to Cart"}
    </button>
  );
}
