"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const { openCart, itemCount } = useCart();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleClick = (name: string) => {
    setClickedItem(name);
    setTimeout(() => setClickedItem(null), 200);
  };

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-warm-200/60">
      {/* Search Overlay */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-0 bg-white border-b border-warm-200 shadow-lg z-50 animate-slide-down">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-warm-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products... (e.g. dress, earring, two piece)"
              className="flex-1 text-base text-warm-900 placeholder:text-warm-400 bg-transparent border-none outline-none"
            />
            <button
              type="button"
              onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
              className="p-2 text-warm-500 hover:text-warm-900 active:scale-90 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => { setMobileOpen(!mobileOpen); handleClick("menu"); }}
            className={`lg:hidden p-2 -ml-2 text-warm-700 hover:text-warm-900 transition-all active:scale-90 ${clickedItem === "menu" ? "scale-90" : ""}`}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Nav links - desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/shop"
              onClick={() => handleClick("shop-all")}
              className={`text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-all active:scale-95 ${clickedItem === "shop-all" ? "scale-95 text-warm-900" : ""}`}
            >
              Shop All
            </Link>
            <Link
              href="/shop?category=dresses"
              onClick={() => handleClick("dresses")}
              className={`text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-all active:scale-95 ${clickedItem === "dresses" ? "scale-95 text-warm-900" : ""}`}
            >
              Dresses
            </Link>
            <Link
              href="/shop?category=jewelry"
              onClick={() => handleClick("jewelry")}
              className={`text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-all active:scale-95 ${clickedItem === "jewelry" ? "scale-95 text-warm-900" : ""}`}
            >
              Jewelry
            </Link>
          </nav>

          {/* Logo with image */}
          <Link 
            href="/" 
            onClick={() => handleClick("logo")}
            className={`flex items-center gap-2 transition-all active:scale-95 ${clickedItem === "logo" ? "scale-95" : ""}`}
          >
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/images/logo.jpeg"
                alt="Multiple Choice"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="flex flex-col items-start hidden sm:flex">
              <span className="text-lg lg:text-xl tracking-[0.2em] uppercase font-serif font-semibold text-warm-900 leading-tight">
                Multiple Choice
              </span>
              <span className="text-[9px] tracking-[0.4em] uppercase text-warm-500">
                Fashion & Jewelry
              </span>
            </div>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Search button */}
            <button
              onClick={() => { setSearchOpen(true); handleClick("search"); }}
              className={`p-2.5 text-warm-600 hover:text-warm-900 hover:bg-warm-100 rounded-full transition-all active:scale-90 ${clickedItem === "search" ? "scale-90 bg-warm-100" : ""}`}
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            {/* Cart button */}
            <button
              onClick={() => { openCart(); handleClick("cart"); }}
              className={`relative p-2.5 text-warm-600 hover:text-warm-900 hover:bg-warm-100 rounded-full transition-all active:scale-90 ${clickedItem === "cart" ? "scale-90 bg-warm-100" : ""}`}
              aria-label="Open cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-warm-900 text-cream text-[10px] font-medium rounded-full flex items-center justify-center animate-bounce-in">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-warm-200/60 bg-cream animate-slide-down">
          <nav className="px-4 py-6 space-y-1">
            {[
              { label: "Shop All", href: "/shop" },
              { label: "Dresses", href: "/shop?category=dresses" },
              { label: "Jewelry", href: "/shop?category=jewelry" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => { setMobileOpen(false); handleClick(item.label); }}
                className={`block py-3 px-4 text-sm tracking-widest uppercase text-warm-700 hover:text-warm-900 hover:bg-warm-100 rounded-lg transition-all active:scale-[0.98] ${clickedItem === item.label ? "bg-warm-100 scale-[0.98]" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
