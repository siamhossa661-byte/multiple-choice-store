import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Male Collection — Multiple Choice",
  description: "Men's collection coming soon at Multiple Choice",
};

export default function MaleCollectionPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="w-24 h-24 mx-auto mb-8 bg-warm-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-warm-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Label */}
        <span className="inline-block text-xs tracking-[0.4em] uppercase text-warm-500 mb-4">
          Multiple Choice
        </span>

        {/* Title */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-warm-900 mb-4">
          Male Collection
        </h1>

        {/* Coming Soon */}
        <div className="relative inline-block mb-8">
          <span className="text-2xl sm:text-3xl font-serif italic text-warm-700">
            Coming Soon
          </span>
          <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-warm-300" />
        </div>

        {/* Description */}
        <p className="text-warm-600 text-base sm:text-lg mb-4 leading-relaxed">
          We&apos;re working on something special for you.
        </p>
        <p className="text-warm-500 text-sm mb-10">
          আমাদের পুরুষদের কালেকশন খুব শীঘ্রই আসছে। অপেক্ষা করুন!
        </p>

        {/* Notify section */}
        <div className="bg-warm-50 border border-warm-200 rounded-xl p-6 mb-8">
          <p className="text-sm text-warm-700 font-medium mb-1">
            🔔 Stay Updated
          </p>
          <p className="text-xs text-warm-500 mb-4">
            Follow us on social media to know when we launch
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.facebook.com/share/17VUoU2P8a/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-warm-900 text-cream text-xs tracking-widest uppercase rounded-full hover:bg-warm-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <a
              href="https://www.instagram.com/multiple_choice_pprs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-warm-900 text-cream text-xs tracking-widest uppercase rounded-full hover:bg-warm-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              Instagram
            </a>
          </div>
        </div>

        {/* Back to shop */}
        <Link
          href="/shop"
          className="inline-block text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-colors border-b border-warm-400 pb-0.5"
        >
          ← Shop Women&apos;s Collection
        </Link>
      </div>
    </div>
  );
}
