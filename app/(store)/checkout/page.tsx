"use client";

import { useCart } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useUser();

  // TODO: Implement checkout logic
  // - Create order in Sanity
  // - Process payment
  // - Send confirmation email via Resend
  // - Clear cart on success

  const handleCheckout = async () => {
    // TODO: Implement full checkout flow
    console.log("Checkout for user:", user?.id);
    console.log("Items:", items);
    console.log("Subtotal:", subtotal);
    clearCart();
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between rounded-lg border p-4"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <p className="text-xl font-bold">
              Total: ${subtotal.toFixed(2)}
            </p>
          </div>

          {/* TODO: Payment form / integration */}
          <button
            onClick={handleCheckout}
            className="mt-6 w-full rounded-lg bg-primary py-3 text-white hover:bg-primary/90"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
