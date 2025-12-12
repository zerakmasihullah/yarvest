/**
 * Cart-related TypeScript interfaces
 */

export interface CartItem {
  id: number
  product_id: number
  product_unique_id: string
  name: string
  price: number
  original_price: number
  discount: number
  quantity: number
  image: string | null
  code: string
  stock: number
  seller: {
    id: number
    unique_id: string
    full_name: string
  }
  category: {
    id: number
    name: string
  } | null
  type: {
    id: number
    name: string
  } | null
  unit: string | null
  created_at: string
  updated_at: string
}

export interface CartResponse {
  success: boolean
  message: string
  data: CartItem[]
  count?: number
}

export interface CartItemResponse {
  success: boolean
  message: string
  data: CartItem
}

export interface CartCountResponse {
  success: boolean
  message: string
  data: {
    total_items: number
    total_quantity: number
  }
}

