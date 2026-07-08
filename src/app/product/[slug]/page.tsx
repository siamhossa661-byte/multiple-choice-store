import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getProductReviews,
  getReviewStats,
  getRelatedProducts,
  getReviewStatsForProducts,
} from "@/lib/queries";
import { ProductGallery } from "@/components/ProductGallery";
import { AddToCartForm } from "@/components/AddToCartForm";
import { StarRating } from "@/components/StarRating";
import { ProductCard } from "@/components/ProductCard";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProductBySlug(slug);
  if (!data) return { title: "Product Not Found" };
  return {
    title: `${data.product.name} — Multiple Choice`,
    description: data.product.description?.slice(0, 160),
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const data = await getProductBySlug(slug);

  if (!data) notFound();

  const { product, categoryName } = data;

  const [productReviews, stats, relatedProducts] = await Promise.all([
    getProductReviews(product.id),
    getReviewStats(product.id),
    getRelatedProducts(product.id, product.categoryId),
  ]);

  const relatedIds = relatedProducts.map((p) => p.id);
  const relatedStats = await getReviewStatsForProducts(relatedIds);

  const images: string[] = JSON.parse(product.images);
  const sizes: string[] = JSON.parse(product.sizes ?? "[]");
  const colors: string[] = JSON.parse(product.colors ?? "[]");
  const price = parseFloat(product.price);
  const compareAt = product.compareAtPrice
    ? parseFloat(product.compareAtPrice)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-warm-500">
        <a href="/" className="hover:text-warm-900 transition-colors">
          Home
        </a>
        <span className="mx-2">›</span>
        <a href="/shop" className="hover:text-warm-900 transition-colors">
          Shop
        </a>
        {categoryName && (
          <>
            <span className="mx-2">›</span>
            <a
              href={`/shop?category=${data.categorySlug}`}
              className="hover:text-warm-900 transition-colors"
            >
              {categoryName}
            </a>
          </>
        )}
        <span className="mx-2">›</span>
        <span className="text-warm-900">{product.name}</span>
      </nav>

      {/* Product */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Gallery */}
        <ProductGallery images={images} productName={product.name} />

        {/* Details */}
        <div className="lg:sticky lg:top-28 lg:self-start space-y-6">
          {product.newArrival && (
            <span className="inline-block px-3 py-1 bg-warm-900 text-cream text-[10px] tracking-widest uppercase font-medium">
              New Arrival
            </span>
          )}
          {product.bestSeller && !product.newArrival && (
            <span className="inline-block px-3 py-1 bg-gold text-white text-[10px] tracking-widest uppercase font-medium">
              Best Seller
            </span>
          )}

          <h1 className="font-serif text-2xl lg:text-3xl text-warm-900">
            {product.name}
          </h1>

          {/* Rating summary */}
          {stats.count > 0 && (
            <div className="flex items-center gap-3">
              <StarRating rating={Math.round(stats.avgRating)} size="md" />
              <span className="text-sm text-warm-600">
                {stats.avgRating.toFixed(1)} ({stats.count}{" "}
                {stats.count === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3">
            <span
              className={`text-xl font-medium ${
                compareAt && compareAt > price ? "text-red-700" : "text-warm-900"
              }`}
            >
              ৳{price.toLocaleString("en-BD")}
            </span>
            {compareAt && compareAt > price && (
              <span className="text-lg text-warm-400 line-through">
                ৳{compareAt.toLocaleString("en-BD")}
              </span>
            )}
          </div>

          <p className="text-sm text-warm-600 leading-relaxed">
            {product.description}
          </p>

          {/* Add to Cart */}
          <AddToCartForm
            product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              price,
              image: images[0] || "",
            }}
            sizes={sizes}
            colors={colors}
          />

          {/* Details accordion */}
          <div className="border-t border-warm-200 pt-6 space-y-4">
            {product.material && (
              <div className="flex items-start gap-4">
                <span className="text-xs tracking-widest uppercase text-warm-500 w-24 flex-shrink-0 pt-0.5">
                  Material
                </span>
                <span className="text-sm text-warm-700">{product.material}</span>
              </div>
            )}
            <div className="flex items-start gap-4">
              <span className="text-xs tracking-widest uppercase text-warm-500 w-24 flex-shrink-0 pt-0.5">
                Shipping
              </span>
              <span className="text-sm text-warm-700">
                Free shipping on orders over $300. Standard delivery 3–5 business
                days.
              </span>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-xs tracking-widest uppercase text-warm-500 w-24 flex-shrink-0 pt-0.5">
                Returns
              </span>
              <span className="text-sm text-warm-700">
                Free returns within 30 days. Items must be unworn with tags attached.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-20 lg:mt-28 border-t border-warm-200 pt-12">
        <div className="max-w-3xl">
          <h2 className="font-serif text-2xl lg:text-3xl text-warm-900 mb-2">
            Customer Reviews
          </h2>
          {stats.count > 0 && (
            <div className="flex items-center gap-3 mb-8">
              <StarRating rating={Math.round(stats.avgRating)} size="lg" />
              <span className="text-sm text-warm-600">
                Based on {stats.count} {stats.count === 1 ? "review" : "reviews"}
              </span>
            </div>
          )}

          {productReviews.length === 0 ? (
            <p className="text-sm text-warm-500 py-8">
              No reviews yet. Be the first to share your thoughts!
            </p>
          ) : (
            <div className="space-y-8">
              {productReviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-warm-200/60 pb-8 last:border-0"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <StarRating rating={review.rating} size="sm" />
                    {review.verified && (
                      <span className="text-[10px] tracking-widest uppercase text-green-700 bg-green-50 px-2 py-0.5">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  {review.title && (
                    <h4 className="text-sm font-medium text-warm-900 mb-1">
                      {review.title}
                    </h4>
                  )}
                  {review.body && (
                    <p className="text-sm text-warm-600 leading-relaxed mb-2">
                      {review.body}
                    </p>
                  )}
                  <p className="text-xs text-warm-400">
                    {review.authorName} •{" "}
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 lg:mt-28 border-t border-warm-200 pt-12">
          <h2 className="font-serif text-2xl lg:text-3xl text-warm-900 mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {relatedProducts.map((p, i) => {
              const rStats = relatedStats.get(p.id);
              return (
                <ProductCard
                  key={p.id}
                  product={p}
                  avgRating={rStats?.avgRating}
                  reviewCount={rStats?.count}
                  index={i}
                />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
