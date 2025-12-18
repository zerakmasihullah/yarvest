/**
 * Product utility functions
 * Reusable across the application
 */

import { ApiProduct, ProductPriceInfo } from "@/types/product"

/**
 * Helper function to safely parse a numeric string (handles formatted numbers with commas)
 */
function safeParseFloat(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0
  if (typeof value === 'number') {
    return isNaN(value) ? 0 : value
  }
  // Remove commas and other formatting, then parse
  const cleaned = String(value).replace(/,/g, '').trim()
  const parsed = parseFloat(cleaned)
  return isNaN(parsed) ? 0 : parsed
}

/**
 * Calculate product prices and discount information
 * @param product - The product object
 * @returns Calculated price information
 */
export function calculateProductPrices(product: ApiProduct): ProductPriceInfo {
  // Parse prices, handling formatted strings (e.g., "300,000.00" -> 300000.00)
  const basePrice = safeParseFloat(product.price)
  const discountValue = safeParseFloat(product.discount)
  
  // Backend stores discount as a percentage (0-100), not as an amount
  // So we need to calculate the discount amount and final price
  const discountAmount = (basePrice * discountValue) / 100
  const finalPrice = basePrice - discountAmount
  const discountPercentage = Math.round(discountValue)
  const hasDiscount = discountValue > 0 && discountValue <= 100
  
  return {
    price: Math.max(0, finalPrice), // Final price after discount
    discountAmount: Math.max(0, discountAmount), // Discount amount in dollars
    originalPrice: Math.max(0, basePrice), // Original price before discount
    discountPercentage: Math.max(0, Math.min(100, discountPercentage)), // Discount percentage
    hasDiscount,
  }
}

