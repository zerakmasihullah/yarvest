"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"
import api from "@/lib/axios"
import { useAuthStore } from "@/stores/auth-store"

interface Role {
  id: number
  name: string
}

export function RoleManagement() {
  const [availableRoles, setAvailableRoles] = useState<Role[]>([])
  const [userRoles, setUserRoles] = useState<Role[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState<number | null>(null)
  const [error, setError] = useState("")
  const user = useAuthStore((state) => state.user)
  const refreshUser = useAuthStore((state) => state.refreshUser)

  useEffect(() => {
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    setIsLoading(true)
    setError("")

    try {
      const [rolesResponse, userRolesResponse] = await Promise.all([
        api.get('/roles'),
        api.get('/user/roles'),
      ])

      setAvailableRoles(rolesResponse.data.data || [])
      setUserRoles(userRolesResponse.data.data?.roles || [])
    } catch (err: any) {
      setError("Failed to load roles. Please try again.")
      console.error("Error fetching roles:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleRole = async (roleId: number, roleName: string, isActive: boolean) => {
    setIsUpdating(roleId)
    setError("")

    try {
      if (isActive) {
        // Remove role
        await api.post('/user/roles/remove', { role_id: roleId })
      } else {
        // Add role
        await api.post('/user/roles/assign', { role_id: roleId })
      }
      await fetchRoles()
      await refreshUser()
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || `Failed to ${isActive ? 'remove' : 'assign'} role`)
      } else {
        setError("An error occurred. Please try again.")
      }
    } finally {
      setIsUpdating(null)
    }
  }

  const getUserRoleIds = () => userRoles.map((r) => r.id)

  const getRoleDisplayName = (name: string) => {
    const roleMap: Record<string, string> = {
      Buyer: "Buyer",
      Seller: "Seller",
      Courier: "Delivery Driver",
      Helper: "Volunteer/Helper",
    }
    return roleMap[name] || name
  }

  const getRoleDescription = (name: string) => {
    const descriptions: Record<string, string> = {
      Buyer: "Purchase fresh produce from local farmers",
      Seller: "Sell your farm products",
      Courier: "Deliver products to customers",
      Helper: "Help with harvesting and community work",
    }
    return descriptions[name] || ""
  }

  // Filter out Admin role from available roles
  const isAdminRole = (role: Role) => role.name === "Admin" || role.name === "admin"

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-[#0A8542]" />
        </div>
      </Card>
    )
  }

  const hasRole = (roleId: number) => getUserRoleIds().includes(roleId)
  const canToggleRole = (role: Role) => {
    // Don't allow toggling Buyer or Seller (default roles)
    // Don't allow toggling Admin role
    return role.name !== "Buyer" && role.name !== "Seller" && role.name !== "Admin" && role.name !== "admin"
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Your Roles</h3>
        <p className="text-sm text-gray-600">
          Toggle roles to access different features. All users start as Buyer and Seller.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* All Roles with Toggles */}
      <div className="space-y-3">
        {availableRoles
          .filter((role) => !isAdminRole(role))
          .map((role) => {
            const isActive = hasRole(role.id)
            const canToggle = canToggleRole(role)
            
            return (
              <div
                key={role.id}
                className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                  isActive 
                    ? 'border-[#0A5D31] bg-[#0A5D31]/5' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className={`font-medium ${isActive ? 'text-[#0A5D31]' : 'text-gray-900'}`}>
                      {getRoleDisplayName(role.name)}
                    </h5>
                    {!canToggle && (
                      <span className="text-xs text-gray-500">(Default)</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{getRoleDescription(role.name)}</p>
                </div>
                <div className="flex items-center gap-3">
                  {isUpdating === role.id && (
                    <Loader2 className="w-4 h-4 animate-spin text-[#0A5D31]" />
                  )}
                  <Switch
                    checked={isActive}
                    onCheckedChange={(checked) => {
                      if (canToggle) {
                        handleToggleRole(role.id, role.name, isActive)
                      }
                    }}
                    disabled={isUpdating === role.id || !canToggle}
                    className="data-[state=checked]:bg-[#0A5D31]"
                  />
                </div>
              </div>
            )
          })}
      </div>
    </Card>
  )
}

