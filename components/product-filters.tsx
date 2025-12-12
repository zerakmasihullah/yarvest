"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ProductFiltersProps {
  showFilters: boolean
  onClose: () => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  onClearFilters: () => void
}

export function ProductFilters({
  showFilters,
  onClose,
  priceRange,
  onPriceRangeChange,
  onClearFilters,
}: ProductFiltersProps) {
  if (!showFilters) return null

  return (
    <Card className="mb-8 p-6 bg-white border-2 border-gray-200 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-9 w-9 p-0 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-3 block">Price Range</label>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={priceRange[0] === 0 && priceRange[1] === 1000 ? "default" : "outline"}
              size="sm"
              onClick={() => onPriceRangeChange([0, 1000])}
              className="rounded-full text-xs h-9 px-4"
            >
              All
            </Button>
            <Button
              variant={priceRange[0] === 0 && priceRange[1] === 10 ? "default" : "outline"}
              size="sm"
              onClick={() => onPriceRangeChange([0, 10])}
              className="rounded-full text-xs h-9 px-4"
            >
              Under $10
            </Button>
            <Button
              variant={priceRange[0] === 10 && priceRange[1] === 25 ? "default" : "outline"}
              size="sm"
              onClick={() => onPriceRangeChange([10, 25])}
              className="rounded-full text-xs h-9 px-4"
            >
              $10 - $25
            </Button>
            <Button
              variant={priceRange[0] === 25 && priceRange[1] === 50 ? "default" : "outline"}
              size="sm"
              onClick={() => onPriceRangeChange([25, 50])}
              className="rounded-full text-xs h-9 px-4"
            >
              $25 - $50
            </Button>
            <Button
              variant={priceRange[0] === 50 ? "default" : "outline"}
              size="sm"
              onClick={() => onPriceRangeChange([50, 1000])}
              className="rounded-full text-xs h-9 px-4"
            >
              Over $50
            </Button>
          </div>
        </div>

        {/* Clear Filters */}
        <div className="pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="w-full rounded-xl h-11"
          >
            Clear All Filters
          </Button>
        </div>
      </div>
    </Card>
  )
}

