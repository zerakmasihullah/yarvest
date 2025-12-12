import { useCallback } from 'react'
import { useCartStore } from '@/stores/cart-store'
import { useAuthStore } from '@/stores/auth-store'
import { ApiProduct } from '@/types/product'
import { useRouter } from 'next/navigation'

/**
 * Hook to handle add to cart functionality
 * Returns a handler function that can be used in product components
 * Silently adds to cart without showing success messages
 */
export function useCartHandler() {
  const { addItem } = useCartStore()
  const { isLoggedIn } = useAuthStore()
  const router = useRouter()

  const handleAddToCart = useCallback(async (product: ApiProduct, quantity: number = 1) => {
    if (!isLoggedIn) {
      router.push('/login')
      return
    }

    try {
      await addItem(product.id, quantity)
      // No toast notification - just silently add to cart
    } catch (error: any) {
      // Silently fail - error is already handled in the store
      console.error('Failed to add to cart:', error)
    }
  }, [addItem, isLoggedIn, router])

  return { handleAddToCart }
}

