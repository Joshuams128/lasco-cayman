import { client } from "@/sanity/client";

interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
  facebookUrl?: string;
  hours?: string[];
}

interface SiteSettings {
  contactInfo?: ContactInfo;
}

async function getSiteSettings() {
  return client.fetch<SiteSettings | null>(
    `*[_type == "siteSettings"][0] { contactInfo }`
  );
}

// Real details pulled from the current live site — used as a fallback
// until an editor fills in siteSettings.contactInfo in Sanity.
const DEFAULT_CONTACT: Required<Omit<ContactInfo, "hours">> & { hours: string[] } = {
  address: "64 Kingbird Drive, George Town, Grand Cayman, Cayman Islands KY1-1203",
  phone: "345-326-3726",
  email: "lascocayman@gmail.com",
  facebookUrl: "https://www.facebook.com/LascoCaymanDistributors/",
  hours: [],
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const contact = {
    address: settings?.contactInfo?.address || DEFAULT_CONTACT.address,
    phone: settings?.contactInfo?.phone || DEFAULT_CONTACT.phone,
    email: settings?.contactInfo?.email || DEFAULT_CONTACT.email,
    facebookUrl: settings?.contactInfo?.facebookUrl || DEFAULT_CONTACT.facebookUrl,
    hours: settings?.contactInfo?.hours && settings.contactInfo.hours.length > 0
      ? settings.contactInfo.hours
      : DEFAULT_CONTACT.hours,
  };

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`;

  const cards = [
    {
      label: "Address",
      value: contact.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`,
      color: "primary",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone}`,
      color: "sea",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      color: "papaya",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      value: "@LascoCaymanDistributors",
      href: contact.facebookUrl,
      color: "palm",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ] as const;

  const CARD_STYLES: Record<string, { bg: string; text: string }> = {
    primary: { bg: "bg-primary/10", text: "text-primary" },
    sea: { bg: "bg-sea/10", text: "text-sea" },
    papaya: { bg: "bg-papaya/10", text: "text-papaya" },
    palm: { bg: "bg-palm/10", text: "text-palm" },
  };

  return (
    <div className="bg-cream">
      {/* Header */}
      <section className="relative overflow-hidden bg-charcoal py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-charcoal to-papaya/20" />
        <div className="absolute -right-16 top-1/3 h-64 w-64 rounded-full bg-sun/10 blur-3xl animate-blob-float" />
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-sun">Get in Touch</p>
          <h1 className="mx-auto mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
            Questions about an order, a product, or becoming a retail partner? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map((card) => {
            const style = CARD_STYLES[card.color];
            return (
              <a
                key={card.label}
                href={card.href}
                target={card.label === "Address" || card.label === "Facebook" ? "_blank" : undefined}
                rel={card.label === "Address" || card.label === "Facebook" ? "noopener noreferrer" : undefined}
                className="group flex items-start gap-4 rounded-3xl border border-warm-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${style.bg} ${style.text}`}>
                  {card.icon}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-warm-muted">{card.label}</p>
                  <p className="mt-1 whitespace-pre-line text-sm font-semibold text-charcoal group-hover:text-primary">
                    {card.value}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        {contact.hours.length > 0 && (
          <div className="mt-6 rounded-3xl border border-warm-border bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-warm-muted">Business Hours</p>
            <ul className="mt-2 space-y-1 text-sm font-semibold text-charcoal">
              {contact.hours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Map */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-warm-border shadow-sm">
          <iframe
            src={mapSrc}
            title="LASCO Cayman location"
            className="h-80 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-papaya-dark px-8 py-10 text-center text-white sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="font-display text-xl font-extrabold">Have feedback on an order?</h2>
            <p className="mt-1 text-sm text-white/80">
              Use our feedback form for order-specific questions and we&apos;ll get right back to you.
            </p>
          </div>
          <a
            href="/feedback"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Go to Feedback →
          </a>
        </div>
      </div>
    </div>
  );
}
