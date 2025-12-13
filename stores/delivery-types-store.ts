import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DeliveryTypesState {
  deliveryTypes: Record<string | number, 'delivery' | 'pickup'>
  setDeliveryType: (sellerId: string | number, type: 'delivery' | 'pickup') => void
  reset: () => void
}

export const useDeliveryTypesStore = create<DeliveryTypesState>()(
  persist(
    (set) => ({
      deliveryTypes: {},
      setDeliveryType: (sellerId, type) => 
        set((state) => ({
          deliveryTypes: {
            ...state.deliveryTypes,
            [sellerId]: type,
          },
        })),
      reset: () => set({ deliveryTypes: {} }),
    }),
    {
      name: 'delivery-types-storage',
    }
  )
)

