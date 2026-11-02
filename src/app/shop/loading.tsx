export default function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="h-3 w-28 bg-warm-100 rounded mb-4" />
      <div className="h-9 w-56 bg-warm-100 rounded mb-3" />
      <div className="h-4 w-20 bg-warm-100 rounded mb-12" />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <aside className="lg:w-56 flex-shrink-0 space-y-3">
          <div className="h-4 w-24 bg-warm-100 rounded" />
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 w-32 bg-warm-100 rounded" />
          ))}
        </aside>

        <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i}>
              <div className="aspect-[3/4] bg-warm-100 rounded-lg mb-4" />
              <div className="h-4 w-3/4 bg-warm-100 rounded mb-2" />
              <div className="h-4 w-1/3 bg-warm-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
