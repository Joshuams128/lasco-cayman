"use client";

import { useState, FormEvent } from "react";

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");

  const handleTrack = async (e: FormEvent) => {
    e.preventDefault();
    // TODO: Fetch order by orderNumber from Sanity
    // Display order status
    console.log("Tracking order:", orderNumber);
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Order Tracking</h1>

      <form onSubmit={handleTrack} className="space-y-4">
        <div>
          <label htmlFor="orderNumber" className="block font-medium">
            Order Number
          </label>
          <input
            id="orderNumber"
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
            placeholder="Enter your order number"
            className="mt-1 w-full rounded-lg border px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-primary py-3 text-white hover:bg-primary/90"
        >
          Track Order
        </button>
      </form>

      {/* TODO: Display order status result */}
    </div>
  );
}
