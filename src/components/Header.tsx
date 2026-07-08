"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { useState } from "react";

export function Header() {
  const { openCart, itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-warm-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 -ml-2 text-warm-700 hover:text-warm-900 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Nav links - desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/shop"
              className="text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-colors"
            >
              Shop All
            </Link>
            <Link
              href="/shop?category=dresses"
              className="text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-colors"
            >
              Dresses
            </Link>
            <Link
              href="/shop?category=jewelry"
              className="text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-colors"
            >
              Jewelry
            </Link>
          </nav>

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center">
            <span
              className="text-xl lg:text-2xl tracking-[0.3em] uppercase font-serif font-semibold text-warm-900"
            >
              Multiple Choice
            </span>
            <span className="text-[10px] tracking-[0.5em] uppercase text-warm-500 -mt-0.5 hidden sm:block">
              Fashion & Jewelry
            </span>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-4 lg:gap-6">
            <Link
              href="/shop"
              className="hidden lg:block text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-colors"
            >
              New In
            </Link>
            <Link
              href="/shop?category=accessories"
              className="hidden lg:block text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-colors"
            >
              Accessories
            </Link>

            {/* Search icon */}
            <Link href="/shop" className="p-2 text-warm-600 hover:text-warm-900 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </Link>

            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative p-2 text-warm-600 hover:text-warm-900 transition-colors"
              aria-label="Open cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-warm-900 text-cream text-[10px] font-medium rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-warm-200/60 bg-cream animate-fade-in">
          <nav className="px-4 py-6 space-y-4">
            <Link
              href="/shop"
              onClick={() => setMobileOpen(false)}
              className="block text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-colors"
            >
              Shop All
            </Link>
            <Link
              href="/shop?category=dresses"
              onClick={() => setMobileOpen(false)}
              className="block text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-colors"
            >
              Dresses
            </Link>
            <Link
              href="/shop?category=tops-blouses"
              onClick={() => setMobileOpen(false)}
              className="block text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-colors"
            >
              Tops & Blouses
            </Link>
            <Link
              href="/shop?category=jewelry"
              onClick={() => setMobileOpen(false)}
              className="block text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-colors"
            >
              Jewelry
            </Link>
            <Link
              href="/shop?category=accessories"
              onClick={() => setMobileOpen(false)}
              className="block text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-colors"
            >
              Accessories
            </Link>
            <Link
              href="/shop?category=knitwear"
              onClick={() => setMobileOpen(false)}
              className="block text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-colors"
            >
              Knitwear
            </Link>
            <Link
              href="/shop?category=outerwear"
              onClick={() => setMobileOpen(false)}
              className="block text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-colors"
            >
              Outerwear
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
