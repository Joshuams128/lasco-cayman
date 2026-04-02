"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-primary">
          LASCO Cayman
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/shop" className="hover:text-primary">
            Shop
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
          <Link href="/blog" className="hover:text-primary">
            Blog
          </Link>
          <Link href="/store-list" className="hover:text-primary">
            Stores
          </Link>
          <Link href="/faq" className="hover:text-primary">
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative hover:text-primary">
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                {itemCount}
              </span>
            )}
          </Link>

          <Link href="/wishlist" className="hover:text-primary">
            Wishlist
          </Link>

          <SignedIn>
            <Link href="/my-account" className="hover:text-primary">
              Account
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <Link
              href="/sign-in"
              className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
            >
              Sign In
            </Link>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
