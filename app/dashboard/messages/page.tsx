"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Mail, Search, Clock, User, CheckCircle2, Archive, Trash2, Loader2, ArrowLeft } from "lucide-react"
import { getUserMessages, markMessageAsRead } from "@/lib/contact-api"
import { getImageUrl } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { submitContactForm } from "@/lib/contact-api"

interface Message {
  id: number
  sender_id?: number
  recipient_id: number
  sender?: {
    id: number
    name: string
    email: string
    image?: string
  }
  name?: string
  email?: string
  subject: string
  message: string
  type: string
  status: string
  read_at?: string
  created_at: string
}

export default function MessagesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyData, setReplyData] = useState({
    subject: "",
    message: ""
  })
  const [replyErrors, setReplyErrors] = useState<{ subject?: string; message?: string }>({})
  const [isSubmittingReply, setIsSubmittingReply] = useState(false)

  useEffect(() => {
    loadMessages()
  }, [activeTab])

  const loadMessages = async () => {
    setLoading(true)
    try {
      const status = activeTab === "all" ? "all" : activeTab
      const response = await getUserMessages({ status, page: 1 })
      if (response.success && response.data) {
        setMessages(response.data)
      }
    } catch (error) {
      console.error("Failed to load messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (messageId: number) => {
    try {
      await markMessageAsRead(messageId)
      setMessages(messages.map(msg => 
        msg.id === messageId 
          ? { ...msg, status: 'read', read_at: new Date().toISOString() }
          : msg
      ))
      if (selectedMessage?.id === messageId) {
        setSelectedMessage({ ...selectedMessage, status: 'read', read_at: new Date().toISOString() })
      }
    } catch (error) {
      console.error("Failed to mark message as read:", error)
    }
  }

  const filteredMessages = messages.filter(msg => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return (
      msg.subject.toLowerCase().includes(query) ||
      msg.message.toLowerCase().includes(query) ||
      (msg.sender?.name || msg.name || '').toLowerCase().includes(query) ||
      (msg.sender?.email || msg.email || '').toLowerCase().includes(query)
    )
  })

  const unreadCount = messages.filter(msg => msg.status === 'new').length

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset errors
    setReplyErrors({})
    
    // Validate form
    const errors: { subject?: string; message?: string } = {}
    if (!replyData.subject.trim()) {
      errors.subject = "Subject is required"
    }
    if (!replyData.message.trim()) {
      errors.message = "Message is required"
    }
    
    if (Object.keys(errors).length > 0) {
      setReplyErrors(errors)
      return
    }
    
    if (!selectedMessage) return
    
    setIsSubmittingReply(true)
    try {
      await submitContactForm({
        subject: replyData.subject,
        message: replyData.message,
        recipient_id: selectedMessage.sender_id || selectedMessage.sender?.id,
        type: selectedMessage.type !== 'general' ? selectedMessage.type as any : 'general'
      })
      
      // Reset form and close
      setReplyData({ subject: "", message: "" })
      setShowReplyForm(false)
      setSelectedMessage(null)
      
      // Reload messages to show the reply
      loadMessages()
    } catch (error) {
      console.error("Failed to send reply:", error)
    } finally {
      setIsSubmittingReply(false)
    }
  }

  const handleOpenMessage = (message: Message) => {
    setSelectedMessage(message)
    setShowReplyForm(false)
    setReplyData({ 
      subject: `Re: ${message.subject}`,
      message: ""
    })
    setReplyErrors({})
    if (message.status === 'new') {
      handleMarkAsRead(message.id)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 overflow-auto bg-gradient-to-b from-white via-gray-50/30 to-white pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#5a9c3a]/10 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#5a9c3a]" />
              </div>
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900">Messages</h1>
                <p className="text-lg text-gray-600 mt-1">Manage your contacts and messages</p>
              </div>
            </div>

            {/* Search */}
            <div className="max-w-md mt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 h-9 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5a9c3a]/20 focus:border-[#5a9c3a]"
                />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="all">
                All
                {unreadCount > 0 && (
                  <Badge className="ml-2 bg-[#5a9c3a] text-white">{unreadCount}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
              <TabsTrigger value="replied">Replied</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Messages List */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#5a9c3a]" />
            </div>
          ) : filteredMessages.length === 0 ? (
            <Card className="p-12 text-center">
              <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages</h3>
              <p className="text-gray-600">
                {searchQuery ? "No messages match your search." : "You don't have any messages yet."}
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredMessages.map((message) => (
                <Card
                  key={message.id}
                  className={`p-4 cursor-pointer hover:shadow-md transition-all ${
                    message.status === 'new' ? 'border-l-4 border-l-[#5a9c3a] bg-[#5a9c3a]/5' : ''
                  }`}
                  onClick={() => handleOpenMessage(message)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {message.sender?.image ? (
                        <img
                          src={getImageUrl(message.sender.image, message.sender.name)}
                          alt={message.sender.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#5a9c3a]/10 flex items-center justify-center">
                          <User className="w-6 h-6 text-[#5a9c3a]" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {message.sender?.name || message.name || 'Unknown'}
                            </h3>
                            {message.status === 'new' && (
                              <Badge className="bg-[#5a9c3a] text-white text-xs">New</Badge>
                            )}
                            {message.type !== 'general' && (
                              <Badge variant="outline" className="text-xs">
                                {message.type.replace('_', ' ')}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm font-medium text-gray-900 mb-1 truncate">
                            {message.subject}
                          </p>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {message.message}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                            <Clock className="w-3 h-3" />
                            {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                          </div>
                          {message.status === 'read' && (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Message Detail Modal */}
      <Dialog open={!!selectedMessage} onOpenChange={() => {
        setSelectedMessage(null)
        setShowReplyForm(false)
        setReplyData({ subject: "", message: "" })
        setReplyErrors({})
      }}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto p-0">
          {selectedMessage && (
            <>
              <DialogHeader className="px-6 pt-6 pb-4 border-b">
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Mail className="w-5 h-5 text-[#5a9c3a]" />
                  {selectedMessage.subject}
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600 mt-1">
                  {selectedMessage.type !== 'general' && (
                    <Badge variant="outline" className="text-xs mr-2">
                      {selectedMessage.type.replace('_', ' ')}
                    </Badge>
                  )}
                  {new Date(selectedMessage.created_at).toLocaleString()}
                </DialogDescription>
              </DialogHeader>
              
              <div className="px-6 py-4 pb-6 space-y-6">
                {/* Sender Info */}
                <div className="flex items-start gap-4 pb-4 border-b">
                  {selectedMessage.sender?.image ? (
                    <img
                      src={getImageUrl(selectedMessage.sender.image, selectedMessage.sender.name)}
                      alt={selectedMessage.sender.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#5a9c3a]/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-[#5a9c3a]" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-base">
                      {selectedMessage.sender?.name || selectedMessage.name || 'Unknown'}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedMessage.sender?.email || selectedMessage.email || 'No email'}
                    </p>
                  </div>
                </div>

                {/* Message Content */}
                <div className="pb-4">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Message</Label>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                {/* Reply Form */}
                {showReplyForm ? (
                  <form onSubmit={handleReplySubmit} className="space-y-4 pt-4 border-t">
                    <div>
                      <Label htmlFor="reply-subject" className="text-sm font-medium text-gray-900 mb-2 block">
                        Subject <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="reply-subject"
                        value={replyData.subject}
                        onChange={(e) => {
                          setReplyData({ ...replyData, subject: e.target.value })
                          if (replyErrors.subject) {
                            setReplyErrors({ ...replyErrors, subject: undefined })
                          }
                        }}
                        placeholder="Enter subject"
                        className={`bg-white ${replyErrors.subject ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {replyErrors.subject && (
                        <p className="text-sm text-red-500 mt-1">{replyErrors.subject}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="reply-message" className="text-sm font-medium text-gray-900 mb-2 block">
                        Message <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="reply-message"
                        value={replyData.message}
                        onChange={(e) => {
                          setReplyData({ ...replyData, message: e.target.value })
                          if (replyErrors.message) {
                            setReplyErrors({ ...replyErrors, message: undefined })
                          }
                        }}
                        placeholder="Enter your reply message"
                        rows={6}
                        className={`bg-white resize-none ${replyErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {replyErrors.message && (
                        <p className="text-sm text-red-500 mt-1">{replyErrors.message}</p>
                      )}
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowReplyForm(false)
                          setReplyData({ subject: `Re: ${selectedMessage.subject}`, message: "" })
                          setReplyErrors({})
                        }}
                        className="flex-1"
                        disabled={isSubmittingReply}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-[#5a9c3a] hover:bg-[#0d7a3f] text-white"
                        disabled={isSubmittingReply}
                      >
                        {isSubmittingReply ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Mail className="w-4 h-4 mr-2" />
                            Send Reply
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedMessage(null)
                        setShowReplyForm(false)
                        setReplyData({ subject: "", message: "" })
                        setReplyErrors({})
                      }}
                      className="flex-1"
                    >
                      Close
                    </Button>
                    <Button
                      className="flex-1 bg-[#5a9c3a] hover:bg-[#0d7a3f] text-white"
                      onClick={() => setShowReplyForm(true)}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
