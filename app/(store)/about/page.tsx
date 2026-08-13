import Image from "next/image";

export default function AboutPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-charcoal py-16 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-charcoal to-sea/20" />
        <div className="absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-papaya/10 blur-3xl animate-blob-float" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-sun">Since 2005</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold">About LASCO Cayman</h1>
          <p className="mt-3 text-lg text-white/80">
            Exclusive distributors of LASCO products in the Cayman Islands since 2005
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12">
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
              <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  LASCO Cayman is part of the Cayman Enterprises Ltd company, offering products and
                  services that deliver value and cost efficiencies to the customers of the Cayman
                  Islands. In operation since 2005, we are the exclusive distributors for the LASCO
                  brand in the Cayman Islands.
                </p>
                <p>
                  We also distribute Tropical Delight Fruit Juices out of Toronto, Canada. We supply
                  all major retail outlets in the Cayman Islands and provide direct channel-focused
                  marketing and sales services via our sales &amp; trade representatives supported by
                  our management team.
                </p>
              </div>
            </div>
            <div className="relative mx-auto h-72 w-full max-w-sm overflow-hidden rounded-2xl bg-gray-100 md:h-80">
              <Image
                src="/images/logo.png"
                alt="LASCO Cayman"
                fill
                className="object-contain p-10"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">What We Stand For</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-warm-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-sea/10 text-sea">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-charcoal">Quality First</h3>
              <p className="mt-2 text-sm text-charcoal/70">
                Every product we carry meets the highest standards. As exclusive LASCO distributors,
                we ensure authenticity and freshness across every item we stock.
              </p>
            </div>

            <div className="rounded-2xl border border-warm-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-papaya/10 text-papaya">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-charcoal">Community</h3>
              <p className="mt-2 text-sm text-charcoal/70">
                We are deeply involved in the Cayman Islands community &mdash; sponsoring the SDA
                Annual 10K Run, the Winds of Hope 5K, and supporting a Children&apos;s Home, a Drug
                Rehabilitation Center, and the George Town Soup Kitchen for over 10 years.
              </p>
            </div>

            <div className="rounded-2xl border border-warm-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-palm/10 text-palm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-charcoal">Accessibility</h3>
              <p className="mt-2 text-sm text-charcoal/70">
                Due to consumer demand for wholesale quantities, we launched this online store. We
                sell in minimums of 6 units with free delivery on orders over CI$99. Pay by card or
                on delivery.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="rounded-2xl bg-warm-gray p-8">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div>
              <p className="font-display text-3xl font-extrabold text-primary">20+</p>
              <p className="mt-1 text-sm text-charcoal/70">Years in Operation</p>
            </div>
            <div>
              <p className="font-display text-3xl font-extrabold text-sea">20+</p>
              <p className="mt-1 text-sm text-charcoal/70">Retail Partners</p>
            </div>
            <div>
              <p className="font-display text-3xl font-extrabold text-papaya">50+</p>
              <p className="mt-1 text-sm text-charcoal/70">Products Available</p>
            </div>
            <div>
              <p className="font-display text-3xl font-extrabold text-palm">1000+</p>
              <p className="mt-1 text-sm text-charcoal/70">Happy Customers</p>
            </div>
          </div>
        </section>
      </div>

      {/* Get In Touch */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-papaya-dark py-14">
        <div className="mx-auto max-w-3xl px-4 text-center text-white">
          <h2 className="text-3xl font-bold">Get In Touch</h2>
          <p className="mt-2 text-white/80">We operate exclusively in the Cayman Islands.</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <p className="text-sm font-semibold">Email</p>
              <a href="mailto:lascocayman@gmail.com" className="mt-1 text-sm text-white/80 hover:text-white">
                lascocayman@gmail.com
              </a>
            </div>

            <div>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <p className="text-sm font-semibold">Phone</p>
              <a href="tel:345-326-3726" className="mt-1 text-sm text-white/80 hover:text-white">
                345-326-3726
              </a>
            </div>

            <div>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </div>
              <p className="text-sm font-semibold">Facebook</p>
              <a href="https://www.facebook.com/LascoCaymanDistributors" target="_blank" rel="noopener noreferrer" className="mt-1 text-sm text-white/80 hover:text-white">
                @Lasco Cayman Distributors
              </a>
            </div>
          </div>

          <a
            href="/contact"
            className="mt-9 inline-block rounded-full bg-white px-8 py-3 text-sm font-bold text-primary transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Visit our Contact Page →
          </a>
        </div>
      </section>
    </div>
  );
}
