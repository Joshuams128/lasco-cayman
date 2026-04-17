import { client } from "@/sanity/client";
import FaqAccordion from "./FaqAccordion";

interface Faq {
  _id: string;
  question: string;
  answer: string;
}

async function getFaqs() {
  return client.fetch<Faq[]>(
    `*[_type == "faq"] | order(_createdAt asc) {
      _id, question, answer
    }`
  );
}

export default async function FAQPage() {
  const faqs = await getFaqs();

  return (
    <div>
      {/* Header */}
      <section className="bg-primary py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="mt-2 text-white/80">Find answers to common questions about LASCO Cayman</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12">
        {faqs.length === 0 ? (
          <div className="rounded-xl border bg-gray-50 py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">FAQs Coming Soon</h2>
            <p className="mt-2 text-sm text-gray-500">
              We&apos;re putting together answers to your most common questions. Check back soon!
            </p>
          </div>
        ) : (
          <FaqAccordion faqs={faqs} />
        )}

        {/* Contact CTA */}
        <div className="mt-12 rounded-xl bg-gray-50 p-8 text-center">
          <h2 className="text-lg font-bold text-gray-900">Still have questions?</h2>
          <p className="mt-2 text-sm text-gray-600">
            Can&apos;t find what you&apos;re looking for? Reach out to us and we&apos;ll get back to you.
          </p>
          <a
            href="mailto:info@lasco-cayman.com"
            className="mt-4 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
