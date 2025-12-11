import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '@/lib/axios'

export interface Address {
  id?: number | string
  street_address: string
  city: string
  state: string
  country: string
  postal_code: string
  apt?: string
  business_name?: string
  latitude?: number
  longitude?: number
  status?: boolean
  temp?: boolean
}

interface AddressState {
  addresses: Address[]
  activeAddress: Address | null
  isLoading: boolean
  fetchAddresses: () => Promise<void>
  addAddress: (address: Address) => Promise<void>
  updateAddress: (id: number | string, address: Partial<Address>) => Promise<void>
  deleteAddress: (id: number | string) => Promise<void>
  setActiveAddress: (id: number | string) => Promise<void>
  loadLocalAddresses: () => void
  saveLocalAddress: (address: Address) => void
  updateLocalAddress: (id: number | string, address: Partial<Address>) => void
  deleteLocalAddress: (id: number | string) => void
  setLocalActiveAddress: (id: number | string) => void
  saveAddressesToLocalStorage: () => void
}

// Helper: Update addresses with new active status
const updateAddressesWithActive = (
  addresses: Address[],
  activeId: number | string | null | undefined
): Address[] => {
  return addresses.map(a => ({
    ...a,
    status: a.id === activeId ? true : false
  }))
}

// Helper: Sync localStorage with addresses
const syncLocalStorage = (addresses: Address[], activeAddress: Address | null) => {
  if (addresses.length > 0) {
    localStorage.setItem('temp_addresses', JSON.stringify(addresses))
    if (activeAddress) {
      localStorage.setItem('temp_delivery_address', JSON.stringify(activeAddress))
    }
  } else {
    localStorage.removeItem('temp_addresses')
    localStorage.removeItem('temp_delivery_address')
  }
}

