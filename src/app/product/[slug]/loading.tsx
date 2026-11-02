export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="h-3 w-64 bg-warm-100 rounded mb-8" />

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <div className="aspect-[3/4] bg-warm-100 rounded-lg mb-4" />
          <div className="flex gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-20 h-24 bg-warm-100 rounded" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-warm-100 rounded" />
          <div className="h-6 w-24 bg-warm-100 rounded" />
          <div className="h-3 w-full bg-warm-100 rounded" />
          <div className="h-3 w-5/6 bg-warm-100 rounded" />
          <div className="h-3 w-2/3 bg-warm-100 rounded" />
          <div className="h-12 w-40 bg-warm-100 rounded mt-6" />
          <div className="h-14 w-full bg-warm-100 rounded" />
        </div>
      </div>
    </div>
  );
}
