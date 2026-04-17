"use client";

import { useState } from "react";

interface Faq {
  _id: string;
  question: string;
  answer: string;
}

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y rounded-xl border">
      {faqs.map((faq) => {
        const isOpen = openId === faq._id;

        return (
          <div key={faq._id} className="bg-white first:rounded-t-xl last:rounded-b-xl">
            <button
              onClick={() => setOpenId(isOpen ? null : faq._id)}
              className="flex w-full items-center justify-between px-6 py-5 text-left"
            >
              <span className="pr-4 font-semibold text-gray-900">{faq.question}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? "max-h-96 pb-5" : "max-h-0"
              }`}
            >
              <p className="whitespace-pre-line px-6 text-sm leading-relaxed text-gray-600">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
