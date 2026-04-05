import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Image src="/images/logo.png" alt="LASCO Cayman" width={150} height={150} />
            <p className="mt-2 text-sm text-gray-600">
              Your one-stop shop in the Cayman Islands.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Shop</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>
                <Link href="/shop" className="hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/commercials" className="hover:text-primary">
                  Commercials
                </Link>
              </li>
              <li>
                <Link href="/store-list" className="hover:text-primary">
                  Store Locations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Support</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>
                <Link href="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/order-tracking" className="hover:text-primary">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-primary">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} LASCO Cayman. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
