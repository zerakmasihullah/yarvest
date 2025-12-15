"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Wrench, Plus, Trash2, Loader2, Save, X, Calendar, Check, XCircle, Eye, Edit, ToggleLeft, ToggleRight } from "lucide-react"
import api from "@/lib/axios"
import { toast } from "sonner"
import { useAuthStore } from "@/stores/auth-store"
import { getImageUrl } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Phone, Mail, User } from "lucide-react"

const COLORS = {
  primary: "#5a9c3a",
  primaryDark: "#0d7a3f",
  primaryLight: "#7ab856",
  accent: "#e8f5e9",
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
  status: boolean
  requests_count: number
  pending_requests_count: number
  created_at: string
}

interface ToolRequest {
  id: number
  unique_id: string
  tool: {
    id: number
    unique_id: string
    name: string
    image: string | null
    location: string | null
    owner?: {
      id: number
      unique_id: string
      full_name: string
      email: string
      phone: string | null
      image: string | null
    } | null
  }
  requester: {
    id: number
    unique_id: string
    full_name: string
    email: string
    phone: string | null
    image: string | null
  } | null
  start_date: string
  end_date: string
  message: string | null
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled'
  rejection_reason: string | null
  approval_message: string | null
  pickup_location: string | null
  pickup_method: 'pickup' | 'delivery' | null
  created_at: string
}

