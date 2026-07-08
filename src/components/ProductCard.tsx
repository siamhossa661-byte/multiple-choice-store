import Image from "next/image";
import Link from "next/link";
import { StarRating } from "@/components/StarRating";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    price: string;
    compareAtPrice: string | null;
    images: string;
    featured: boolean | null;
    bestSeller: boolean | null;
    newArrival: boolean | null;
  };
  avgRating?: number;
  reviewCount?: number;
  index?: number;
}

export function ProductCard({
  product,
  avgRating,
  reviewCount,
  index = 0,
}: ProductCardProps) {
  const images: string[] = JSON.parse(product.images);
  const price = parseFloat(product.price);
  const compareAt = product.compareAtPrice
    ? parseFloat(product.compareAtPrice)
    : null;

  const badge = product.newArrival
    ? "New"
    : compareAt && compareAt > price
    ? `${Math.round(((compareAt - price) / compareAt) * 100)}% Off`
    : product.bestSeller
    ? "Best Seller"
    : null;

  return (
    <div
      className={`group animate-fade-in opacity-0 stagger-${Math.min(index + 1, 6)}`}
      style={{ animationFillMode: "forwards" }}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-warm-100 mb-4">
          <Image
            src={images[0] || ""}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {images[1] && (
            <Image
              src={images[1]}
              alt={`${product.name} alternate view`}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
          {badge && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-warm-900 text-cream text-[10px] tracking-widest uppercase font-medium">
              {badge}
            </span>
          )}
        </div>
        <div className="space-y-1.5">
          <h3 className="text-sm font-medium text-warm-900 group-hover:text-warm-700 transition-colors">
            {product.name}
          </h3>
          {avgRating !== undefined && reviewCount !== undefined && reviewCount > 0 && (
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(avgRating)} size="sm" />
              <span className="text-xs text-warm-500">({reviewCount})</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${compareAt ? "text-red-700" : "text-warm-900"}`}>
              ৳{price.toLocaleString("en-BD")}
            </span>
            {compareAt && compareAt > price && (
              <span className="text-sm text-warm-400 line-through">
                ৳{compareAt.toLocaleString("en-BD")}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
