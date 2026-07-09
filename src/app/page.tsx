import { getProducts, getCategories, getReviewStatsForProducts } from "@/lib/queries";
import { ProductCard } from "@/components/ProductCard";
import { ShopFilters } from "@/components/ShopFilters";

export const metadata = {
  title: "Shop — Multiple Choice",
  description: "Browse our curated collection of clothing and jewelry.",
};

export const dynamic = "force-dynamic";

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    search?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const { category, sort, search } = params;

  const [productsData, categoriesData] = await Promise.all([
    getProducts({ category, sort, search }),
    getCategories(),
  ]);

  const productIds = productsData.map((p) => p.product.id);
  const reviewStats = await getReviewStatsForProducts(productIds);

  const currentCategory = categoriesData.find((c) => c.slug === category);
  const title = currentCategory ? currentCategory.name : search ? `Results for "${search}"` : "All Products";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-warm-500">
        <a href="/" className="hover:text-warm-900 transition-colors">
          Home
        </a>
        <span className="mx-2">›</span>
        <span className="text-warm-900">{title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8 lg:mb-12">
        <h1 className="font-serif text-3xl lg:text-4xl text-warm-900 mb-2">
          {title}
        </h1>
        <p className="text-sm text-warm-500">
          {productsData.length} {productsData.length === 1 ? "piece" : "pieces"}
        </p>
      </div>

      {/* Filters and Grid */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Sidebar */}
        <aside className="lg:w-56 flex-shrink-0">
          <ShopFilters
            categories={categoriesData}
            currentCategory={category}
            currentSort={sort}
          />
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {productsData.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-xl text-warm-700 mb-2">
                No products found
              </p>
              <p className="text-sm text-warm-500">
                Try adjusting your filters or search terms.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
              {productsData.map((p, i) => {
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
          )}
        </div>
      </div>
    </div>
  );
}