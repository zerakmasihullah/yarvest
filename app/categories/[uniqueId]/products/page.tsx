"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Package, ArrowLeft } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { transformProducts, type TransformedProduct } from "@/lib/product-api"
import { useApiFetch } from "@/hooks/use-api-fetch"
import { CategoryDetailsSkeleton } from "@/components/category-details-skeleton"
import { ProductFilters } from "@/components/product-filters"
import { ProductSearchSort } from "@/components/product-search-sort"
import { ProductViewControls } from "@/components/product-view-controls"
import { CategoryHeader } from "@/components/category-header"

// Use TransformedProduct from product-api.ts
type Product = TransformedProduct

interface Category {
  id: number
  name: string
  unique_id: string
  image?: string
  slug?: string
}

interface CategoryProductsResponse {
  category: Category
  products: any[]
  count: number
}

export default function CategoryProductsPage() {
  const params = useParams()
  const router = useRouter()
  const uniqueId = params.uniqueId as string

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [sortBy, setSortBy] = useState("featured")
  const [isMounted, setIsMounted] = useState(false)

  // Track when component mounts on client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Fetch products using useApiFetch hook
  const { data: responseData, loading, error, refetch } = useApiFetch<CategoryProductsResponse>(
    `/categories/${uniqueId}/products`,
    { enabled: !!uniqueId }
  )

  // Extract category and products from response
  const category = responseData?.category || null
  const rawProducts = responseData?.products || []
  
  // Use loading state - show skeleton when loading or not mounted yet
  const isLoading = loading || !isMounted

  // Transform products using the API utility function
  const products = useMemo(() => {
    return transformProducts(rawProducts)
  }, [rawProducts])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    // Check if filters are at default (no active filtering)
    const hasSearchQuery = searchQuery.trim().length > 0
    const isDefaultPriceRange = priceRange[0] === 0 && priceRange[1] === 1000
    const hasActiveFilters = hasSearchQuery || !isDefaultPriceRange
    
    // Filter products
    let filtered = products
    if (hasActiveFilters) {
      filtered = products.filter((product) => {
        // Search filter
        const matchesSearch = !hasSearchQuery || 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.producer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.code?.toLowerCase().includes(searchQuery.toLowerCase())
        
        // Price filter - handle edge cases
        let price = typeof product.price === "number" ? product.price : parseFloat(product.price.toString())
        if (isNaN(price) || price < 0) {
          price = 0
        }
        const matchesPrice = price >= priceRange[0] && price <= priceRange[1]
        
        return matchesSearch && matchesPrice
      })
    }
    
    // Sort products
    return filtered.sort((a, b) => {
      if (sortBy === "price-low") {
        const priceA = typeof a.price === "number" ? a.price : parseFloat(a.price.toString()) || 0
        const priceB = typeof b.price === "number" ? b.price : parseFloat(b.price.toString()) || 0
        return priceA - priceB
      }
      if (sortBy === "price-high") {
        const priceA = typeof a.price === "number" ? a.price : parseFloat(a.price.toString()) || 0
        const priceB = typeof b.price === "number" ? b.price : parseFloat(b.price.toString()) || 0
        return priceB - priceA
      }
      if (sortBy === "rating") {
        return (b.rating || 0) - (a.rating || 0)
      }
      return 0
    })
  }, [products, searchQuery, priceRange, sortBy])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const handleProductClick = (id: number) => {
    router.push(`/products/${id}`)
  }

  const handleAddToCart = (id: number) => {
    // Add to cart logic here
    console.log("Add to cart:", id)
  }

  // Auto-scroll to top when products load
  useEffect(() => {
    if (!isLoading && products.length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [isLoading, products.length])

  // Show skeleton when loading
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto">
          <CategoryDetailsSkeleton />
        </main>
        <Footer />
      </div>
    )
  }

  if (error && products.length === 0) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto">
          <div className="px-6 py-16 bg-gradient-to-b from-white to-gray-50/50">
            <div className="max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                <Package className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Error Loading Products</h1>
              <p className="text-lg text-gray-600 mb-6">{error}</p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => router.back()} variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
                <Button onClick={refetch} className="bg-[#0A5D31] hover:bg-[#0d7a3f]">
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1">
        <div className="bg-white">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
              {/* Category Header */}
              <CategoryHeader
                categoryName={category?.name || uniqueId}
                categoryImage={category?.image}
                productsCount={products.length}
                filteredCount={filteredProducts.length}
              />

              {/* Controls Bar */}
              <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <ProductViewControls
                  showFilters={showFilters}
                  onToggleFilters={() => setShowFilters(!showFilters)}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />
                <ProductSearchSort
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
              </div>

              {/* Filters Panel */}
              <ProductFilters
                showFilters={showFilters}
                onClose={() => setShowFilters(false)}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                onClearFilters={() => {
                  setPriceRange([0, 1000])
                  setSearchQuery("")
                }}
              />

              {/* Results Count */}
              {filteredProducts.length > 0 && (
                <div className="mb-6 flex items-center gap-4">
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-bold text-[#0A5D31]">{filteredProducts.length}</span> of {products.length} products
                  </p>
                </div>
              )}

              {/* Products Grid/List */}
              {products.length === 0 && !isLoading ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">
                    {error || "No products available in this category"}
                  </p>
                  {error && (
                    <Button onClick={refetch} className="bg-[#0A5D31] hover:bg-[#0d7a3f]">
                      Retry
                    </Button>
                  )}
                </div>
              ) : filteredProducts.length === 0 && products.length > 0 ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No products match your filters</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery ? "Try adjusting your search query" : "Try adjusting your filters"}
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery("")
                      setPriceRange([0, 1000])
                    }} 
                    className="rounded-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      unit={product.unit}
                      code={product.code || ""}
                      image={product.image || null}
                      producer={product.producer || "Unknown Producer"}
                      rating={product.rating || 0}
                      reviews={product.reviews || 0}
                      badge={product.badge}
                      organic={product.organic}
                      isFavorite={favorites.includes(product.id)}
                      onToggleFavorite={toggleFavorite}
                      onAddToCart={handleAddToCart}
                      onClick={handleProductClick}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

