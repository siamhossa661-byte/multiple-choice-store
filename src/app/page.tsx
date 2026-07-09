import Image from "next/image";
import Link from "next/link";
import { getProducts, getCategories, getReviewStatsForProducts } from "@/lib/queries";
import { ProductCard } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [productsData, categoriesData] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const featuredProducts = productsData
    .filter((p) => p.product.featured)
    .slice(0, 4);
  const bestSellers = productsData
    .filter((p) => p.product.bestSeller)
    .slice(0, 8);
  const newArrivals = productsData
    .filter((p) => p.product.newArrival)
    .slice(0, 4);

  const allIds = productsData.map((p) => p.product.id);
  const reviewStats = await getReviewStatsForProducts(allIds);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-warm-900 text-cream text-center py-2.5">
        <p className="text-xs tracking-[0.2em] uppercase">
          ঢাকায় ডেলিভারি ৳60 ✦ সারাদেশে ডেলিভারি ৳120
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative h-[70vh] lg:h-[85vh] overflow-hidden">
        <Image
          src="https://i.ibb.co/4ZxGgbX9/AF9-DADEF-06-B7-41-A4-9-B71-A583971-B94-DA.jpg"
          alt="Multiple Choice fashion editorial"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl animate-fade-in">
              <span className="inline-block text-xs tracking-[0.4em] uppercase text-warm-200 mb-4">
                The New Collection
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Effortless
                <br />
                <em className="italic">Elegance</em>
              </h1>
              <p className="text-warm-200 text-base lg:text-lg mb-8 max-w-md leading-relaxed">
                Discover pieces designed for the woman who chooses with
                intention. Crafted from the finest materials, made to last.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/shop"
                  className="inline-block px-10 py-4 bg-white text-warm-900 text-sm tracking-widest uppercase font-medium hover:bg-warm-100 transition-colors text-center"
                >
                  Shop Collection
                </Link>
                <Link
                  href="/shop?category=dresses"
                  className="inline-block px-10 py-4 border border-white text-white text-sm tracking-widest uppercase font-medium hover:bg-white/10 transition-colors text-center"
                >
                  Explore Dresses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs tracking-[0.4em] uppercase text-warm-500 mb-3 block">
              Curated For You
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-warm-900">
              Shop by Collection
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {categoriesData.slice(0, 6).map((cat, i) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className={`group relative overflow-hidden ${
                  i === 0
                    ? "col-span-2 lg:col-span-2 aspect-[2/1] lg:aspect-[2/1]"
                    : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={cat.image || ""}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={
                    i === 0
                      ? "(max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 640px) 50vw, 33vw"
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-8">
                  <h3 className="font-serif text-lg lg:text-2xl text-white mb-1">
                    {cat.name}
                  </h3>
                  <span className="text-xs tracking-[0.3em] uppercase text-warm-200 group-hover:text-white transition-colors">
                    Discover →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs tracking-[0.4em] uppercase text-warm-500 mb-3 block">
                Handpicked
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-warm-900">
                Featured Pieces
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-block text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-colors border-b border-warm-400 pb-0.5"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {featuredProducts.map((p, i) => {
              const stats = reviewStats.get(p.product.id);
              return (
                <ProductCard
                  key={p.product.id}
                  product={p.product}
                  avgRating={stats?.avgRating}
                  reviewCount={stats?.count}
                  index={i}
                />
              );
            })}
          </div>
          <div className="sm:hidden text-center mt-8">
            <Link
              href="/shop"
              className="text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-colors border-b border-warm-400 pb-0.5"
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <Image
          src="https://i.ibb.co/N4Ss5nc/CF8-CDE58-65-CE-4221-AAD2-387391-BB11-AE.jpg"
          alt="Dresses collection"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-xl px-4">
            <span className="text-xs tracking-[0.4em] uppercase text-warm-200 mb-4 block">
              The Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-6 italic">
              Style That Speaks
            </h2>
            <Link
              href="/shop?category=dresses"
              className="inline-block px-10 py-4 border border-white text-white text-sm tracking-widest uppercase font-medium hover:bg-white hover:text-warm-900 transition-colors"
            >
              Shop Dresses
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs tracking-[0.4em] uppercase text-warm-500 mb-3 block">
              Most Loved
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-warm-900">
              Best Sellers
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {bestSellers.slice(0, 4).map((p, i) => {
              const stats = reviewStats.get(p.product.id);
              return (
                <ProductCard
                  key={p.product.id}
                  product={p.product}
                  avgRating={stats?.avgRating}
                  reviewCount={stats?.count}
                  index={i}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-16 lg:py-24 bg-warm-100/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-xs tracking-[0.4em] uppercase text-warm-500 mb-3 block">
                  Just Arrived
                </span>
                <h2 className="font-serif text-3xl lg:text-4xl text-warm-900">
                  New In
                </h2>
              </div>
              <Link
                href="/shop"
                className="hidden sm:inline-block text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-colors border-b border-warm-400 pb-0.5"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {newArrivals.map((p, i) => {
                const stats = reviewStats.get(p.product.id);
                return (
                  <ProductCard
                    key={p.product.id}
                    product={p.product}
                    avgRating={stats?.avgRating}
                    reviewCount={stats?.count}
                    index={i}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Value Props */}
      <section className="py-16 border-t border-warm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-16 text-center">
            <div>
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-warm-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V15m0 0l-2.25 1.313M3 16.5v2.25m18-2.25v2.25" />
                </svg>
              </div>
              <h3 className="text-sm font-medium tracking-widest uppercase text-warm-900 mb-2">
                Exceptional Quality
              </h3>
              <p className="text-sm text-warm-500 leading-relaxed">
                Every piece is crafted from the finest materials, designed to become
                a cherished part of your wardrobe.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-warm-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-2.896c0-.305-.124-.597-.345-.81l-2.957-2.847A1.875 1.875 0 0016.2 9.75H14.25m-3.75 9h3.75m0 0V5.625c0-.621-.504-1.125-1.125-1.125H5.25c-.621 0-1.125.504-1.125 1.125v12" />
                </svg>
              </div>
              <h3 className="text-sm font-medium tracking-widest uppercase text-warm-900 mb-2">
                সারাদেশে ডেলিভারি
              </h3>
              <p className="text-sm text-warm-500 leading-relaxed">
                ঢাকায় ৳60, সারাদেশে ৳120। Cash on Delivery, bKash, Nagad, Rocket
                এ পেমেন্ট করুন।
              </p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-warm-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium tracking-widest uppercase text-warm-900 mb-2">
                Personal Styling
              </h3>
              <p className="text-sm text-warm-500 leading-relaxed">
                Our stylists are available to help you find the perfect pieces
                for any occasion. Book a consultation today.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
