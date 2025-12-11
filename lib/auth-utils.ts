import type { User, Role } from './auth'
import { storeAuthToken, getDashboardPath } from './auth'
import api from './axios'

/**
 * Transform backend user data to frontend User format
 */
export function transformBackendUser(user: any): Omit<User, "password"> {
  return {
    id: user.id.toString(),
    unique_id: user.unique_id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone || '',
    email_verified_at: user.email_verified_at,
    phone_verified_at: user.phone_verified_at,
    image: user.image,
    status: user.status,
    user_vehicle_id: user.user_vehicle_id,
    referral_code: user.refferal_code || user.referral_code || '',
    createdAt: user.created_at || new Date().toISOString(),
  }
}

/**
 * Map backend roles to frontend Role format
 */
export function mapBackendRoles(roles: any[]): Role[] {
  return roles.map((role: any) => {
    const roleName = role.name?.toLowerCase()
    if (roleName === 'buyer') return 'buyer'
    if (roleName === 'seller' || roleName === 'producer') return 'seller'
    if (roleName === 'helper' || roleName === 'volunteer') return 'helper'
    if (roleName === 'deliverer' || roleName === 'delivery driver') return 'deliverer'
    return 'buyer' // default
  })
}

/**
 * Handle login API call and return transformed data
 */
export interface LoginResult {
  success: boolean
  message: string
  user?: Omit<User, "password">
  roles?: Role[]
  token?: string
  dashboardPath?: string
}

export async function handleLogin(
  email: string,
  password: string,
  rememberMe: boolean = false
): Promise<LoginResult> {
  try {
    const response = await api.post('/login', {
      email: email.trim(),
      password,
      remember_me: rememberMe,
    })

    if (response.data.success && response.data.data) {
      const { user, roles, token } = response.data.data
      
      storeAuthToken(token)
      
      const transformedUser = transformBackendUser(user)
      const frontendRoles = mapBackendRoles(roles)
      const dashboardPath = frontendRoles.length > 0 
        ? getDashboardPath(frontendRoles)
        : '/'

      return {
        success: true,
        message: 'Login successful',
        user: transformedUser,
        roles: frontendRoles,
        token,
        dashboardPath,
      }
    } else {
      return {
        success: false,
        message: response.data.message || 'Login failed. Please try again.',
      }
    }
  } catch (err: any) {
    let message = 'An error occurred. Please try again.'
    
    if (err.response) {
      message = err.response.data?.message || err.response.data?.error || 'Login failed. Please check your credentials.'
    } else if (err.request) {
      message = 'Unable to connect to server. Please check your internet connection.'
    } else if (err.message) {
      message = err.message
    }
    
    return {
      success: false,
      message,
    }
  }
}

/**
 * Normalize string for comparison (trim, lowercase, normalize spaces)
 */
const normalizeString = (str: string | undefined | null): string => {
  return (str || '').toString().trim().toLowerCase().replace(/\s+/g, ' ')
}

/**
 * Check if two addresses are duplicates based on key fields
 */
function areAddressesDuplicate(addr1: any, addr2: any): boolean {
  const fields = ['street_address', 'city', 'state', 'postal_code'] as const
  
  // Check core fields match
  for (const field of fields) {
    if (normalizeString(addr1[field]) !== normalizeString(addr2[field])) {
      return false
    }
  }
  
  // If both have apt numbers, they must match
  const apt1 = normalizeString(addr1.apt)
  const apt2 = normalizeString(addr2.apt)
  if (apt1 && apt2 && apt1 !== apt2) {
    return false
  }
  
  return true
}

/**
 * Migrate local addresses from localStorage to backend after login/signup
 * - Prevents duplicates by comparing with existing backend addresses
 * - Preserves active address status
 * - Clears localStorage after successful migration
 */
export async function migrateLocalAddressesToBackend(): Promise<void> {
  try {
    // Get local addresses from localStorage
    const stored = localStorage.getItem('temp_addresses')
    if (!stored) return

    // Parse and validate local addresses
    let localAddresses: any[]
    try {
      const parsed = JSON.parse(stored)
      localAddresses = Array.isArray(parsed) ? parsed : [parsed]
    } catch {
      return // Invalid JSON
    }

    // Filter valid addresses
    const validAddresses = localAddresses.filter(
      (addr: any) => addr.street_address && addr.city && addr.state && addr.postal_code
    )
    if (validAddresses.length === 0) return

    // Fetch existing backend addresses for duplicate checking
    let existingAddresses: any[] = []
    try {
      const response = await api.get('/addresses')
      existingAddresses = response.data.data || []
    } catch (error) {
      console.error('Error fetching existing addresses:', error)
      // Continue migration even if fetch fails
    }

    // Find active address from local storage
    const activeLocalAddress = validAddresses.find((a: any) => a.status === true) || validAddresses[0]
    let activeAddressId: number | string | null = null
    let migratedCount = 0

    // Migrate only non-duplicate addresses
    for (const localAddr of validAddresses) {
      try {
        // Check for duplicate
        const duplicate = existingAddresses.find(existing => 
          areAddressesDuplicate(localAddr, existing)
        )

        if (duplicate) {
          // If this was active, remember the duplicate's backend ID
          if (localAddr.id === activeLocalAddress.id) {
            activeAddressId = duplicate.id
          }
          continue
        }

        // Migrate new address
        const { id, temp, ...addressData } = localAddr
        const isActive = localAddr.id === activeLocalAddress.id
        const payload = { ...addressData, status: isActive }

        const response = await api.post('/addresses', payload)
        const savedAddress = response.data.data || response.data

        if (isActive) {
          activeAddressId = savedAddress.id
        }
        migratedCount++
      } catch (error: any) {
        // Skip duplicates detected by server
        if (error.response?.status === 409 || error.response?.status === 422) {
          continue
        }
        console.error('Error migrating address:', error)
      }
    }

    // Set active address in backend if we have one
    if (activeAddressId) {
      try {
        await api.put(`/addresses/${activeAddressId}`, { status: true })
      } catch (error) {
        console.error('Error setting active address:', error)
      }
    }

    // Clear localStorage after migration
    if (migratedCount > 0 || existingAddresses.length > 0) {
      localStorage.removeItem('temp_addresses')
      localStorage.removeItem('temp_delivery_address')
    }
  } catch (error) {
    console.error('Error migrating addresses:', error)
    // Don't throw - migration failure shouldn't break login/signup
  }
}
