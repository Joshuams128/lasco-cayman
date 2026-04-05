"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { itemCount } = useCart();
  const { isSignedIn } = useAuth();

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.png" alt="LASCO Cayman" width={150} height={150} />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/shop" className="text-black hover:text-primary">
            Shop
          </Link>
          <Link href="/about" className="text-black hover:text-primary">
            About
          </Link>
          <Link href="/blog" className="text-black hover:text-primary">
            Blog
          </Link>
          <Link href="/store-list" className="text-black hover:text-primary">
            Stores
          </Link>
          <Link href="/faq" className="text-black hover:text-primary">
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative text-black hover:text-primary">
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                {itemCount}
              </span>
            )}
          </Link>

          <Link href="/wishlist" className="text-black hover:text-primary">
            Wishlist
          </Link>

          {isSignedIn ? (
            <>
              <Link href="/my-account" className="text-black hover:text-primary">
                Account
              </Link>
              <UserButton />
            </>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
