export default function ProductLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="skeleton h-4 w-48 mb-3"></div>

      {/* Top Summary */}
      <div className="bg-white border rounded-xl p-5 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton w-16 h-16 rounded-xl"></div>
          <div className="space-y-2">
            <div className="skeleton h-7 w-40"></div>
            <div className="skeleton h-3 w-32"></div>
            <div className="skeleton h-3 w-56"></div>
          </div>
        </div>
        <div className="skeleton h-28 w-40 rounded-lg"></div>
      </div>

      {/* দামের সারসংক্ষেপ */}
      <div className="bg-white border rounded-xl p-5">
        <div className="skeleton h-5 w-36 mb-3"></div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-2">
              <div className="skeleton h-3 w-20"></div>
              <div className="skeleton h-7 w-28"></div>
              <div className="skeleton h-3 w-24"></div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="skeleton h-5 w-52 mb-3"></div>
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton h-10 w-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
}