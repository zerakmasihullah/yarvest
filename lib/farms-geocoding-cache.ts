import { type Farm } from "./farms-data"

export interface GeocodedFarm extends Farm {
  lat?: number
  lng?: number
  geocoded_at?: string
}

const CACHE_KEY = "farms_geocoding_cache"
const CACHE_VERSION = "1.0"

interface GeocodingCache {
  version: string
  farms: Record<string, { lat: number; lng: number; geocoded_at: string }>
}

// Get cache from localStorage
export function getGeocodingCache(): GeocodingCache {
  if (typeof window === "undefined") {
    return { version: CACHE_VERSION, farms: {} }
  }

  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      if (parsed.version === CACHE_VERSION) {
        return parsed
      }
    }
  } catch (error) {
    console.warn("Error reading geocoding cache:", error)
  }

  return { version: CACHE_VERSION, farms: {} }
}

// Save cache to localStorage
export function saveGeocodingCache(cache: GeocodingCache): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch (error) {
    console.warn("Error saving geocoding cache:", error)
  }
}

// Get cache key for a farm (based on name and address)
export function getFarmCacheKey(farm: Farm): string {
  const address = farm.full_address || `${farm.address}, ${farm.city}, ${farm.state} ${farm.zip}`.trim()
  return `${farm.name}|${address}`
}

// Get cached coordinates for a farm
export function getCachedCoordinates(farm: Farm): { lat: number; lng: number } | null {
  const cache = getGeocodingCache()
  const key = getFarmCacheKey(farm)
  const cached = cache.farms[key]
  
  if (cached && cached.lat && cached.lng) {
    return { lat: cached.lat, lng: cached.lng }
  }
  
  return null
}

// Save coordinates for a farm
export function saveCachedCoordinates(farm: Farm, lat: number, lng: number): void {
  const cache = getGeocodingCache()
  const key = getFarmCacheKey(farm)
  
  cache.farms[key] = {
    lat,
    lng,
    geocoded_at: new Date().toISOString(),
  }
  
  saveGeocodingCache(cache)
}

// Load pre-geocoded data from JSON file (for initial population)
export async function loadPreGeocodedData(): Promise<Record<string, { lat: number; lng: number }>> {
  try {
    const response = await fetch("/farms-geocoded.json", { cache: "no-store" })
    if (response.ok) {
      const data = await response.json()
      return data.farms || {}
    }
  } catch (error) {
    console.warn("Could not load pre-geocoded data:", error)
  }
  return {}
}

// Initialize cache with pre-geocoded data
export async function initializeGeocodingCache(): Promise<void> {
  const cache = getGeocodingCache()
  const preGeocoded = await loadPreGeocodedData()
  
  // Merge pre-geocoded data into cache (don't overwrite existing)
  let updated = false
  for (const [key, coords] of Object.entries(preGeocoded)) {
    if (!cache.farms[key] && coords.lat && coords.lng) {
      cache.farms[key] = {
        ...coords,
        geocoded_at: new Date().toISOString(),
      }
      updated = true
    }
  }
  
  if (updated) {
    saveGeocodingCache(cache)
  }
}

