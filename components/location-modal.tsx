"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Search, Check } from "lucide-react"

interface LocationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentAddress: string
  onAddressChange: (address: string) => void
}

const popularAddresses = [
  { zipcode: "94102", address: "1100 Victory Lane, San Francisco, CA 94102" },
  { zipcode: "94103", address: "123 Market St, San Francisco, CA 94103" },
  { zipcode: "94104", address: "456 Mission St, San Francisco, CA 94104" },
  { zipcode: "94105", address: "789 Folsom St, San Francisco, CA 94105" },
]

export function LocationModal({ open, onOpenChange, currentAddress, onAddressChange }: LocationModalProps) {
  const [zipcode, setZipcode] = useState("")
  const [selectedAddress, setSelectedAddress] = useState(currentAddress)

  const handleApply = () => {
    if (selectedAddress) {
      onAddressChange(selectedAddress)
      onOpenChange(false)
    }
  }

  const handleZipcodeSearch = () => {
    // Find address by zipcode
    const found = popularAddresses.find((addr) => addr.zipcode === zipcode)
    if (found) {
      setSelectedAddress(found.address)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Choose your location</DialogTitle>
          <DialogDescription>Select a delivery location to see product availability and delivery options</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Zipcode Search */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Enter ZIP code</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="ZIP code"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleZipcodeSearch()}
                  className="pl-10"
                  maxLength={5}
                />
              </div>
              <Button onClick={handleZipcodeSearch} className="bg-primary hover:bg-accent text-white">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Popular Addresses */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">Popular locations</label>
            <div className="space-y-2">
              {popularAddresses.map((addr) => (
                <button
                  key={addr.zipcode}
                  onClick={() => setSelectedAddress(addr.address)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    selectedAddress === addr.address
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-foreground">{addr.address}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">ZIP: {addr.zipcode}</p>
                      </div>
                    </div>
                    {selectedAddress === addr.address && (
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Current Selection */}
          {selectedAddress && (
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">Selected location:</p>
              <p className="text-sm font-medium text-foreground">{selectedAddress}</p>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleApply} className="flex-1 bg-primary hover:bg-accent text-white" disabled={!selectedAddress}>
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

