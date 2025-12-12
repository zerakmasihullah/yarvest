"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Package } from "lucide-react"
import { useState } from "react"
import { ApiDataFetcher } from "@/components/api-data-fetcher"
import { ApiCategoryCard, ApiCategory } from "@/components/api-category-card"
import { CategoryCardSkeleton } from "@/components/category-card-skeleton"

export default function CategoriesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [categories, setCategories] = useState<ApiCategory[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderLoading = () => (
    <CategoryCardSkeleton count={9} variant="default" />
  )

  const renderError = (error: string, retry: () => void) => (
    <div className="px-6 py-16 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <Package className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Error Loading Categories</h1>
        <p className="text-lg text-gray-600 mb-6">{error}</p>
        <Button onClick={retry} className="bg-[#0A5D31] hover:bg-[#0d7a3f]">
          Try Again
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Shop by Category
            </h1>
            <p className="text-lg text-gray-600">
              Discover our wide range of fresh products
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-[#0A5D31] focus:ring-2 focus:ring-[#0A5D31]/20 bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Results Count */}
          {searchQuery && categories.length > 0 && (
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-[#0A5D31]">{filteredCategories.length}</span> of {categories.length} categories
              </p>
            </div>
          )}

          {/* Categories List with ApiDataFetcher */}
          {filteredCategories.length === 0 && categories.length > 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No categories found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search query</p>
              <Button
                variant="outline"
                onClick={() => setSearchQuery("")}
                className="rounded-xl"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <ApiDataFetcher<ApiCategory>
              url="/categories"
              gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              renderItem={(category) => {
                // Apply search filter
                if (searchQuery && !category.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                  return null
                }
                return (
                  <ApiCategoryCard
                    key={category.id}
                    category={category}
                    variant="default"
                  />
                )
              }}
              renderLoading={renderLoading}
              renderError={renderError}
              renderEmpty={() => (
                <div className="text-center py-20 col-span-full">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                    <Package className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">No categories available</h3>
                  <p className="text-gray-600">There are no categories to display at the moment.</p>
                </div>
              )}
              onSuccess={(data) => setCategories(data)}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}


