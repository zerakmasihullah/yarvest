"use client"

import { Button } from "@/components/ui/button"
import { SlidersHorizontal, Grid3x3, List } from "lucide-react"

interface ProductViewControlsProps {
  showFilters: boolean
  onToggleFilters: () => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

export function ProductViewControls({
  showFilters,
  onToggleFilters,
  viewMode,
  onViewModeChange,
}: ProductViewControlsProps) {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        onClick={onToggleFilters}
        className={`h-12 px-6 rounded-xl border-2 transition-all ${showFilters ? "border-[#5a9c3a] bg-[#5a9c3a]/5" : "border-gray-200"} hover:bg-gray-50`}
      >
        <SlidersHorizontal className="w-5 h-5 mr-2" />
        Filters
      </Button>
      <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <Button
          variant="ghost"
          onClick={() => onViewModeChange("grid")}
          className={`h-12 px-5 rounded-none transition-all ${viewMode === "grid" ? "bg-[#5a9c3a] text-white" : "bg-white hover:bg-gray-50"}`}
        >
          <Grid3x3 className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => onViewModeChange("list")}
          className={`h-12 px-5 rounded-none transition-all ${viewMode === "list" ? "bg-[#5a9c3a] text-white" : "bg-white hover:bg-gray-50"}`}
        >
          <List className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}

