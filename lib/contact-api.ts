// lib/contact-api.ts
// Reusable API service for contact form operations

import api from './axios'
import { toast } from 'sonner'

export interface ContactFormData {
  name?: string
  email?: string
  subject: string
  message: string
  type?: 'general' | 'delivery_request' | 'help_request' | 'volunteer_contact' | 'courier_contact'
  recipient_id?: number
  related_order_id?: number
  related_harvest_request_id?: number
}

export interface ContactResponse {
  success: boolean
  message: string
  data?: {
    id: number
    name?: string
    email?: string
    sender_id?: number
    recipient_id?: number
    subject: string
    message: string
    type: string
    status: string
    created_at: string
    updated_at: string
  }
}

/**
 * Submit contact form (general or user-to-user)
 */
export async function submitContactForm(data: ContactFormData): Promise<ContactResponse> {
  try {
    const response = await api.post('/contact', data)
    
    if (response.data?.success) {
      toast.success(response.data.message || 'Your message has been sent successfully!')
      return response.data
    }
    
    throw new Error(response.data?.message || 'Failed to submit contact form')
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to submit your message. Please try again later.'
    
    // Handle specific error cases
    if (error.response?.status === 422) {
      const errors = error.response?.data?.errors
      if (errors) {
        const firstError = Object.values(errors)[0] as string[]
        toast.error(firstError[0] || 'Please check your form and try again')
      } else {
        toast.error('Please check your form and try again')
      }
    } else {
      toast.error(errorMessage)
    }
    
    throw error
  }
}

/**
 * Get user's messages (inbox)
 */
export async function getUserMessages(params?: { status?: string; type?: string; page?: number }) {
  try {
    const response = await api.get('/messages', { params })
    return response.data
  } catch (error: any) {
    console.error('Failed to fetch messages:', error)
    throw error
  }
}

/**
 * Mark message as read
 */
export async function markMessageAsRead(messageId: number) {
  try {
    const response = await api.put(`/messages/${messageId}/read`)
    return response.data
  } catch (error: any) {
    console.error('Failed to mark message as read:', error)
    throw error
  }
}
