"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

interface ProductInfo {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
}

interface AddToCartFormProps {
  product: ProductInfo;
  sizes: string[];
  colors: string[];
}

export function AddToCartForm({ product, sizes, colors }: AddToCartFormProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(colors[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
      quantity,
      slug: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Color Selection */}
      {colors.length > 0 && (
        <div>
          <label className="block text-xs tracking-widest uppercase text-warm-500 mb-3">
            Color — <span className="text-warm-900">{selectedColor}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 text-sm border transition-all ${
                  selectedColor === color
                    ? "border-warm-900 text-warm-900 bg-warm-900/5"
                    : "border-warm-300 text-warm-600 hover:border-warm-500"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs tracking-widest uppercase text-warm-500">
              Size — <span className="text-warm-900">{selectedSize}</span>
            </label>
            <button className="text-xs text-warm-500 underline hover:text-warm-900 transition-colors">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 text-sm border flex items-center justify-center transition-all ${
                  selectedSize === size
                    ? "border-warm-900 text-warm-900 bg-warm-900/5"
                    : "border-warm-300 text-warm-600 hover:border-warm-500"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-warm-500 mb-3">
          Quantity
        </label>
        <div className="flex items-center border border-warm-300 w-fit">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-12 flex items-center justify-center text-warm-600 hover:text-warm-900 transition-colors text-lg"
          >
            −
          </button>
          <span className="w-12 text-center text-sm text-warm-900 font-medium">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-12 flex items-center justify-center text-warm-600 hover:text-warm-900 transition-colors text-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAdd}
        className={`w-full py-4 text-sm tracking-widest uppercase font-medium transition-all ${
          added
            ? "bg-green-800 text-white"
            : "bg-warm-900 text-cream hover:bg-warm-800"
        }`}
      >
        {added ? "✓ Added to Bag" : "Add to Bag"}
      </button>

      {/* Wishlist */}
      <button className="w-full py-3 border border-warm-300 text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 hover:border-warm-900 transition-colors flex items-center justify-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        Add to Wishlist
      </button>
    </div>
  );
}