// Helper: Find active address from array
const findActiveAddress = (addresses: Address[]): Address | null => {
  return addresses.find(a => a.status === true) || addresses[0] || null
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: [],
      activeAddress: null,
      isLoading: false,

      fetchAddresses: async () => {
        set({ isLoading: true })
        try {
          const response = await api.get('/addresses')
          const addresses = response.data.data || []
          const activeAddress = findActiveAddress(addresses)
          set({ addresses, activeAddress, isLoading: false })
        } catch (error) {
          console.error('Error fetching addresses:', error)
          set({ isLoading: false })
        }
      },

      addAddress: async (address: Address) => {
        try {
          const { addresses } = get()
          const payload = { ...address, status: true }
          const response = await api.post('/addresses', payload)
          const newAddress = response.data.data || response.data
          
          const updatedAddresses = updateAddressesWithActive(
            [...addresses, newAddress],
            newAddress.id
          )
          set({ addresses: updatedAddresses, activeAddress: newAddress })
        } catch (error) {
          console.error('Error adding address:', error)
          throw error
        }
      },

      updateAddress: async (id: number | string, address: Partial<Address>) => {
        try {
          const { addresses } = get()
          const response = await api.put(`/addresses/${id}`, address)
          const updated = response.data.data || response.data
          
          const updatedAddresses = address.status === true
            ? updateAddressesWithActive(addresses, id)
            : addresses.map(a => a.id === id ? updated : a)
          
          const activeAddress = address.status === true ? updated : get().activeAddress
          set({ addresses: updatedAddresses, activeAddress })
        } catch (error) {
          console.error('Error updating address:', error)
          throw error
        }
      },

      deleteAddress: async (id: number | string) => {
        try {
          const { addresses, activeAddress } = get()
          const wasActive = activeAddress?.id === id
          
          await api.delete(`/addresses/${id}`)
          
          const updatedAddresses = addresses.filter(a => a.id !== id)
          
          // If deleted address was active, set first remaining as active
          if (wasActive && updatedAddresses.length > 0) {
            const firstAddress = updatedAddresses[0]
            try {
              await api.put(`/addresses/${firstAddress.id}`, { status: true })
              const finalAddresses = updateAddressesWithActive(updatedAddresses, firstAddress.id)
              set({ 
                addresses: finalAddresses, 
                activeAddress: { ...firstAddress, status: true } 
              })
            } catch (error) {
              console.error('Error setting new active address:', error)
              set({ addresses: updatedAddresses, activeAddress: firstAddress })
            }
          } else {
            set({ 
              addresses: updatedAddresses, 
              activeAddress: wasActive ? null : activeAddress 
            })
          }
        } catch (error) {
          console.error('Error deleting address:', error)
          throw error
        }
      },

      setActiveAddress: async (id: number | string) => {
        try {
          await api.put(`/addresses/${id}`, { status: true })
          const { addresses } = get()
          const updatedAddresses = updateAddressesWithActive(addresses, id)
          const activeAddress = updatedAddresses.find(a => a.id === id) || null
          set({ addresses: updatedAddresses, activeAddress })
        } catch (error) {
          console.error('Error setting active address:', error)
          throw error
        }
      },

      loadLocalAddresses: () => {
        try {
          const stored = localStorage.getItem('temp_addresses')
          if (!stored) {
            set({ addresses: [], activeAddress: null })
            return
          }
          
          const addresses = JSON.parse(stored)
          const addressArray = Array.isArray(addresses) ? addresses : [addresses]
          const activeAddress = findActiveAddress(addressArray)
          set({ addresses: addressArray, activeAddress })
        } catch {
          set({ addresses: [], activeAddress: null })
        }
      },

      saveLocalAddress: (address: Address) => {
        const { addresses } = get()
        const newAddress: Address = {
          ...address,
          id: address.id || `temp_${Date.now()}`,
          temp: true,
          status: true,
        }
        
        const updatedAddresses = updateAddressesWithActive(
          [...addresses, newAddress],
          newAddress.id
        )
        
        syncLocalStorage(updatedAddresses, newAddress)
        set({ addresses: updatedAddresses, activeAddress: newAddress })
      },

      updateLocalAddress: (id: number | string, address: Partial<Address>) => {
        const { addresses } = get()
        
        const updatedAddresses = address.status === true
          ? updateAddressesWithActive(addresses, id)
          : addresses.map(a => a.id === id ? { ...a, ...address } : a)
        
        const activeAddress = address.status === true
          ? updatedAddresses.find(a => a.id === id) || null
          : get().activeAddress
        
        syncLocalStorage(updatedAddresses, activeAddress)
        set({ addresses: updatedAddresses, activeAddress })
      },

      deleteLocalAddress: (id: number | string) => {
        const { addresses, activeAddress } = get()
        const updatedAddresses = addresses.filter(a => a.id !== id)
        const wasActive = activeAddress?.id === id
        
        let newActiveAddress: Address | null = activeAddress
        
        // If deleted address was active, set first remaining as active
        if (wasActive && updatedAddresses.length > 0) {
          const finalAddresses = updateAddressesWithActive(updatedAddresses, updatedAddresses[0].id)
          newActiveAddress = finalAddresses[0]
          syncLocalStorage(finalAddresses, newActiveAddress)
          set({ addresses: finalAddresses, activeAddress: newActiveAddress })
        } else {
          syncLocalStorage(updatedAddresses, newActiveAddress)
          set({ addresses: updatedAddresses, activeAddress: newActiveAddress })
        }
      },

      setLocalActiveAddress: (id: number | string) => {
        const { addresses } = get()
        const updatedAddresses = updateAddressesWithActive(addresses, id)
        const activeAddress = updatedAddresses.find(a => a.id === id) || null
        syncLocalStorage(updatedAddresses, activeAddress)
        set({ addresses: updatedAddresses, activeAddress })
      },

      saveAddressesToLocalStorage: () => {
        const { addresses, activeAddress } = get()
        
        if (addresses.length === 0) return
        
        // Convert backend addresses to local format
        const localAddresses: Address[] = addresses.map((addr, index) => {
          const localId = addr.temp && addr.id 
            ? addr.id 
            : `temp_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`
          
          return {
            street_address: addr.street_address,
            city: addr.city,
            state: addr.state,
            country: addr.country || 'USA',
            postal_code: addr.postal_code,
            apt: addr.apt,
            business_name: addr.business_name,
            latitude: addr.latitude,
            longitude: addr.longitude,
            status: addr.id === activeAddress?.id,
            id: localId,
            temp: true,
          }
        })
        
        // Find the local version of the active address
        const activeIndex = activeAddress 
          ? addresses.findIndex(a => a.id === activeAddress.id)
          : -1
        const localActiveAddress = activeIndex >= 0 
          ? localAddresses[activeIndex] 
          : localAddresses[0] || null
        
        syncLocalStorage(localAddresses, localActiveAddress)
      },
    }),
    {
      name: 'address-storage',
      partialize: (state) => ({ 
        addresses: state.addresses.filter(a => a.temp),
        activeAddress: state.activeAddress?.temp ? state.activeAddress : null
      }),
    }
  )
)
