"use client";

import { useState, FormEvent } from "react";

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Send feedback via API route (Resend email or save to Sanity)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-primary">Thank You!</h1>
        <p className="mt-4 text-gray-600">
          Your feedback has been submitted successfully.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Feedback</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            className="mt-1 w-full rounded-lg border px-4 py-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border px-4 py-2"
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            required
            className="mt-1 w-full rounded-lg border px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-primary py-3 text-white hover:bg-primary/90"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
