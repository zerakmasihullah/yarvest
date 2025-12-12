import api from './axios'
import type { CartItem, CartResponse, CartItemResponse, CartCountResponse } from '@/types/cart'

/**
 * Get all cart items for the authenticated user
 */
export async function getCartItems(): Promise<CartItem[]> {
  try {
    const response = await api.get<CartResponse>('/cart')
    return response.data.data || []
  } catch (error: any) {
    console.error('Error fetching cart items:', error)
    if (error.response?.status === 401) {
      throw new Error('Please log in to view your cart')
    }
    throw error
  }
}

/**
 * Add item to cart
 */
export async function addToCart(productId: number, quantity: number = 1): Promise<CartItem> {
  try {
    const response = await api.post<CartItemResponse>('/cart', {
      product_id: productId,
      quantity,
    })
    return response.data.data
  } catch (error: any) {
    console.error('Error adding to cart:', error)
    if (error.response?.status === 401) {
      throw new Error('Please log in to add items to cart')
    }
    if (error.response?.status === 400) {
      throw new Error(error.response.data.message || 'Failed to add item to cart')
    }
    throw error
  }
}

/**
 * Update cart item quantity
 */
export async function updateCartItem(cartItemId: number, quantity: number): Promise<CartItem> {
  try {
    const response = await api.put<CartItemResponse>(`/cart/${cartItemId}`, {
      quantity,
    })
    return response.data.data
  } catch (error: any) {
    console.error('Error updating cart item:', error)
    if (error.response?.status === 401) {
      throw new Error('Please log in to update your cart')
    }
    if (error.response?.status === 400) {
      throw new Error(error.response.data.message || 'Failed to update cart item')
    }
    throw error
  }
}

/**
 * Remove item from cart
 */
export async function removeFromCart(cartItemId: number): Promise<void> {
  try {
    await api.delete(`/cart/${cartItemId}`)
  } catch (error: any) {
    console.error('Error removing from cart:', error)
    if (error.response?.status === 401) {
      throw new Error('Please log in to remove items from cart')
    }
    throw error
  }
}

/**
 * Clear entire cart
 */
export async function clearCart(): Promise<void> {
  try {
    await api.delete('/cart')
  } catch (error: any) {
    console.error('Error clearing cart:', error)
    if (error.response?.status === 401) {
      throw new Error('Please log in to clear your cart')
    }
    throw error
  }
}

/**
 * Get cart count (total items and quantity)
 */
export async function getCartCount(): Promise<{ total_items: number; total_quantity: number }> {
  try {
    const response = await api.get<CartCountResponse>('/cart/count')
    return response.data.data
  } catch (error: any) {
    console.error('Error fetching cart count:', error)
    // Return default values if not authenticated
    if (error.response?.status === 401) {
      return { total_items: 0, total_quantity: 0 }
    }
    return { total_items: 0, total_quantity: 0 }
  }
}

