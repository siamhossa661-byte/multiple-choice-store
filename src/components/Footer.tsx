"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-warm-900 text-warm-300">
      {/* Newsletter section */}
      <div className="border-b border-warm-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h3 className="font-serif text-2xl lg:text-3xl text-warm-100 mb-3">
            Join the World of Multiple Choice
          </h3>
          <p className="text-warm-400 mb-8 max-w-md mx-auto text-sm">
            Be the first to discover new collections, exclusive offers, and
            styling inspiration.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 bg-warm-800 border border-warm-700 text-warm-100 placeholder:text-warm-500 text-sm tracking-wide focus:outline-none focus:border-warm-500 transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-warm-100 text-warm-900 text-sm tracking-widest uppercase font-medium hover:bg-white transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-warm-200 mb-6 font-medium">
              Shop
            </h4>
            <ul className="space-y-3">
              {["New Arrivals", "Dresses", "Tops & Blouses", "Jewelry", "Accessories"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/shop"
                      className="text-sm text-warm-400 hover:text-warm-200 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-warm-200 mb-6 font-medium">
              About
            </h4>
            <ul className="space-y-3">
              {["Our Story", "Sustainability", "Careers", "Press"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-sm text-warm-400 hover:text-warm-200 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-warm-200 mb-6 font-medium">
              Help
            </h4>
            <ul className="space-y-3">
              {[
                "Shipping & Returns",
                "Size Guide",
                "Contact Us",
                "FAQs",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="text-sm text-warm-400 hover:text-warm-200 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-warm-200 mb-6 font-medium">
              Follow Us
            </h4>
            <ul className="space-y-3">
              {["Instagram", "Pinterest", "TikTok", "Facebook"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-sm text-warm-400 hover:text-warm-200 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-warm-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-500">
            © 2026 Multiple Choice Bangladesh. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-xs text-warm-500 hover:text-warm-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-xs text-warm-500 hover:text-warm-300 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