export default function HarvestingToolsPage() {
  const { user, isLoading: authLoading } = useAuthStore()
  const [tools, setTools] = useState<HarvestingTool[]>([])
  const [requests, setRequests] = useState<ToolRequest[]>([])
  const [myRequests, setMyRequests] = useState<ToolRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTool, setEditingTool] = useState<HarvestingTool | null>(null)
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null as number | null })
  const [requestDialog, setRequestDialog] = useState<ToolRequest | null>(null)
  const [approveDialog, setApproveDialog] = useState<ToolRequest | null>(null)
  const [approvalData, setApprovalData] = useState({
    approval_message: '',
    pickup_location: '',
    pickup_method: 'pickup' as 'pickup' | 'delivery',
    share_location: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    type: 'rent' as 'rent' | 'borrow',
    daily_rate: '',
    deposit: '',
    location: '',
    condition: '',
    instructions: '',
    availability: 'available' as 'available' | 'unavailable' | 'rented',
  })

  useEffect(() => {
    if (!authLoading && user) {
      fetchTools()
      fetchRequests()
      fetchMyRequests()
    } else if (!authLoading && !user) {
      setLoading(false)
    }
  }, [authLoading, user])

  const fetchTools = async () => {
    if (!user) {
      setTools([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      
      const response = await api.get('/harvesting-tools/my-tools')
      const data = response.data?.data || response.data || []
      setTools(Array.isArray(data) ? data : [])
    } catch (error: any) {
      console.error('Error fetching tools:', error)
      console.error('Error details:', {
        status: error.response?.status,
        message: error.response?.data?.message,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        fullURL: error.config?.baseURL + error.config?.url,
        headers: error.config?.headers
      })
      
      if (error.response?.status === 401) {
        toast.error('Please log in to view your tools')
      } else if (error.response?.status === 404) {
        // Check if it's a route issue
        const fullUrl = error.config?.baseURL + error.config?.url
        console.error('404 - Route not found:', fullUrl)
        console.error('Make sure the route /harvesting-tools/my-tools exists in the backend')
        // Silently handle 404 - might be that user has no tools yet
        setTools([])
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.')
        setTools([])
      } else if (!error.response) {
        // Network error or CORS issue
        console.error('Network error - check API URL:', error.config?.baseURL)
        toast.error('Unable to connect to server. Please check your connection.')
        setTools([])
      } else {
        toast.error(error.response?.data?.message || 'Failed to load tools')
        setTools([])
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchRequests = async () => {
    if (!user) {
      setRequests([])
      return
    }

    try {
      const response = await api.get('/harvesting-tools/my-tool-requests')
      const data = response.data?.data || response.data || []
      setRequests(Array.isArray(data) ? data : [])
    } catch (error: any) {
      console.error('Error fetching requests:', error)
      if (error.response?.status !== 404) {
        // Silently handle 404s, show error for other issues
        toast.error('Failed to load requests')
      }
      setRequests([])
    }
  }

  const fetchMyRequests = async () => {
    if (!user) {
      setMyRequests([])
      return
    }

    try {
      const response = await api.get('/harvesting-tools/my-requests')
      const data = response.data?.data || response.data || []
      setMyRequests(Array.isArray(data) ? data : [])
    } catch (error: any) {
      console.error('Error fetching my requests:', error)
      if (error.response?.status !== 404) {
        toast.error('Failed to load your requests')
      }
      setMyRequests([])
    }
  }

  const handleOpenDialog = () => {
    setEditingTool(null)
    setErrors({})
    setFormData({
      name: '',
      description: '',
      image: '',
      type: 'rent',
      daily_rate: '',
      deposit: '',
      location: '',
      condition: '',
      instructions: '',
      availability: 'available',
    })
    setDialogOpen(true)
  }

  const handleEditTool = (tool: HarvestingTool) => {
    setEditingTool(tool)
    setErrors({})
    setFormData({
      name: tool.name,
      description: tool.description || '',
      image: tool.image || '',
      type: tool.type,
      daily_rate: tool.daily_rate || '',
      deposit: tool.deposit || '',
      location: tool.location || '',
      condition: tool.condition || '',
      instructions: tool.instructions || '',
      availability: tool.availability,
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    setErrors({})
    
    // Validate form
    if (!formData.name.trim()) {
      setErrors({ name: 'Tool name is required' })
      return
    }
    if (formData.type === 'rent' && !formData.daily_rate) {
      setErrors({ daily_rate: 'Daily rate is required for rental tools' })
      return
    }
    
    try {
      setSaving(true)
      const payload: any = {
        name: formData.name,
        description: formData.description || undefined,
        image: formData.image || undefined,
        type: formData.type,
        deposit: formData.deposit || undefined,
        location: formData.location || undefined,
        condition: formData.condition || undefined,
        instructions: formData.instructions || undefined,
        availability: formData.availability,
      }
      if (formData.type === 'rent') {
        payload.daily_rate = parseFloat(formData.daily_rate)
      }
      
      if (editingTool) {
        // Update existing tool
        await api.put(`/harvesting-tools/${editingTool.unique_id}`, payload)
        toast.success('Tool updated successfully')
      } else {
        // Create new tool
        await api.post('/harvesting-tools', payload)
        toast.success('Tool added successfully')
      }
      
      setDialogOpen(false)
      setEditingTool(null)
      setErrors({})
      setFormData({
        name: '',
        description: '',
        image: '',
        type: 'rent',
        daily_rate: '',
        deposit: '',
        location: '',
        condition: '',
        instructions: '',
        availability: 'available',
      })
      await fetchTools()
    } catch (error: any) {
      console.error('Error saving tool:', error)
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      } else {
        toast.error(error.response?.data?.message || 'Failed to save tool')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteDialog.id) return
    try {
      const tool = tools.find(t => t.id === deleteDialog.id)
      if (!tool) return
      await api.delete(`/harvesting-tools/${tool.unique_id}`)
      toast.success('Tool deleted successfully')
      setDeleteDialog({ open: false, id: null })
      await fetchTools()
    } catch (error: any) {
      console.error('Error deleting tool:', error)
      toast.error(error.response?.data?.message || 'Failed to delete tool')
    }
  }

  const handleApproveRequest = async () => {
    if (!approveDialog) return

    try {
      const payload: any = {
        approval_message: approvalData.approval_message || null,
        pickup_method: approvalData.pickup_method,
      }

      if (approvalData.share_location && approvalData.pickup_location) {
        payload.pickup_location = approvalData.pickup_location
      } else if (approveDialog.tool.location) {
        payload.pickup_location = approveDialog.tool.location
      }

      await api.post(`/harvesting-tools/requests/${approveDialog.id}/approve`, payload)
      toast.success('Request approved successfully')
      setApproveDialog(null)
      setApprovalData({
        approval_message: '',
        pickup_location: '',
        pickup_method: 'pickup',
        share_location: false,
      })
      await fetchRequests()
      await fetchTools()
    } catch (error: any) {
      console.error('Error approving request:', error)
      toast.error(error.response?.data?.message || 'Failed to approve request')
    }
  }

  const handleRejectRequest = async (requestId: number) => {
    try {
      await api.post(`/harvesting-tools/requests/${requestId}/reject`, {
        rejection_reason: 'Rejected by owner'
      })
      toast.success('Request rejected')
      await fetchRequests()
      setRequestDialog(null)
    } catch (error: any) {
      console.error('Error rejecting request:', error)
      toast.error(error.response?.data?.message || 'Failed to reject request')
    }
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      approved: { bg: 'bg-green-100', text: 'text-green-800' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800' },
      completed: { bg: 'bg-blue-100', text: 'text-blue-800' },
      cancelled: { bg: 'bg-gray-100', text: 'text-gray-800' },
    }
    const color = colors[status] || colors.pending
    return (
      <Badge className={`${color.bg} ${color.text} border-0`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: COLORS.primary }} />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-8xl mx-auto px-10 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Harvesting Tools</h1>
            <p className="text-gray-500 mt-1 text-sm">Manage your tools and requests</p>
          </div>
          <Button
            onClick={handleOpenDialog}
            style={{ backgroundColor: COLORS.primary }}
            className="text-white hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Tool
          </Button>
        </div>

        <Tabs defaultValue="tools" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tools">My Tools</TabsTrigger>
            <TabsTrigger value="requests">
              Requests ({requests.filter(r => r.status === 'pending').length})
            </TabsTrigger>
            <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="tools" className="space-y-4">
            {loading ? (
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : tools.length === 0 ? (
              <Card className="border-0 shadow-md">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wrench className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools yet</h3>
                  <p className="text-gray-500 mb-6">Start by adding your first tool to rent or lend to others</p>
                  <Button
                    onClick={handleOpenDialog}
                    style={{ backgroundColor: COLORS.primary }}
                    className="text-white hover:opacity-90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Tool
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tool</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Requests</th>
                          <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {tools.map((tool) => (
                          <tr key={tool.id} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                {tool.image ? (
                                  <img
                                    src={getImageUrl(tool.image, tool.name)}
                                    alt={tool.name}
                                    className="h-14 w-14 rounded-lg object-cover border-2 border-gray-200 shadow-sm"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none'
                                    }}
                                  />
                                ) : (
                                  <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-[#5a9c3a]/20 to-[#0d7a3f]/20 flex items-center justify-center border-2 border-gray-200 shadow-sm">
                                    <Wrench className="w-7 h-7" style={{ color: COLORS.primary }} />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <div className="font-semibold text-gray-900 text-base mb-1">{tool.name}</div>
                                  {tool.description && (
                                    <div className="text-sm text-gray-500 line-clamp-1 max-w-md">{tool.description}</div>
                                  )}
                                  {tool.condition && (
                                    <div className="text-xs text-gray-400 mt-1">Condition: {tool.condition}</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className={`${
                                tool.type === 'rent' ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-green-100 text-green-800 border-green-300'
                              } border font-semibold text-xs px-3 py-1`}>
                                {tool.type === 'rent' ? '💰 Rent' : '🤝 Borrow'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {tool.type === 'rent' && tool.daily_rate ? (
                                <div>
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-bold" style={{ color: COLORS.primary }}>
                                      ${tool.daily_rate}
                                    </span>
                                    <span className="text-sm text-gray-500">/day</span>
                                  </div>
                                  {tool.deposit && (
                                    <div className="text-xs text-gray-400 mt-1">Deposit: ${tool.deposit}</div>
                                  )}
                                </div>
                              ) : tool.type === 'borrow' && tool.deposit ? (
                                <div>
                                  <span className="text-sm text-gray-600">Deposit: </span>
                                  <span className="text-lg font-bold" style={{ color: COLORS.primary }}>${tool.deposit}</span>
                                </div>
                              ) : (
                                <span className="text-sm font-semibold text-[#5a9c3a]">Free</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {tool.location ? (
                                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                  <span>📍</span>
                                  <span className="max-w-[150px] truncate">{tool.location}</span>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">—</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className={`${
                                tool.availability === 'available' 
                                  ? 'bg-green-100 text-green-800 border-green-300' 
                                  : tool.availability === 'rented'
                                  ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                                  : 'bg-gray-100 text-gray-800 border-gray-300'
                              } border font-semibold text-xs px-3 py-1`}>
                                {tool.availability === 'available' ? '✓ Available' : tool.availability === 'rented' ? '🔒 Rented' : '✗ Unavailable'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-col gap-1.5">
                                {tool.pending_requests_count > 0 && (
                                  <span className="text-xs font-bold text-yellow-700 bg-yellow-100 px-2.5 py-1 rounded-md w-fit border border-yellow-300">
                                    {tool.pending_requests_count} pending
                                  </span>
                                )}
                                <span className="text-xs text-gray-500">
                                  {tool.requests_count} total
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditTool(tool)}
                                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-9 w-9"
                                  title="Edit tool"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setDeleteDialog({ open: true, id: tool.id })}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 h-9 w-9"
                                  title="Delete tool"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            {loading ? (
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : requests.length === 0 ? (
              <Card className="border-0 shadow-md">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No requests yet</h3>
                  <p className="text-gray-500">You haven't received any requests for your tools</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tool</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Requester</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date Range</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Message</th>
                          <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {requests.map((request) => (
                          <tr key={request.id} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-6 py-4">
                              <div className="font-semibold text-gray-900">{request.tool.name}</div>
                              {request.tool.image && (
                                <img
                                  src={getImageUrl(request.tool.image, request.tool.name)}
                                  alt={request.tool.name}
                                  className="h-10 w-10 rounded-lg object-cover border border-gray-200 mt-2"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none'
                                  }}
                                />
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {request.requester ? (
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-[#5a9c3a] to-[#0d7a3f] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">
                                    {request.requester.full_name.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-gray-900">{request.requester.full_name}</p>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">—</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <div>
                                  <div className="font-medium">{new Date(request.start_date).toLocaleDateString()}</div>
                                  <div className="text-xs text-gray-500">to {new Date(request.end_date).toLocaleDateString()}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(request.status)}
                            </td>
                            <td className="px-6 py-4">
                              {request.message ? (
                                <div className="max-w-xs">
                                  <p className="text-sm text-gray-700 line-clamp-2">{request.message}</p>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">—</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              {request.status === 'pending' && (
                                <div className="flex items-center justify-end gap-2">
                                  <Button
                                    onClick={() => {
                                      setApprovalData({
                                        approval_message: '',
                                        pickup_location: request.tool.location || '',
                                        pickup_method: 'pickup',
                                        share_location: false,
                                      })
                                      setApproveDialog(request)
                                    }}
                                    className="bg-green-600 hover:bg-green-700 text-white h-9 px-4 text-xs font-semibold"
                                    size="sm"
                                  >
                                    <Check className="w-3 h-3 mr-1.5" />
                                    Approve
                                  </Button>
                                  <Button
                                    onClick={() => handleRejectRequest(request.id)}
                                    variant="outline"
                                    className="border-red-300 text-red-600 hover:bg-red-50 h-9 px-4 text-xs font-semibold"
                                    size="sm"
                                  >
                                    <XCircle className="w-3 h-3 mr-1.5" />
                                    Reject
                                  </Button>
                                </div>
                              )}
                              {request.status === 'rejected' && request.rejection_reason && (
                                <div className="text-xs text-red-600 max-w-[150px] text-right">
                                  {request.rejection_reason}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="my-requests" className="space-y-4">
            {loading ? (
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : myRequests.length === 0 ? (
              <Card className="border-0 shadow-md">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No requests yet</h3>
                  <p className="text-gray-500 mb-6">You haven't made any tool requests yet</p>
                  <Button
                    asChild
                    style={{ backgroundColor: COLORS.primary }}
                    className="text-white hover:opacity-90"
                  >
                    <a href="/harvesting-products">Browse Tools</a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tool</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Owner</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date Range</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Message</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {myRequests.map((request) => (
                          <tr key={request.id} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-6 py-4">
                              <div className="font-semibold text-gray-900">{request.tool.name}</div>
                              {request.tool.image && (
                                <img
                                  src={getImageUrl(request.tool.image, request.tool.name)}
                                  alt={request.tool.name}
                                  className="h-10 w-10 rounded-lg object-cover border border-gray-200 mt-2"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none'
                                  }}
                                />
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {request.tool.owner ? (
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">{request.tool.owner.full_name}</p>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">—</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <div>
                                  <div className="font-medium">{new Date(request.start_date).toLocaleDateString()}</div>
                                  <div className="text-xs text-gray-500">to {new Date(request.end_date).toLocaleDateString()}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(request.status)}
                            </td>
                            <td className="px-6 py-4">
                              {request.message ? (
                                <div className="max-w-xs">
                                  <p className="text-sm text-gray-700 line-clamp-2">{request.message}</p>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">—</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {request.rejection_reason && (
                                <div className="max-w-xs">
                                  <p className="text-xs font-medium text-red-800 mb-1">Rejected:</p>
                                  <p className="text-xs text-red-700 line-clamp-2">{request.rejection_reason}</p>
                                </div>
                              )}
                              {request.status === 'approved' && (
                                <div className="max-w-xs">
                                  <p className="text-xs font-semibold text-green-800">✓ Approved!</p>
                                  <p className="text-xs text-green-700 mt-1">Contact owner for pickup</p>
                                </div>
                              )}
                              {request.status === 'pending' && (
                                <span className="text-xs text-gray-400">Waiting for response</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => {
        setDialogOpen(open)
        if (!open) {
          setEditingTool(null)
          setFormData({
            name: '',
            description: '',
            image: '',
            type: 'rent',
            daily_rate: '',
            deposit: '',
            location: '',
            condition: '',
            instructions: '',
            availability: 'available',
          })
          setErrors({})
        }
      }}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-6 px-6 pt-6">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {editingTool ? 'Edit Harvesting Tool' : 'Add Harvesting Tool'}
            </DialogTitle>
            <DialogDescription className="text-base mt-2 text-gray-600">
              {editingTool ? 'Update your tool information' : 'Add a tool you want to rent or lend to others'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 px-6 pb-6">
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2 block">Tool Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value })
                  if (errors.name) setErrors({ ...errors, name: '' })
                }}
                placeholder="e.g., Combine Harvester, Tractor"
                className={`h-11 ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-2">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700 mb-2 block">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your tool, its features, and any important details..."
                className="min-h-[100px] resize-none"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="type" className="text-sm font-semibold text-gray-700 mb-2 block">Type *</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'rent' | 'borrow' })}
                  className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#5a9c3a] focus:border-[#5a9c3a]"
                >
                  <option value="rent">💰 Rent</option>
                  <option value="borrow">🤝 Borrow</option>
                </select>
              </div>

              {formData.type === 'rent' && (
                <div>
                  <Label htmlFor="daily_rate" className="text-sm font-semibold text-gray-700 mb-2 block">Daily Rate ($) *</Label>
                  <Input
                    id="daily_rate"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.daily_rate}
                    onChange={(e) => {
                      setFormData({ ...formData, daily_rate: e.target.value })
                      if (errors.daily_rate) setErrors({ ...errors, daily_rate: '' })
                    }}
                    placeholder="0.00"
                    className={`h-11 ${errors.daily_rate ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.daily_rate && (
                    <p className="text-sm text-red-500 mt-2">{errors.daily_rate}</p>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="deposit" className="text-sm font-semibold text-gray-700 mb-2 block">Security Deposit ($)</Label>
                <Input
                  id="deposit"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.deposit}
                  onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                  placeholder="0.00"
                  className="h-11"
                />
                <p className="text-xs text-gray-500 mt-1.5">Optional security deposit amount</p>
              </div>

              <div>
                <Label htmlFor="location" className="text-sm font-semibold text-gray-700 mb-2 block">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, State"
                  className="h-11"
                />
                <p className="text-xs text-gray-500 mt-1.5">Where the tool is located</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="condition" className="text-sm font-semibold text-gray-700 mb-2 block">Condition</Label>
                <select
                  id="condition"
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#5a9c3a] focus:border-[#5a9c3a]"
                >
                  <option value="">Select condition</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Needs Repair">Needs Repair</option>
                </select>
              </div>

              <div>
                <Label htmlFor="image" className="text-sm font-semibold text-gray-700 mb-2 block">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="h-11"
                />
                <p className="text-xs text-gray-500 mt-1.5">Link to tool image</p>
              </div>
            </div>

            <div>
              <Label htmlFor="instructions" className="text-sm font-semibold text-gray-700 mb-2 block">Usage Instructions</Label>
              <Textarea
                id="instructions"
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Any special instructions, requirements, or usage guidelines for users..."
                className="min-h-[100px] resize-none"
                rows={4}
              />
            </div>

            {/* Availability Toggle */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="availability" className="text-sm font-semibold text-gray-700 mb-1 block">
                    Availability Status
                  </Label>
                  <p className="text-xs text-gray-500">
                    {formData.availability === 'available' 
                      ? 'Tool will be visible to users and can be requested'
                      : 'Tool will be hidden from public listings'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      availability: formData.availability === 'available' ? 'unavailable' : 'available'
                    })
                  }}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#5a9c3a] focus:ring-offset-2 ${
                    formData.availability === 'available' ? 'bg-[#5a9c3a]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      formData.availability === 'available' ? 'translate-x-8' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2">
                {formData.availability === 'available' ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-green-700">Available</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                    <span className="text-sm font-medium text-gray-700">Unavailable</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t border-gray-200 bg-gray-50 gap-3">
            <Button 
              variant="outline" 
              onClick={() => {
                setDialogOpen(false)
                setEditingTool(null)
              }}
              className="h-11 px-6 border-gray-300 hover:bg-gray-100"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              style={{ backgroundColor: COLORS.primary }}
              className="text-white hover:opacity-90 h-11 px-6 font-semibold shadow-sm"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {editingTool ? 'Updating...' : 'Saving...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {editingTool ? 'Update Tool' : 'Save Tool'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approval Dialog */}
      <Dialog open={!!approveDialog} onOpenChange={(open) => {
        if (!open) {
          setApproveDialog(null)
          setApprovalData({
            approval_message: '',
            pickup_location: '',
            pickup_method: 'pickup',
            share_location: false,
          })
        }
      }}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-6 px-6 pt-6 border-b border-gray-200">
            <DialogTitle className="text-2xl font-bold text-gray-900">Approve Tool Request</DialogTitle>
            <DialogDescription className="text-base mt-2 text-gray-600">
              Send a message and share pickup details with the requester
            </DialogDescription>
          </DialogHeader>
          
          {approveDialog && (
            <div className="space-y-6 px-6 py-6">
              {/* Requester Details */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Requester Details
                </h3>
                <div className="space-y-2">
                  {approveDialog.requester && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Name:</span>
                      <span className="font-semibold text-gray-900">{approveDialog.requester.full_name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Request Details */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Request Details</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div><span className="font-medium">Tool:</span> {approveDialog.tool.name}</div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(approveDialog.start_date).toLocaleDateString()} - {new Date(approveDialog.end_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Approval Message */}
              <div>
                <Label htmlFor="approval_message" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Message to Requester <span className="text-gray-400 font-normal">(Optional)</span>
                </Label>
                <Textarea
                  id="approval_message"
                  value={approvalData.approval_message}
                  onChange={(e) => setApprovalData({ ...approvalData, approval_message: e.target.value })}
                  placeholder="Add any special instructions, pickup time, or additional information..."
                  className="min-h-[100px] resize-none"
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1.5">This message will be sent to the requester</p>
              </div>

              {/* Pickup Method */}
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-3 block">Pickup Method</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="pickup_method"
                      value="pickup"
                      checked={approvalData.pickup_method === 'pickup'}
                      onChange={(e) => setApprovalData({ ...approvalData, pickup_method: e.target.value as 'pickup' | 'delivery' })}
                      className="w-4 h-4 text-[#5a9c3a] focus:ring-[#5a9c3a]"
                    />
                    <span className="text-sm text-gray-700">Come and Pick Up</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="pickup_method"
                      value="delivery"
                      checked={approvalData.pickup_method === 'delivery'}
                      onChange={(e) => setApprovalData({ ...approvalData, pickup_method: e.target.value as 'pickup' | 'delivery' })}
                      className="w-4 h-4 text-[#5a9c3a] focus:ring-[#5a9c3a]"
                    />
                    <span className="text-sm text-gray-700">Delivery</span>
                  </label>
                </div>
              </div>

              {/* Share Location */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="share_location"
                    checked={approvalData.share_location}
                    onChange={(e) => setApprovalData({ ...approvalData, share_location: e.target.checked })}
                    className="border-gray-300"
                  />
                  <Label htmlFor="share_location" className="text-sm font-semibold text-gray-700 cursor-pointer">
                    Share Pickup Location
                  </Label>
                </div>
                {approvalData.share_location && (
                  <div>
                    <Label htmlFor="pickup_location" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Pickup Location
                    </Label>
                    <Input
                      id="pickup_location"
                      value={approvalData.pickup_location}
                      onChange={(e) => setApprovalData({ ...approvalData, pickup_location: e.target.value })}
                      placeholder={approveDialog.tool.location || "Enter pickup address or location"}
                      className="h-11"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">This location will be shared with the requester</p>
                  </div>
                )}
                {!approvalData.share_location && approveDialog.tool.location && (
                  <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <MapPin className="w-4 h-4 mt-0.5 text-gray-400" />
                    <div>
                      <span className="font-medium">Default Location:</span> {approveDialog.tool.location}
                      <p className="text-xs text-gray-500 mt-1">Enable "Share Location" to customize or update this location</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="px-6 py-4 border-t border-gray-200 bg-gray-50 gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setApproveDialog(null)
                setApprovalData({
                  approval_message: '',
                  pickup_location: '',
                  pickup_method: 'pickup',
                  share_location: false,
                })
              }}
              className="h-11 px-6 border-gray-300 hover:bg-gray-100"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleApproveRequest}
              style={{ backgroundColor: COLORS.primary }}
              className="text-white hover:opacity-90 h-11 px-6 font-semibold shadow-sm"
            >
              <Check className="w-4 h-4 mr-2" />
              Approve Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, id: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tool</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this tool? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

