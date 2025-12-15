"use client"

import { useState } from "react"
import { MapPin, Calendar, DollarSign, Wrench, User, Eye, Info, FileText, Map } from "lucide-react"
import { getImageUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/auth-store"
import { ToolRequestModal } from "./tool-request-modal"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Helper function to extract state from location string
const extractState = (location: string | null): string | null => {
  if (!location) return null
  
  // Common US state abbreviations
  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ]
  
  // Try to find state abbreviation
  const parts = location.split(',').map(p => p.trim())
  for (const part of parts) {
    const upperPart = part.toUpperCase()
    if (states.includes(upperPart)) {
      return upperPart
    }
  }
  
  // If no abbreviation found, try to get the last part (usually state)
  if (parts.length > 1) {
    return parts[parts.length - 1]
  }
  
  return location
}

interface HarvestingTool {
  id: number
  unique_id: string
  name: string
  description: string | null
  image: string | null
  type: 'rent' | 'borrow'
  daily_rate: string | null
  deposit: string | null
  location: string | null
  availability: 'available' | 'unavailable' | 'rented'
  condition: string | null
  instructions: string | null
  owner: {
    id: number
    unique_id: string
    full_name: string
    email: string
    image: string | null
  } | null
  created_at: string
  updated_at: string
}

interface HarvestingToolCardProps {
  tool: HarvestingTool
  onRequestSuccess?: () => void
}

