"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import dynamic from "next/dynamic"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { type Farm } from "@/lib/farms-data"
import {
  getCachedCoordinates,
  saveCachedCoordinates,
  initializeGeocodingCache,
  type GeocodedFarm,
} from "@/lib/farms-geocoding-cache"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Globe, X } from "lucide-react"

// Fix for default marker icons in Next.js
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  })
}

// Create custom icon
const createCustomIcon = () => {
  return L.divIcon({
    className: "custom-farm-marker",
    html: `
      <div style="
        background-color: #5a9c3a;
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 16px;
          font-weight: bold;
        ">🌾</div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
}

// Dynamically import map components
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

// Component to handle map size
const MapSizeHandler = dynamic(
  () =>
    import("react-leaflet").then((mod) => {
      const { useMap } = mod
      return function MapSizeHandlerInner() {
        const map = useMap()
        useEffect(() => {
          const timer = setTimeout(() => {
            if (map && map.invalidateSize) {
              map.invalidateSize()
            }
          }, 100)
          return () => clearTimeout(timer)
        }, [map])
        return null
      }
    }),
  { ssr: false }
)

// Component to fit bounds - now receives already geocoded farms
const FitBounds = dynamic(
  () =>
    Promise.all([import("react-leaflet"), import("react")]).then(([leafletMod, reactMod]) => {
      const { useMap } = leafletMod
      const { useRef, useEffect } = reactMod
      return function FitBoundsInner({ farms }: { farms: Array<GeocodedFarm & { lat: number; lng: number }> }) {
        const map = useMap()
        const hasFittedRef = useRef(false)

        useEffect(() => {
          if (hasFittedRef.current || farms.length === 0) return

          const validCoords = farms
            .filter((farm) => 
              farm.lat && farm.lng && 
              !isNaN(farm.lat) && !isNaN(farm.lng) &&
              farm.lat >= -90 && farm.lat <= 90 &&
              farm.lng >= -180 && farm.lng <= 180
            )
            .map((farm) => [farm.lat, farm.lng] as [number, number])

          if (validCoords.length > 0) {
            try {
              const bounds = L.latLngBounds(validCoords)
              map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 })
              hasFittedRef.current = true
            } catch (err) {
              console.warn("Error fitting bounds:", err)
              map.setView([39.8283, -98.5795], 4)
            }
          } else {
            // Default to US center if no coordinates found
            map.setView([39.8283, -98.5795], 4)
          }
        }, [map, farms])

        return null
      }
    }),
  { ssr: false }
)

interface FarmsMapProps {
  farms: Farm[]
}

export function FarmsMap({ farms }: FarmsMapProps) {
  const [farmLocations, setFarmLocations] = useState<Array<GeocodedFarm & { lat: number; lng: number }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [geocodedCount, setGeocodedCount] = useState(0)
  const [initialized, setInitialized] = useState(false)
  const [currentFarm, setCurrentFarm] = useState<string>("")
  const [lastError, setLastError] = useState<string>("")

  // Geocode a single farm with retry logic
  const geocodeFarm = async (farm: Farm, retries = 1): Promise<(Farm & { lat: number; lng: number }) | null> => {
    // Build address from available fields
    let address = farm.full_address || ""
    
    if (!address || address.trim() === "") {
      // Try to build from components
      const parts: string[] = []
      if (farm.address && farm.address.trim() !== "") parts.push(farm.address.trim())
      if (farm.city && farm.city.trim() !== "") parts.push(farm.city.trim())
      if (farm.state && farm.state.trim() !== "") parts.push(farm.state.trim())
      if (farm.zip && farm.zip.trim() !== "") parts.push(farm.zip.trim())
      
      address = parts.join(", ")
    }
    
    // Clean up address - remove empty parts
    address = address.replace(/,\s*,/g, ",").replace(/^,\s*|\s*,$/g, "").trim()
    
    // Skip if still no valid address
    if (!address || address === "," || address === "" || address.split(",").every(p => !p.trim())) {
      console.warn(`No valid address for ${farm.name} - skipping`)
      return null
    }

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        // Add delay between retries
        if (attempt > 0) {
          await new Promise((resolve) => setTimeout(resolve, 2000 * attempt))
        }

        // Create abort controller for timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        let response: Response
        try {
          const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&addressdetails=1`
          response = await fetch(url, {
            headers: {
              "User-Agent": "Yarvest Farms Map (https://yarvest.com)",
              "Accept-Language": "en-US,en;q=0.9",
            },
            signal: controller.signal,
          })
        } catch (fetchError: any) {
          clearTimeout(timeoutId)
          if (fetchError.name === 'AbortError') {
            throw new Error('Request timeout')
          }
          throw fetchError
        }
        
        clearTimeout(timeoutId)

        if (!response.ok) {
          const status = response.status
          const statusText = response.statusText
          
          if (status === 429) {
            // Rate limited
            console.warn(`Rate limited (429) for ${farm.name}`)
            throw new Error('RATE_LIMITED')
          }
          
          if (status >= 500) {
            // Server error - retry once
            console.warn(`Server error (${status}) for ${farm.name}, retrying...`)
            if (attempt < retries) {
              await new Promise((resolve) => setTimeout(resolve, 3000))
              continue
            }
          }
          
          // Other HTTP errors
          console.warn(`HTTP error ${status} (${statusText}) for ${farm.name}`)
          return null
        }

        const data = await response.json()

        if (!data || !Array.isArray(data) || data.length === 0) {
          console.warn(`No results for ${farm.name} at address: ${address}`)
          return null
        }

        if (data[0].lat && data[0].lon) {
          const lat = parseFloat(data[0].lat)
          const lng = parseFloat(data[0].lon)
          
          // Validate coordinates
          if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
            return {
              ...farm,
              lat,
              lng,
            }
          } else {
            console.warn(`Invalid coordinates for ${farm.name}: lat=${lat}, lng=${lng}`)
          }
        }
        
        return null
      } catch (error: any) {
        if (error.message === 'RATE_LIMITED') {
          // Rate limited - don't retry, throw to stop the loop
          throw error
        }
        
        if (error.name === 'AbortError' || error.message === 'Request timeout') {
          // Timeout - don't retry
          console.warn(`Timeout geocoding ${farm.name}`)
          return null
        }
        
        if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('network'))) {
          // Network error - retry once
          console.warn(`Network error geocoding ${farm.name}, retrying...`)
          if (attempt < retries) {
            await new Promise((resolve) => setTimeout(resolve, 3000))
            continue
          }
        }
        
        // Last attempt failed or non-retryable error
        if (attempt === retries) {
          console.warn(`Failed to geocode ${farm.name} after ${retries + 1} attempts:`, error.message)
        }
      }
    }
    return null
  }

  // Initialize cache and geocode farms
  useEffect(() => {
    let cancelled = false

    async function loadAndGeocodeFarms() {
      setLoading(true)
      setError(null)
      setGeocodedCount(0)
      const locations: Array<GeocodedFarm & { lat: number; lng: number }> = []

      // Initialize cache with pre-geocoded data
      if (!initialized) {
        await initializeGeocodingCache()
        setInitialized(true)
      }

      // Process ALL farms (no limit)
      const farmsToProcess = farms
      
      if (farmsToProcess.length === 0) {
        setLoading(false)
        return
      }

      try {
        // First, load from cache
        const cachedLocations: Array<GeocodedFarm & { lat: number; lng: number }> = []
        const farmsToGeocode: Farm[] = []

        for (const farm of farmsToProcess) {
          if (cancelled) break

          const cached = getCachedCoordinates(farm)
          if (cached) {
            cachedLocations.push({
              ...farm,
              lat: cached.lat,
              lng: cached.lng,
            })
            setGeocodedCount(cachedLocations.length)
          } else {
            farmsToGeocode.push(farm)
          }
        }

        // Add cached locations immediately
        locations.push(...cachedLocations)
        setFarmLocations([...locations]) // Show cached farms immediately

        // Now geocode only the ones not in cache
        if (farmsToGeocode.length > 0 && !cancelled) {
          let consecutiveRateLimitFailures = 0
          const maxConsecutiveRateLimitFailures = 3 // Only stop on actual rate limits
          let skippedInvalidAddresses = 0
          
          console.log(`Geocoding ${farmsToGeocode.length} farms not in cache...`)
          
          for (let i = 0; i < farmsToGeocode.length; i++) {
            if (cancelled) break

            const farm = farmsToGeocode[i]
            setCurrentFarm(farm.name)
            console.log(`Geocoding ${i + 1}/${farmsToGeocode.length}: ${farm.name}`)
            
            try {
              const result = await geocodeFarm(farm)
              
              if (result) {
                // Save to cache
                saveCachedCoordinates(farm, result.lat, result.lng)
                locations.push(result)
                setGeocodedCount(locations.length)
                setFarmLocations([...locations]) // Update map in real-time
                consecutiveRateLimitFailures = 0 // Reset rate limit counter
                setLastError("")
                console.log(`✓ Successfully geocoded ${farm.name}`)
              } else {
                // Check if it was an invalid address (not a real failure)
                const address = farm.full_address || `${farm.address}, ${farm.city}, ${farm.state} ${farm.zip}`.trim()
                const cleanedAddress = address.replace(/,\s*,/g, ",").replace(/^,\s*|\s*,$/g, "").trim()
                
                if (!cleanedAddress || cleanedAddress === "," || cleanedAddress === "") {
                  skippedInvalidAddresses++
                  console.log(`⊘ Skipped ${farm.name} - invalid address`)
                } else {
                  // Real geocoding failure (no results found)
                  console.warn(`✗ No geocoding results for ${farm.name}`)
                }
              }
            } catch (error: any) {
              const errorMsg = error.message || error.toString() || "Unknown error"
              
              // If rate limited, count it and potentially stop
              if (error.message === 'RATE_LIMITED') {
                consecutiveRateLimitFailures++
                setLastError(`Rate limited (${consecutiveRateLimitFailures}/${maxConsecutiveRateLimitFailures})`)
                console.warn(`⚠ Rate limited for ${farm.name}`)
                
                if (consecutiveRateLimitFailures >= maxConsecutiveRateLimitFailures) {
                  console.warn(`Stopping geocoding after ${maxConsecutiveRateLimitFailures} consecutive rate limit errors.`)
                  setError(`Loaded ${locations.length} of ${farmsToProcess.length} farms. Rate limited - ${farmsToGeocode.length - i} farms remaining. Please refresh later.`)
                  break
                }
                // Wait longer after rate limit
                await new Promise((resolve) => setTimeout(resolve, 5000))
              } else {
                // Other errors - log but continue
                setLastError(`Error: ${errorMsg}`)
                console.error(`✗ Error geocoding ${farm.name}:`, error)
                consecutiveRateLimitFailures = 0 // Reset on non-rate-limit errors
              }
            }
            
            setCurrentFarm("")
            
            // Wait 1.5 seconds between requests to respect rate limits
            if (i < farmsToGeocode.length - 1 && consecutiveRateLimitFailures === 0) {
              await new Promise((resolve) => setTimeout(resolve, 1500))
            }
          }
          
          // Update final count
          if (skippedInvalidAddresses > 0) {
            console.log(`Skipped ${skippedInvalidAddresses} farms with invalid addresses`)
          }
        }

        if (!cancelled) {
          // Final update (already updated incrementally above)
          setFarmLocations(locations)
          
          if (locations.length === 0 && farmsToProcess.length > 0) {
            setError("Unable to geocode farm locations. Please try again later.")
          } else if (locations.length < farmsToProcess.length) {
            const missing = farmsToProcess.length - locations.length
            setError(`Showing ${locations.length} of ${farmsToProcess.length} farms. ${missing} farms could not be geocoded.`)
          }
        }
      } catch (err: any) {
        if (!cancelled) {
          console.error("Geocoding error:", err)
          setError("Error loading farm locations. Some farms may not appear on the map.")
          setFarmLocations(locations)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    if (farms.length > 0) {
      loadAndGeocodeFarms()
    } else {
      setLoading(false)
    }

    return () => {
      cancelled = true
    }
  }, [farms, initialized])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center max-w-md px-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#5a9c3a] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading farm locations...</p>
          {geocodedCount > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Loaded {geocodedCount} of {farms.length} farms...
            </p>
          )}
          {currentFarm && (
            <p className="text-xs text-gray-400 mt-2">
              Processing: {currentFarm}
            </p>
          )}
          {lastError && (
            <p className="text-xs text-yellow-600 mt-2 bg-yellow-50 px-2 py-1 rounded">
              {lastError}
            </p>
          )}
        </div>
      </div>
    )
  }

  if (farmLocations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center p-8">
          <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 font-medium mb-2">No farm locations found</p>
          {error && (
            <p className="text-sm text-red-600 mb-4">{error}</p>
          )}
          <p className="text-sm text-gray-500">
            {farms.length > 50 
              ? `Showing first 50 farms. ${farms.length - 50} more farms available in list view.`
              : "Try adjusting your filters or check back later."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      {error && (
        <div className="absolute top-4 left-4 right-4 z-[1000] bg-yellow-50 border border-yellow-200 rounded-lg p-3 shadow-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ {error} Showing {farmLocations.length} of {farms.length} farms on map.
          </p>
        </div>
      )}
      {farmLocations.length < farms.length && (
        <div className="absolute top-4 right-4 z-[1000] bg-blue-50 border border-blue-200 rounded-lg p-3 shadow-lg max-w-xs">
          <p className="text-sm text-blue-800">
            Showing {farmLocations.length} of {farms.length} farms on map.
          </p>
        </div>
      )}
      <style jsx global>{`
        .leaflet-container {
          height: 100% !important;
          width: 100% !important;
          z-index: 0;
          font-family: inherit;
        }
        .custom-farm-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          padding: 0;
        }
        .leaflet-popup-content {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapSizeHandler />
        <FitBounds farms={farmLocations} />
        {farmLocations.map((farm, index) => (
          <Marker
            key={`${farm.name}-${index}`}
            position={[farm.lat, farm.lng]}
            icon={createCustomIcon()}
          >
            <Popup className="custom-popup" maxWidth={350}>
              <FarmPopupContent farm={farm} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

function FarmPopupContent({ farm }: { farm: Farm & { lat: number; lng: number } }) {
  const produceList = farm.produce
    ? farm.produce.split(",").map((p) => p.trim()).filter(Boolean)
    : []

  return (
    <Card className="border-0 shadow-none m-0 w-[300px] max-w-[300px]">
      <Card className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-gray-900 mb-1">{farm.name}</h3>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-[#5a9c3a] mt-0.5 flex-shrink-0" />
            <span>
              {farm.city && farm.state
                ? `${farm.city}, ${farm.state}`
                : farm.full_address || farm.address || "Location not specified"}
            </span>
          </div>
        </div>

        {farm.farm_type && (
          <Badge variant="outline" className="bg-[#5a9c3a]/10 text-[#5a9c3a] border-[#5a9c3a]/20 text-xs">
            {farm.farm_type}
          </Badge>
        )}

        {produceList.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-700 mb-1.5">Produce:</p>
            <div className="flex flex-wrap gap-1.5">
              {produceList.slice(0, 4).map((produce, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs py-0.5">
                  {produce}
                </Badge>
              ))}
              {produceList.length > 4 && (
                <Badge variant="secondary" className="text-xs py-0.5">
                  +{produceList.length - 4}
                </Badge>
              )}
            </div>
          </div>
        )}

        {(farm.phone || farm.website) && (
          <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
            {farm.phone && (
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <Phone className="h-3.5 w-3.5" />
                <span>{farm.phone}</span>
              </div>
            )}
            {farm.website && (
              <a
                href={farm.website.startsWith("http") ? farm.website : `https://${farm.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#5a9c3a] hover:underline"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Website</span>
              </a>
            )}
          </div>
        )}
      </Card>
    </Card>
  )
}

