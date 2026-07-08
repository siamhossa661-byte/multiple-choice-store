"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface ShopFiltersProps {
  categories: Category[];
  currentCategory?: string;
  currentSort?: string;
}

export function ShopFilters({
  categories,
  currentCategory,
  currentSort,
}: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/shop?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="space-y-8">
      {/* Sort - Mobile */}
      <div className="lg:hidden">
        <select
          value={currentSort ?? ""}
          onChange={(e) => updateParam("sort", e.target.value || null)}
          className="w-full px-4 py-3 border border-warm-200 bg-cream text-sm text-warm-900 focus:outline-none focus:border-warm-500"
        >
          <option value="">Sort: Featured</option>
          <option value="newest">Sort: Newest</option>
          <option value="price-asc">Sort: Price Low to High</option>
          <option value="price-desc">Sort: Price High to Low</option>
          <option value="name">Sort: A to Z</option>
        </select>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-xs tracking-[0.3em] uppercase text-warm-500 mb-4 font-medium">
          Category
        </h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => updateParam("category", null)}
              className={`text-sm transition-colors ${
                !currentCategory
                  ? "text-warm-900 font-medium"
                  : "text-warm-500 hover:text-warm-900"
              }`}
            >
              All Products
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => updateParam("category", cat.slug)}
                className={`text-sm transition-colors ${
                  currentCategory === cat.slug
                    ? "text-warm-900 font-medium"
                    : "text-warm-500 hover:text-warm-900"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Sort - Desktop */}
      <div className="hidden lg:block">
        <h3 className="text-xs tracking-[0.3em] uppercase text-warm-500 mb-4 font-medium">
          Sort By
        </h3>
        <ul className="space-y-2">
          {[
            { value: "", label: "Featured" },
            { value: "newest", label: "Newest" },
            { value: "price-asc", label: "Price: Low to High" },
            { value: "price-desc", label: "Price: High to Low" },
            { value: "name", label: "A to Z" },
          ].map((opt) => (
            <li key={opt.value}>
              <button
                onClick={() => updateParam("sort", opt.value || null)}
                className={`text-sm transition-colors ${
                  (currentSort ?? "") === opt.value
                    ? "text-warm-900 font-medium"
                    : "text-warm-500 hover:text-warm-900"
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
