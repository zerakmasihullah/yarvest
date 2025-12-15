"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Map as MapIcon, ArrowLeft, Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

const MapView = dynamic(() => import("@/components/map-view").then(mod => ({ default: mod.MapView })), {
  ssr: false,
})
import { ApiProduct } from "@/components/api-product-card"
import { calculateProductPrices } from "@/lib/product-utils"
import { getImageUrl } from "@/lib/utils"
import Link from "next/link"
import api from "@/lib/axios"

interface SellerLocation {
  id: number
  sellerId: number
  sellerName: string
  lat: number
  lng: number
  location: string
  products: ApiProduct[]
  image?: string
}

export default function ProductsMapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [products, setProducts] = useState<ApiProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFetching, setIsFetching] = useState(false)
  const router = useRouter()

  // Fetch products with locations
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await api.get('/products/with-locations', {
          params: {
            limit: 200,
            page: 1,
          }
        })
        
        const fetchedProducts = response.data?.data || []
        console.log('Fetched products:', fetchedProducts.length)
        console.log('Sample product:', fetchedProducts[0])
        
        setProducts(fetchedProducts)
      } catch (err: any) {
        console.error('Error fetching products:', err)
        setError(err.response?.data?.message || 'Failed to load products. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Group products by seller location
  const sellerLocations = useMemo(() => {
    const sellerMap = new Map<string, {
      sellerId: number
      sellerUniqueId: string
      sellerName: string
      lat: number
      lng: number
      location: string
      products: ApiProduct[]
      image?: string
      rating?: number
      reviewsCount?: number
    }>()

    let skippedCount = 0
    products.forEach(product => {
      // Seller location data is now included directly from the API
      const seller = product.seller as any
      
      // Check if seller has latitude and longitude (from new API)
      if (!seller?.latitude || !seller?.longitude) {
        skippedCount++
        return // Skip products without coordinates
      }

      const lat = parseFloat(String(seller.latitude))
      const lng = parseFloat(String(seller.longitude))

      if (isNaN(lat) || isNaN(lng)) {
        skippedCount++
        return
      }

      const sellerUniqueId = seller.unique_id || seller.id?.toString() || 'unknown'
      const locationStr = seller.address?.full_location || 
        (seller.address?.city && seller.address?.state 
          ? `${seller.address.city}, ${seller.address.state}` 
          : seller.address?.city || seller.address?.state || 'Location not specified')
      
      if (!sellerMap.has(sellerUniqueId)) {
        sellerMap.set(sellerUniqueId, {
          sellerId: seller.id,
          sellerUniqueId,
          sellerName: seller.full_name || seller.name || 'Unknown Seller',
          lat,
          lng,
          location: locationStr,
          products: [],
          image: seller.image ? getImageUrl(seller.image) : undefined,
          rating: product.reviews?.average_rating,
          reviewsCount: product.reviews?.total || 0,
        })
      }

      const sellerData = sellerMap.get(sellerUniqueId)!
      sellerData.products.push(product)
      // Update rating if this product has better reviews
      if (product.reviews?.average_rating && (!sellerData.rating || product.reviews.average_rating > sellerData.rating)) {
        sellerData.rating = product.reviews.average_rating
      }
      sellerData.reviewsCount = (sellerData.reviewsCount || 0) + (product.reviews?.total || 0)
    })

    if (skippedCount > 0) {
      console.log(`Skipped ${skippedCount} products without valid coordinates`)
    }

    const locations = Array.from(sellerMap.values()).map((seller) => ({
      id: seller.sellerId,
      sellerId: seller.sellerId,
      sellerUniqueId: seller.sellerUniqueId,
      name: seller.sellerName,
      lat: seller.lat,
      lng: seller.lng,
      location: seller.location,
      products: seller.products,
      image: seller.image,
      productImage: seller.products[0]?.main_image ? getImageUrl(seller.products[0].main_image, seller.products[0].name) : seller.image,
      productsCount: seller.products.length,
      rating: seller.rating,
      reviews: seller.reviewsCount,
      link: `/producers/${seller.sellerUniqueId}`,
    }))

    console.log(`Created ${locations.length} seller locations from ${products.length} products`)
    return locations
  }, [products])

  // Calculate map center
  const mapCenter = useMemo(() => {
    if (sellerLocations.length === 0) return [37.7749, -122.4194] as [number, number]
    const avgLat = sellerLocations.reduce((sum, loc) => sum + loc.lat, 0) / sellerLocations.length
    const avgLng = sellerLocations.reduce((sum, loc) => sum + loc.lng, 0) / sellerLocations.length
    return [avgLat, avgLng] as [number, number]
  }, [sellerLocations])

  const handleRefresh = () => {
    setProducts([])
    setError(null)
    setLoading(true)
    // Trigger re-fetch
    window.location.reload()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <main className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-3 sm:px-4 py-3 shadow-sm bg-white sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/products")}
                className="rounded-full flex-shrink-0"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
              <span className="font-bold text-base sm:text-xl md:text-2xl text-gray-900 flex items-center gap-2 truncate">
                <MapIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#5a9c3a] flex-shrink-0" />
                <span className="truncate">Products Map</span>
              </span>
            </div>
            {!loading && (
              <div className="flex flex-row items-center gap-2 text-xs sm:text-sm text-gray-600 w-full sm:w-auto justify-end sm:justify-start">
                <span className="font-medium whitespace-nowrap">{sellerLocations.length} {sellerLocations.length === 1 ? 'seller' : 'sellers'}</span>
                <span className="text-gray-400">•</span>
                <span className="whitespace-nowrap">{products.length} {products.length === 1 ? 'product' : 'products'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Map Container */}
        <div className="h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)] w-full relative">
          {loading ? (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-green-50/20 to-gray-50">
              <div className="text-center p-8">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-[#5a9c3a]/20 rounded-full blur-xl animate-pulse"></div>
                  <Loader2 className="w-20 h-20 text-[#5a9c3a] mx-auto relative animate-spin" />
                </div>
                <p className="text-gray-700 font-semibold text-lg mb-2">Loading product locations...</p>
                <p className="text-sm text-gray-500">Please wait while we fetch product data</p>
                <div className="mt-4 flex justify-center gap-2">
                  <div className="w-2 h-2 bg-[#5a9c3a] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-[#5a9c3a] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-[#5a9c3a] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-red-50/20 to-gray-50">
              <div className="text-center p-8 max-w-md">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
                  <AlertCircle className="w-20 h-20 text-red-500 mx-auto relative" />
                </div>
                <p className="text-gray-700 font-semibold text-lg mb-2">Failed to load products</p>
                <p className="text-sm text-gray-500 mb-4">{error}</p>
                <Button
                  onClick={handleRefresh}
                  className="bg-[#5a9c3a] hover:bg-[#0d7a3f] text-white"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          ) : sellerLocations.length === 0 ? (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-green-50/20 to-gray-50">
              <div className="text-center p-8 max-w-md">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-[#5a9c3a]/20 rounded-full blur-xl"></div>
                  <MapIcon className="w-20 h-20 text-[#5a9c3a] mx-auto relative" />
                </div>
                <p className="text-gray-700 font-semibold text-lg mb-2">No products with locations found</p>
                <p className="text-sm text-gray-500 mb-4">
                  {products.length > 0 
                    ? `${products.length} products found, but none have valid location data. Sellers need to add addresses with coordinates.`
                    : 'No products are available at the moment. Please check back later.'}
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={handleRefresh}
                    variant="outline"
                    className="border-[#5a9c3a] text-[#5a9c3a] hover:bg-[#5a9c3a] hover:text-white"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button
                    onClick={() => router.push('/products')}
                    className="bg-[#5a9c3a] hover:bg-[#0d7a3f] text-white"
                  >
                    View Products List
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <MapView
              locations={sellerLocations.map(loc => ({
                id: loc.id,
                name: loc.name,
                lat: loc.lat,
                lng: loc.lng,
                location: loc.location,
                image: loc.image,
                productImage: loc.productImage,
                link: loc.link,
                products: loc.productsCount,
                rating: loc.rating,
                reviews: loc.reviews,
                productsList: loc.products.map(p => ({
                  id: p.id,
                  name: p.name,
                  price: calculateProductPrices(p).price,
                  image: getImageUrl(p.main_image, p.name),
                  link: `/products/${p.unique_id || p.id}`,
                })),
              }))}
              center={mapCenter}
              zoom={sellerLocations.length === 1 ? 10 : 6}
              showHeatMap={false}
              title=""
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
