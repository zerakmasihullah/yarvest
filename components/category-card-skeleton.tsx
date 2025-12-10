"use client"

interface CategoryCardSkeletonProps {
  count?: number
  variant?: "default" | "compact" | "featured"
}

export function CategoryCardSkeleton({ 
  count = 6, 
  variant = "default" 
}: CategoryCardSkeletonProps) {
  // Compact variant for homepage
  if (variant === "compact") {
    return (
      <>
        {[...Array(count)].map((_, i) => (
          <div key={i} className="text-center animate-pulse">
            <div className="h-20 w-20 mx-auto mb-2 bg-gray-200 rounded-xl"></div>
            <div className="h-4 w-16 mx-auto bg-gray-200 rounded"></div>
          </div>
        ))}
      </>
    )
  }

  // Featured variant
  if (variant === "featured") {
    return (
      <>
        {[...Array(count)].map((_, i) => (
          <div key={i} className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <div className="flex gap-2 mb-2">
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }

  // Default variant
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
            <div className="flex-1">
              <div className="h-5 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="flex gap-2 mb-2">
                <div className="h-5 w-12 bg-gray-200 rounded"></div>
                <div className="h-5 w-12 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

