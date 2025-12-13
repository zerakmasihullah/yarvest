"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Edit, Trash2, Check, Plus, Loader2 } from "lucide-react"
import { AddressModal } from "./address-modal"
import api from "@/lib/axios"
import { useAuthStore } from "@/stores/auth-store"

interface Address {
  id: number
  street_address: string
  city: string
  state: string
  country: string
  postal_code: string
  apt?: string
  business_name?: string
  latitude?: number
  longitude?: number
  status: boolean
}

export function AddressList() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [isUpdating, setIsUpdating] = useState<number | null>(null)
  const [error, setError] = useState("")
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await api.get('/addresses')
      setAddresses(response.data.data || [])
    } catch (err: any) {
      setError("Failed to load addresses. Please try again.")
      console.error("Error fetching addresses:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetActive = async (addressId: number) => {
    setIsUpdating(addressId)
    setError("")

    try {
      await api.put(`/addresses/${addressId}`, { status: true })
      await fetchAddresses()
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || "Failed to set active address")
      } else {
        setError("An error occurred. Please try again.")
      }
    } finally {
      setIsUpdating(null)
    }
  }

  const handleDelete = async (addressId: number) => {
    if (!confirm("Are you sure you want to delete this address?")) {
      return
    }

    setIsDeleting(addressId)
    setError("")

    try {
      await api.delete(`/addresses/${addressId}`)
      await fetchAddresses()
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || "Failed to delete address")
      } else {
        setError("An error occurred. Please try again.")
      }
    } finally {
      setIsDeleting(null)
    }
  }

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    setIsModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingAddress(null)
    setIsModalOpen(true)
  }

  const handleModalSuccess = () => {
    fetchAddresses()
  }

  const formatAddress = (address: Address) => {
    const parts = [
      address.street_address,
      address.apt && `Apt ${address.apt}`,
      address.city,
      address.state,
      address.postal_code,
    ].filter(Boolean)
    return parts.join(", ")
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-[#0A8542]" />
        </div>
      </Card>
    )
  }

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Your Addresses</h3>
            <p className="text-sm text-gray-600">
              Manage your delivery addresses. Set one as active for faster checkout. (Maximum 2 addresses)
            </p>
          </div>
          <Button
            onClick={handleAddNew}
            className="bg-[#0A8542] hover:bg-[#097038] text-white"
            disabled={addresses.length >= 2}
            title={addresses.length >= 2 ? "You can only have a maximum of 2 addresses" : ""}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Address
          </Button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {addresses.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No addresses saved yet</p>
            <Button
              onClick={handleAddNew}
              className="bg-[#0A8542] hover:bg-[#097038] text-white"
              disabled={addresses.length >= 2}
              title={addresses.length >= 2 ? "You can only have a maximum of 2 addresses" : ""}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Address
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`p-4 border-2 rounded-lg transition-all ${
                  address.status
                    ? "border-[#0A8542] bg-[#0A8542]/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-[#0A8542]" />
                      {address.business_name && (
                        <span className="font-semibold text-gray-900">
                          {address.business_name}
                        </span>
                      )}
                      {address.status && (
                        <Badge className="bg-[#0A8542] text-white">
                          <Check className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{formatAddress(address)}</p>
                    {address.country && (
                      <p className="text-xs text-gray-500">{address.country}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {!address.status && (
                      <Button
                        onClick={() => handleSetActive(address.id)}
                        disabled={isUpdating === address.id}
                        size="sm"
                        variant="outline"
                        className="text-xs"
                      >
                        {isUpdating === address.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Set Active"
                        )}
                      </Button>
                    )}
                    <Button
                      onClick={() => handleEdit(address)}
                      size="sm"
                      variant="outline"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(address.id)}
                      disabled={isDeleting === address.id}
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      {isDeleting === address.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <AddressModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        address={editingAddress}
        onSuccess={handleModalSuccess}
      />
    </>
  )
}