export function HarvestingToolCard({ tool, onRequestSuccess }: HarvestingToolCardProps) {
  const { isLoggedIn } = useAuthStore()
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const imageUrl = getImageUrl(tool.image, tool.name)
  const isAvailable = tool.availability === 'available'

  const calculateTotal = () => {
    if (tool.type === 'rent' && tool.daily_rate) {
      // For display purposes, show daily rate
      return parseFloat(tool.daily_rate)
    }
    return null
  }

  const state = extractState(tool.location)

  return (
    <>
      <div className="group relative w-full bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#5a9c3a]/10 flex flex-col border-2 border-gray-100 hover:border-[#5a9c3a]/20 h-full min-h-[460px]">
        {/* Tool Image */}
        <div className="relative w-full h-[220px] overflow-hidden bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 cursor-pointer" onClick={() => setIsDetailsModalOpen(true)}>
          <img
            src={imageUrl}
            alt={tool.name}
            className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
            loading="lazy"
          />

          {/* Availability Badge */}
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20 backdrop-blur-sm">
              <div className="bg-gray-900/95 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-2xl border-2 border-white/10">
                {tool.availability === 'rented' ? 'Currently Rented' : 'Unavailable'}
              </div>
            </div>
          )}

          {/* Type Badge */}
          <div className="absolute left-4 top-4 z-10">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
              tool.type === 'rent' 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border border-blue-400/30'
                : 'bg-gradient-to-r from-[#5a9c3a] to-[#4d8236] text-white border border-[#5a9c3a]/30'
            }`}>
              {tool.type === 'rent' ? 'Rent' : 'Borrow'}
            </span>
          </div>

          {/* View Details Button */}
          <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-lg shadow-lg border border-gray-200"
              onClick={(e) => {
                e.stopPropagation()
                setIsDetailsModalOpen(true)
              }}
            >
              <Eye className="w-4 h-4 mr-1.5" />
              View Details
            </Button>
          </div>
        </div>

        {/* Tool Details */}
        <div className="p-5 space-y-3 bg-white flex-1 flex flex-col min-h-[200px]">
          {/* Tool Name */}
          <div className="min-h-[50px]">
            <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-[#5a9c3a] transition-colors duration-300 cursor-pointer" onClick={() => setIsDetailsModalOpen(true)}>
              {tool.name}
            </h3>
            {tool.description ? (
              <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed min-h-[36px]">
                {tool.description}
              </p>
            ) : (
              <div className="mt-2 min-h-[36px]" />
            )}
          </div>

          {/* Tool Info */}
          <div className="space-y-2 pt-1 flex-1">
            {state && (
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#5a9c3a] flex-shrink-0" />
                  <span className="font-medium">{state}</span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-[#5a9c3a] hover:bg-[#5a9c3a]/10 rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Open map with this tool's location
                    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tool.location || '')}`, '_blank')
                  }}
                  title="View on map"
                >
                  <Map className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
            {tool.condition && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Wrench className="h-4 w-4 text-[#5a9c3a] flex-shrink-0" />
                <span>Condition: <span className="font-medium">{tool.condition}</span></span>
              </div>
            )}
            {tool.owner && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4 text-[#5a9c3a] flex-shrink-0" />
                <span className="font-medium">{tool.owner.full_name}</span>
              </div>
            )}
            {!state && !tool.condition && !tool.owner && (
              <div className="h-[50px]" />
            )}
          </div>

          {/* Price and Action */}
          <div className="mt-auto pt-3 border-t-2 border-gray-100">
            {tool.type === 'rent' && tool.daily_rate && (
              <div className="flex items-baseline gap-2 mb-3">
                <DollarSign className="h-5 w-5 text-[#5a9c3a]" />
                <span className="text-xl font-extrabold text-[#5a9c3a]">
                  ${tool.daily_rate}
                </span>
                <span className="text-sm text-gray-500 font-medium">/day</span>
                {tool.deposit && (
                  <span className="text-xs text-gray-400 ml-auto bg-gray-50 px-2 py-1 rounded-md">
                    Deposit: ${tool.deposit}
                  </span>
                )}
              </div>
            )}
            {tool.type === 'borrow' && tool.deposit && (
              <div className="flex items-baseline gap-2 mb-3">
                <DollarSign className="h-4 w-4 text-[#5a9c3a]" />
                <span className="text-sm text-gray-700">
                  Deposit: <span className="font-bold text-[#5a9c3a] text-base">${tool.deposit}</span>
                </span>
              </div>
            )}
            {tool.type === 'borrow' && !tool.deposit && (
              <div className="mb-3">
                <span className="inline-flex items-center gap-2 text-sm text-[#5a9c3a] font-semibold bg-[#5a9c3a]/10 px-3 py-1 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-[#5a9c3a]" />
                  Free to Borrow
                </span>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDetailsModalOpen(true)}
                className="flex-1 border-2 border-gray-200 hover:border-[#5a9c3a] hover:bg-[#5a9c3a]/5 text-gray-700 hover:text-[#5a9c3a] rounded-xl h-10 text-sm font-semibold transition-all duration-200"
              >
                <Info className="w-3.5 h-3.5 mr-1.5" />
                Details
              </Button>
              <Button
                onClick={() => {
                  if (!isLoggedIn) {
                    // You might want to show login modal here
                    return
                  }
                  setIsRequestModalOpen(true)
                }}
                disabled={!isAvailable || !isLoggedIn}
                className="flex-1 bg-[#5a9c3a] hover:bg-[#4d8236] text-white rounded-xl h-10 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!isLoggedIn ? 'Login' : isAvailable ? `Request` : 'Unavailable'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0 gap-0">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#5a9c3a] to-[#4d8236] px-6 pt-6 pb-4">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Info className="w-5 h-5 text-white" />
                </div>
                <DialogTitle className="text-2xl font-bold text-white">
                  {tool.name}
                </DialogTitle>
              </div>
              <DialogDescription className="text-white/90">
                Complete tool information and details
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-6">
            {/* Image */}
            <div className="relative w-full h-[300px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
              <img
                src={imageUrl}
                alt={tool.name}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
                  tool.type === 'rent' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border border-blue-400/30'
                    : 'bg-gradient-to-r from-[#5a9c3a] to-[#4d8236] text-white border border-[#5a9c3a]/30'
                }`}>
                  {tool.type === 'rent' ? 'Rent' : 'Borrow'}
                </span>
              </div>
              {!isAvailable && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                  <span className="bg-gray-900/95 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-2xl border-2 border-white/10">
                    {tool.availability === 'rented' ? 'Currently Rented' : 'Unavailable'}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            {tool.description && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#5a9c3a]" />
                  Description
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {state && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#5a9c3a]" />
                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">State</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{state}</p>
                </div>
              )}
              
              {tool.condition && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="w-4 h-4 text-[#5a9c3a]" />
                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Condition</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{tool.condition}</p>
                </div>
              )}

              {tool.type === 'rent' && tool.daily_rate && (
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Daily Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">${tool.daily_rate}</p>
                  <p className="text-xs text-blue-600 mt-1">per day</p>
                </div>
              )}

              {tool.deposit && (
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Security Deposit</span>
                  </div>
                  <p className="text-2xl font-bold text-amber-900">${tool.deposit}</p>
                  <p className="text-xs text-amber-600 mt-1">refundable</p>
                </div>
              )}

              {tool.owner && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-[#5a9c3a]" />
                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Owner</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{tool.owner.full_name}</p>
                </div>
              )}
            </div>

            {/* Instructions */}
            {tool.instructions && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#5a9c3a]" />
                  Instructions
                </h4>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{tool.instructions}</p>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-4 border-t-2 border-gray-100">
              <Button
                onClick={() => {
                  setIsDetailsModalOpen(false)
                  if (isLoggedIn) {
                    setIsRequestModalOpen(true)
                  }
                }}
                disabled={!isAvailable || !isLoggedIn}
                className="w-full bg-[#5a9c3a] hover:bg-[#4d8236] text-white rounded-xl h-12 font-semibold shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!isLoggedIn ? 'Login to Request' : isAvailable ? `Request to ${tool.type === 'rent' ? 'Rent' : 'Borrow'}` : 'Unavailable'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Request Modal */}
      {isLoggedIn && (
        <ToolRequestModal
          tool={tool}
          open={isRequestModalOpen}
          onOpenChange={setIsRequestModalOpen}
          onSuccess={() => {
            setIsRequestModalOpen(false)
            onRequestSuccess?.()
          }}
        />
      )}
    </>
  )
}
