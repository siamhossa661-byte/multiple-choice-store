"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } =
    useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/40 animate-fade-overlay"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-cream shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200">
          <h2 className="font-serif text-xl text-neutral-900">
            Your Bag
            <span className="text-neutral-500 text-sm font-sans ml-2">
              ({itemCount})
            </span>
          </h2>
          <button
            onClick={closeCart}
            className="p-2 -mr-2 text-neutral-500 hover:text-neutral-900 transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg
                className="w-16 h-16 text-warm-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <p className="font-serif text-lg text-neutral-700 mb-2">
                Your bag is empty
              </p>
              <p className="text-sm text-neutral-500 mb-6">
                Discover our curated collections
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="px-8 py-3 bg-black text-cream text-sm tracking-widest uppercase hover:bg-neutral-800 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => {
                const key = `${item.productId}-${item.size ?? ""}-${item.color ?? ""}`;
                return (
                  <li key={key} className="flex gap-4 animate-fade-in">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="relative w-20 h-24 flex-shrink-0 bg-neutral-100 overflow-hidden"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="text-sm font-medium text-neutral-900 hover:text-neutral-700 transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      {(item.size || item.color) && (
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {[item.color, item.size].filter(Boolean).join(" / ")}
                        </p>
                      )}
                      <p className="text-sm font-medium text-neutral-900 mt-1">
                        ৳{item.price.toLocaleString("en-BD")}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-neutral-200">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity - 1,
                                item.size,
                                item.color
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity + 1,
                                item.size,
                                item.color
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            removeItem(item.productId, item.size, item.color)
                          }
                          className="text-xs text-neutral-500 hover:text-neutral-900 underline transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-neutral-200 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Subtotal</span>
              <span className="text-lg font-medium text-neutral-900">
                ৳{subtotal.toLocaleString("en-BD")}
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              Shipping calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full py-4 bg-black text-cream text-center text-sm tracking-widest uppercase font-medium hover:bg-neutral-800 transition-colors"
            >
              Checkout
            </Link>
            <button
              onClick={closeCart}
              className="block w-full py-3 text-center text-sm text-neutral-600 tracking-widest uppercase hover:text-neutral-900 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
