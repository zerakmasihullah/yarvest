"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getImageUrl } from "@/lib/utils"

interface CategoryHeaderProps {
  categoryName: string
  categoryImage?: string
  productsCount: number
  filteredCount?: number
  showBackButton?: boolean
}

export function CategoryHeader({
  categoryName,
  categoryImage,
  productsCount,
  filteredCount,
  showBackButton = true,
}: CategoryHeaderProps) {
  const router = useRouter()

  return (
    <>
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-[#0A5D31] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-[#0A5D31] transition-colors">Categories</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{categoryName}</span>
      </div>

      {/* Category Header */}
      <div className="mb-10">
        {showBackButton && (
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="hover:bg-gray-100 rounded-xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          </div>
        )}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {categoryImage && (
            <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-md">
              <img
                src={getImageUrl(categoryImage)}
                alt={categoryName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              {categoryName}
            </h1>
            <p className="text-lg text-gray-600">
              {productsCount} {productsCount === 1 ? "product" : "products"} available
              {filteredCount !== undefined && filteredCount !== productsCount && (
                <span className="ml-2 text-sm text-gray-500">
                  ({filteredCount} shown after filters)
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

