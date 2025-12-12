"use client"

export function CategoryDetailsSkeleton() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          <span className="text-gray-400">/</span>
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          <span className="text-gray-400">/</span>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-28 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-28 h-28 bg-gray-200 rounded-2xl animate-pulse shadow-md"></div>
            <div className="flex-1">
              <div className="h-12 w-64 bg-gray-200 rounded-lg mb-3 animate-pulse"></div>
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Controls Skeleton */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="h-12 w-28 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            <div className="h-12 flex-1 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="h-12 w-36 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden animate-pulse shadow-sm">
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-7 w-24 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

