"use client";

import { useCart, CartItem as CartItemType } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div className="flex items-center gap-4 rounded-lg border p-3">
      <div className="h-16 w-16 shrink-0 rounded-md bg-accent">
        {/* TODO: Render product image */}
      </div>

      <div className="flex-1">
        <h4 className="text-sm font-semibold">{item.name}</h4>
        <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>

        <div className="mt-1 flex items-center gap-2">
          <select
            value={item.quantity}
            onChange={(e) =>
              updateQuantity(item.id, parseInt(e.target.value))
            }
            className="rounded border px-1 py-0.5 text-sm"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <button
            onClick={() => removeItem(item.id)}
            className="text-xs text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="text-sm font-semibold">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}
