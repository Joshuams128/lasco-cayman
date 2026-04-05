"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { items, subtotal, removeItem, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
        <Link
          href="/shop"
          className="mt-4 inline-block rounded-lg bg-primary px-6 py-3 text-white hover:bg-primary/90"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="flex items-center gap-4">
              {item.image && (
                <Link href={`/shop/${item.slug}`} className="shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-contain"
                  />
                </Link>
              )}
              <div>
                <Link href={`/shop/${item.slug}`} className="font-semibold hover:text-primary">
                  {item.name}
                </Link>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
                className="rounded border px-2 py-1"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t pt-4">
        <button
          onClick={clearCart}
          className="text-gray-500 hover:text-gray-700"
        >
          Clear Cart
        </button>
        <div className="text-right">
          <p className="text-xl font-bold">
            Subtotal: ${subtotal.toFixed(2)}
          </p>
          <Link
            href="/checkout"
            className="mt-2 inline-block rounded-lg bg-primary px-8 py-3 text-white hover:bg-primary/90"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
