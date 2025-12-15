"use client"

import { useState, useEffect } from "react"
import { Calendar, MessageSquare, Loader2, CheckCircle2, DollarSign, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import api from "@/lib/axios"
import { toast } from "sonner"

interface HarvestingTool {
  id: number
  unique_id: string
  name: string
  type: 'rent' | 'borrow'
  daily_rate: string | null
  deposit: string | null
}

interface ToolRequestModalProps {
  tool: HarvestingTool
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function ToolRequestModal({ tool, open, onOpenChange, onSuccess }: ToolRequestModalProps) {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [generalError, setGeneralError] = useState<string>("")

  const today = new Date().toISOString().split('T')[0]

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setStartDate("")
      setEndDate("")
      setMessage("")
      setErrors({})
      setGeneralError("")
    }
  }, [open])

  const calculateTotal = () => {
    if (tool.type === 'rent' && tool.daily_rate && startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      if (days > 0) {
        return {
          total: (parseFloat(tool.daily_rate) * days).toFixed(2),
          days,
          dailyRate: parseFloat(tool.daily_rate)
        }
      }
    }
    return null
  }

  // Normalize API errors to match our state keys
  const normalizeErrors = (apiErrors: any): Record<string, string> => {
    const normalized: Record<string, string> = {}
    
    if (!apiErrors) return normalized

    // Handle Laravel validation errors format
    // Can be: { start_date: ['Error message'], end_date: ['Error message'] }
    // Or: { start_date: 'Error message', end_date: 'Error message' }
    // Or: { errors: { start_date: [...], end_date: [...] } }
    
    const errors = apiErrors.errors || apiErrors
    
    // Map API field names to our state field names
    const fieldMapping: Record<string, string> = {
      'start_date': 'startDate',
      'end_date': 'endDate',
      'message': 'message'
    }

    Object.keys(errors).forEach((key) => {
      const normalizedKey = fieldMapping[key] || key
      const errorValue = errors[key]
      
      // Handle array of errors (Laravel format)
      if (Array.isArray(errorValue)) {
        normalized[normalizedKey] = errorValue[0] || errorValue.join(', ')
      } 
      // Handle string error
      else if (typeof errorValue === 'string') {
        normalized[normalizedKey] = errorValue
      }
      // Handle object with nested errors
      else if (typeof errorValue === 'object' && errorValue !== null) {
        normalized[normalizedKey] = Object.values(errorValue)[0] as string || 'Invalid value'
      }
    })

    return normalized
  }

  const handleSubmit = async () => {
    setErrors({})
    setGeneralError("")

    // Client-side validation
    const clientErrors: Record<string, string> = {}
    
    if (!startDate) {
      clientErrors.startDate = 'Start date is required'
    }
    if (!endDate) {
      clientErrors.endDate = 'End date is required'
    }
    
    if (startDate && endDate) {
      if (new Date(startDate) >= new Date(endDate)) {
        clientErrors.endDate = 'End date must be after start date'
      }
      if (new Date(startDate) < new Date(today)) {
        clientErrors.startDate = 'Start date cannot be in the past'
      }
    }

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors)
      return
    }

    try {
      setLoading(true)
      await api.post(`/harvesting-tools/${tool.unique_id}/request`, {
        start_date: startDate,
        end_date: endDate,
        message: message || undefined,
      })
      toast.success('Request submitted successfully! The tool owner will be notified.')
      setStartDate("")
      setEndDate("")
      setMessage("")
      setErrors({})
      setGeneralError("")
      onSuccess?.()
    } catch (error: any) {
      console.error('Error submitting request:', error)
      
      // Handle API errors
      if (error.response?.data) {
        const apiErrors = normalizeErrors(error.response.data)
        
        if (Object.keys(apiErrors).length > 0) {
          setErrors(apiErrors)
        } else {
          // Show general error message if no field-specific errors
          const errorMessage = error.response.data.message || 'Failed to submit request'
          setGeneralError(errorMessage)
        }
      } else {
        setGeneralError('Failed to submit request. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const totalInfo = calculateTotal()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[580px] p-0 gap-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-[#5a9c3a] to-[#4d8236] px-6 pt-6 pb-4">
          <DialogHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-white">
                Request to {tool.type === 'rent' ? 'Rent' : 'Borrow'}
              </DialogTitle>
            </div>
            <DialogDescription className="text-white/90 text-base pt-1">
              {tool.name}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* General Error Display */}
          {generalError && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-900">{generalError}</p>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            {tool.type === 'rent' && tool.daily_rate && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-200/50">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-blue-700 uppercase tracking-wide">Daily Rate</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">${tool.daily_rate}</p>
                <p className="text-xs text-blue-600 mt-1">per day</p>
              </div>
            )}
            {tool.deposit && (
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-4 border border-amber-200/50">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-medium text-amber-700 uppercase tracking-wide">Deposit</span>
                </div>
                <p className="text-2xl font-bold text-amber-900">${tool.deposit}</p>
                <p className="text-xs text-amber-600 mt-1">security deposit</p>
              </div>
            )}
          </div>

          {/* Date Selection */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="start_date" className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#5a9c3a]" />
                Rental Period
              </Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="start_date" className="text-xs text-muted-foreground font-medium">
                    Start Date *
                  </Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value)
                      if (errors.startDate) setErrors({ ...errors, startDate: '' })
                    }}
                    min={today}
                    className={`h-11 rounded-xl border-2 transition-all ${
                      errors.startDate 
                        ? 'border-red-300 focus-visible:border-red-500 focus-visible:ring-red-200' 
                        : 'border-gray-200 focus-visible:border-[#5a9c3a] focus-visible:ring-[#5a9c3a]/20'
                    }`}
                  />
                  {errors.startDate && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <span className="w-1 h-1 rounded-full bg-red-600" />
                      {errors.startDate}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_date" className="text-xs text-muted-foreground font-medium">
                    End Date *
                  </Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value)
                      if (errors.endDate) setErrors({ ...errors, endDate: '' })
                    }}
                    min={startDate || today}
                    className={`h-11 rounded-xl border-2 transition-all ${
                      errors.endDate 
                        ? 'border-red-300 focus-visible:border-red-500 focus-visible:ring-red-200' 
                        : 'border-gray-200 focus-visible:border-[#5a9c3a] focus-visible:ring-[#5a9c3a]/20'
                    }`}
                  />
                  {errors.endDate && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <span className="w-1 h-1 rounded-full bg-red-600" />
                      {errors.endDate}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Rental Summary */}
            {totalInfo && (
              <div className="bg-gradient-to-br from-[#5a9c3a]/10 to-[#4d8236]/5 rounded-xl p-5 border-2 border-[#5a9c3a]/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">Rental Summary</span>
                  <span className="text-xs font-medium text-[#5a9c3a] bg-[#5a9c3a]/10 px-3 py-1 rounded-full">
                    {totalInfo.days} {totalInfo.days === 1 ? 'day' : 'days'}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      ${totalInfo.dailyRate} × {totalInfo.days} {totalInfo.days === 1 ? 'day' : 'days'}
                    </span>
                    <span className="font-medium text-foreground">${totalInfo.total}</span>
                  </div>
                  {tool.deposit && (
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-[#5a9c3a]/10">
                      <span className="text-muted-foreground">Security Deposit</span>
                      <span className="font-medium text-foreground">${tool.deposit}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t-2 border-[#5a9c3a]/20 mt-2">
                    <span className="font-semibold text-foreground">Total Amount</span>
                    <span className="text-2xl font-bold text-[#5a9c3a]">
                      ${(parseFloat(totalInfo.total) + (tool.deposit ? parseFloat(tool.deposit) : 0)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#5a9c3a]" />
              Additional Message
              <span className="text-xs font-normal text-muted-foreground">(Optional)</span>
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                if (errors.message) setErrors({ ...errors, message: '' })
              }}
              placeholder="Add any questions, special requests, or additional information for the tool owner..."
              className={`min-h-[100px] rounded-xl border-2 resize-none transition-all ${
                errors.message 
                  ? 'border-red-300 focus-visible:border-red-500 focus-visible:ring-red-200' 
                  : 'border-gray-200 focus-visible:border-[#5a9c3a] focus-visible:ring-[#5a9c3a]/20'
              }`}
              rows={4}
            />
            {errors.message && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-red-600" />
                {errors.message}
              </p>
            )}
            {!errors.message && (
              <p className="text-xs text-muted-foreground">
                This message will be sent to the tool owner along with your request.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 gap-3">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)} 
            disabled={loading}
            className="rounded-xl border-2 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || !startDate || !endDate}
            className="bg-[#5a9c3a] hover:bg-[#4d8236] text-white rounded-xl px-6 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting Request...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Submit Request
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
