import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/images/logo.png"
              alt="LASCO Cayman"
              width={130}
              height={50}
              className="h-10 w-auto object-contain brightness-0 invert"
            />
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Your one-stop shop for authentic Caribbean products in the Cayman Islands.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">Shop</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li><Link href="/shop" className="transition hover:text-primary">All Products</Link></li>
              <li><Link href="/commercials" className="transition hover:text-primary">Commercials</Link></li>
              <li><Link href="/store-list" className="transition hover:text-primary">Store Locations</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">Support</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li><Link href="/faq" className="transition hover:text-primary">FAQ</Link></li>
              <li><Link href="/order-tracking" className="transition hover:text-primary">Order Tracking</Link></li>
              <li><Link href="/feedback" className="transition hover:text-primary">Feedback</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li><Link href="/about" className="transition hover:text-primary">About Us</Link></li>
              <li><Link href="/blog" className="transition hover:text-primary">Blog</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/30 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} LASCO Cayman. All rights reserved.</p>
          <p>Bringing the Caribbean to the Cayman Islands.</p>
        </div>
      </div>
    </footer>
  );
}
