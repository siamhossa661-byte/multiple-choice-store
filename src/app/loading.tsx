export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Announcement bar */}
      <div className="bg-warm-900/90 h-9" />

      {/* Hero */}
      <div className="h-[70vh] lg:h-[85vh] bg-warm-100" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="h-4 w-40 bg-warm-100 rounded mx-auto mb-4" />
        <div className="h-8 w-72 bg-warm-100 rounded mx-auto mb-14" />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-20">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`${
                i === 0 ? "col-span-2 aspect-[2/1]" : "aspect-[3/4]"
              } bg-warm-100 rounded-lg`}
            />
          ))}
        </div>

        <div className="h-8 w-64 bg-warm-100 rounded mb-10" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {[0, 1, 2, 3].map((i) => (
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
