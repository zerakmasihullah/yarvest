import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types/cart'
import { getCartItems, addToCart, updateCartItem, removeFromCart, clearCart, getCartCount } from '@/lib/cart-api'
import { useAuthStore } from './auth-store'

interface CartState {
  items: CartItem[]
  isLoading: boolean
  error: string | null
  totalItems: number
  totalQuantity: number
  
  // Actions
  fetchCart: () => Promise<void>
  addItem: (productId: number, quantity?: number) => Promise<void>
  updateItemQuantity: (cartItemId: number, quantity: number) => Promise<void>
  removeItem: (cartItemId: number) => Promise<void>
  clear: () => Promise<void>
  refreshCartCount: () => Promise<void>
  setError: (error: string | null) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,
      totalItems: 0,
      totalQuantity: 0,

      setError: (error: string | null) => {
        set({ error })
      },

      fetchCart: async () => {
        const { isLoggedIn } = useAuthStore.getState()
        if (!isLoggedIn) {
          set({ items: [], totalItems: 0, totalQuantity: 0 })
          return
        }

        set({ isLoading: true, error: null })
        try {
          const items = await getCartItems()
          // Calculate totals once
          const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
          set({ 
            items, 
            totalItems: items.length,
            totalQuantity,
            isLoading: false 
          })
        } catch (error: any) {
          console.error('Error fetching cart:', error)
          set({ 
            error: error.message || 'Failed to load cart',
            isLoading: false,
            items: [],
            totalItems: 0,
            totalQuantity: 0
          })
        }
      },

      addItem: async (productId: number, quantity: number = 1) => {
        const { isLoggedIn } = useAuthStore.getState()
        if (!isLoggedIn) {
          set({ error: 'Please log in to add items to cart' })
          return
        }

        const currentItems = get().items
        const existingItemIndex = currentItems.findIndex(item => item.product_id === productId)
        
        // Optimistic update: update UI immediately for existing items
        if (existingItemIndex >= 0) {
          const updatedItems = [...currentItems]
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity
          }
          const totalQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
          set({ 
            items: updatedItems,
            totalQuantity,
            isLoading: false 
          })
        } else {
          // For new items, don't set isLoading to avoid blocking UI
          set({ isLoading: false, error: null })
        }

        // Sync with API in background (non-blocking)
        try {
          const newItem = await addToCart(productId, quantity)
          
          // Update with real data from API
          const finalItems = get().items
          const finalExistingItemIndex = finalItems.findIndex(item => item.product_id === productId)
          
          if (finalExistingItemIndex >= 0) {
            const finalUpdatedItems = [...finalItems]
            finalUpdatedItems[finalExistingItemIndex] = newItem
            const totalQuantity = finalUpdatedItems.reduce((sum, item) => sum + item.quantity, 0)
            set({ 
              items: finalUpdatedItems,
              totalQuantity,
              isLoading: false 
            })
          } else {
            // Add new item
            const finalUpdatedItems = [...finalItems, newItem]
            const totalQuantity = finalUpdatedItems.reduce((sum, item) => sum + item.quantity, 0)
            set({ 
              items: finalUpdatedItems,
              totalItems: finalUpdatedItems.length,
              totalQuantity,
              isLoading: false 
            })
          }
        } catch (error: any) {
          console.error('Error adding to cart:', error)
          // Revert optimistic update on error
          if (existingItemIndex >= 0) {
            set({ 
              items: currentItems,
              totalItems: currentItems.length,
              totalQuantity: currentItems.reduce((sum, item) => sum + item.quantity, 0),
              error: error.message || 'Failed to add item to cart',
              isLoading: false 
            })
          } else {
            set({ 
              error: error.message || 'Failed to add item to cart',
              isLoading: false 
            })
          }
          throw error
        }
      },

      updateItemQuantity: async (cartItemId: number, quantity: number) => {
        const { isLoggedIn } = useAuthStore.getState()
        if (!isLoggedIn) {
          set({ error: 'Please log in to update your cart' })
          return
        }

        const currentItems = get().items
        const itemIndex = currentItems.findIndex(item => item.id === cartItemId)
        
        if (itemIndex === -1) {
          set({ error: 'Item not found in cart' })
          return
        }

        // Optimistic update: update UI immediately
        const optimisticItems = currentItems.map(item => 
          item.id === cartItemId ? { ...item, quantity } : item
        )
        const optimisticTotalQuantity = optimisticItems.reduce((sum, item) => sum + item.quantity, 0)
        
        set({ 
          items: optimisticItems,
          totalQuantity: optimisticTotalQuantity,
          isLoading: false,
          error: null
        })

        // Sync with API in background
        try {
          const updatedItem = await updateCartItem(cartItemId, quantity)
          const finalItems = get().items.map(item => 
            item.id === cartItemId ? updatedItem : item
          )
          const finalTotalQuantity = finalItems.reduce((sum, item) => sum + item.quantity, 0)
          set({ 
            items: finalItems,
            totalQuantity: finalTotalQuantity,
            isLoading: false 
          })
        } catch (error: any) {
          console.error('Error updating cart item:', error)
          // Revert optimistic update on error
          set({ 
            items: currentItems,
            totalQuantity: currentItems.reduce((sum, item) => sum + item.quantity, 0),
            error: error.message || 'Failed to update cart item',
            isLoading: false 
          })
          throw error
        }
      },

      removeItem: async (cartItemId: number) => {
        const { isLoggedIn } = useAuthStore.getState()
        if (!isLoggedIn) {
          set({ error: 'Please log in to remove items from cart' })
          return
        }

        set({ isLoading: true, error: null })
        try {
          await removeFromCart(cartItemId)
          const items = get().items.filter(item => item.id !== cartItemId)
          // Calculate total quantity once
          const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
          set({ 
            items,
            totalItems: items.length,
            totalQuantity,
            isLoading: false 
          })
        } catch (error: any) {
          console.error('Error removing from cart:', error)
          set({ 
            error: error.message || 'Failed to remove item from cart',
            isLoading: false 
          })
          throw error
        }
      },

      clear: async () => {
        const { isLoggedIn } = useAuthStore.getState()
        if (!isLoggedIn) {
          set({ error: 'Please log in to clear your cart' })
          return
        }

        set({ isLoading: true, error: null })
        try {
          await clearCart()
          set({ 
            items: [],
            totalItems: 0,
            totalQuantity: 0,
            isLoading: false 
          })
        } catch (error: any) {
          console.error('Error clearing cart:', error)
          set({ 
            error: error.message || 'Failed to clear cart',
            isLoading: false 
          })
          throw error
        }
      },

      refreshCartCount: async () => {
        const { isLoggedIn } = useAuthStore.getState()
        if (!isLoggedIn) {
          set({ totalItems: 0, totalQuantity: 0 })
          return
        }

        try {
          const count = await getCartCount()
          set({ 
            totalItems: count.total_items,
            totalQuantity: count.total_quantity 
          })
        } catch (error) {
          console.error('Error refreshing cart count:', error)
        }
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ 
        items: state.items,
        totalItems: state.totalItems,
        totalQuantity: state.totalQuantity 
      }),
    }
  )
)

